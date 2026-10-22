// src/lib/adminAuth.ts
// 共用管理員驗證：admin_token cookie 存「伺服器簽發的 JWT（HS256）」，不再存 ADMIN_PASSWORD 明文。
// 舊版 cookie 值＝ADMIN_PASSWORD，只要 cookie 外洩（或舊密碼外流）就等於拿到後台；
// 改成簽章＋到期時間後，驗證只看簽章與 exp，密碼本身不會再出現在 cookie 裡。
// 參考 ST（my-bookstore-next-v2）src/lib/auth.js：JWT_SECRET 先 sha256 成 32 bytes 金鑰，
// jwt.verify 固定 algorithms:['HS256']（擋 alg:none／換演算法攻擊）。
// 多加 audience，避免 ST 與 SS 剛好用同一把 JWT_SECRET 時，ST 的 session 能拿來登 SS 後台。
import type { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const ADMIN_COOKIE_NAME = 'admin_token';
export const ADMIN_SESSION_MAX_AGE_SECS = 60 * 60 * 8; // 8小時，與原本 cookie maxAge 一致
const TOKEN_TYPE = 'admin_session';
const AUDIENCE = 'surprise-corner-admin';
const MIN_SECRET_LENGTH = 32;

// 不在 import 時 throw：/api/surprises 等公開路由也 import 這支，缺密鑰時只讓後台驗證失敗（fail-closed），不讓前台壞掉
function getSigningKey(): Buffer | null {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) return null;
  return crypto.createHash('sha256').update(secret, 'utf8').digest();
}

export function createAdminSessionToken(): string | null {
  const key = getSigningKey();
  if (!key) return null;
  return jwt.sign({ type: TOKEN_TYPE }, key, {
    algorithm: 'HS256',
    expiresIn: ADMIN_SESSION_MAX_AGE_SECS,
    audience: AUDIENCE,
  });
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const key = getSigningKey();
  if (!key) return false;
  try {
    const payload = jwt.verify(token, key, { algorithms: ['HS256'], audience: AUDIENCE });
    return typeof payload === 'object' && payload !== null && payload.type === TOKEN_TYPE;
  } catch {
    return false; // 簽章錯、過期、格式錯（含舊版明文密碼 cookie）一律拒絕
  }
}

export function setAdminSessionCookie(res: NextResponse, token: string): void {
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ADMIN_SESSION_MAX_AGE_SECS,
    path: '/',
  });
}

// 比對登入密碼用（固定時間比較，避免時間差猜密碼）；ADMIN_PASSWORD 未設定時一律不通過
export function isAdminPasswordCorrect(input: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== 'string' || !input) return false;
  const a = crypto.createHash('sha256').update(input, 'utf8').digest();
  const b = crypto.createHash('sha256').update(expected, 'utf8').digest();
  return crypto.timingSafeEqual(a, b);
}

export function isAdminAuthed(req: Pick<NextRequest, 'cookies'>): boolean {
  return verifyAdminSessionToken(req.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

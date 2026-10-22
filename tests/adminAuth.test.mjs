// 後台 admin_token 簽章 cookie 單元測試
// 執行：npm test（node --experimental-strip-types --test tests/）
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  verifyAdminSessionToken,
  isAdminAuthed,
  isAdminPasswordCorrect,
} from '../src/lib/adminAuth.ts';

const SECRET = 'test-secret-0123456789-abcdefghijklmnop'; // 測試用假值
const PASSWORD = 'test-admin-password'; // 測試用假值
const key = crypto.createHash('sha256').update(SECRET, 'utf8').digest();
const fakeReq = (value) => ({ cookies: { get: (n) => (n === ADMIN_COOKIE_NAME && value !== undefined ? { value } : undefined) } });

beforeEach(() => {
  process.env.JWT_SECRET = SECRET;
  process.env.ADMIN_PASSWORD = PASSWORD;
});

test('簽章正確的 token 通過驗證', () => {
  const token = createAdminSessionToken();
  assert.ok(token);
  assert.notEqual(token, PASSWORD);
  assert.ok(!token.includes(PASSWORD));
  assert.equal(verifyAdminSessionToken(token), true);
  assert.equal(isAdminAuthed(fakeReq(token)), true);
});

test('token 帶 8 小時到期時間', () => {
  const { iat, exp } = jwt.decode(createAdminSessionToken());
  assert.equal(exp - iat, 60 * 60 * 8);
});

test('過期 token 被拒', () => {
  const expired = jwt.sign({ type: 'admin_session', exp: Math.floor(Date.now() / 1000) - 10 }, key, {
    algorithm: 'HS256',
    audience: 'surprise-corner-admin',
  });
  assert.equal(verifyAdminSessionToken(expired), false);
});

test('竄改 payload 或簽章的 token 被拒', () => {
  const [h, p, s] = createAdminSessionToken().split('.');
  const forgedPayload = Buffer.from(JSON.stringify({ type: 'admin_session', aud: 'surprise-corner-admin', exp: 9999999999 })).toString('base64url');
  assert.equal(verifyAdminSessionToken(`${h}.${forgedPayload}.${s}`), false);
  const flipped = s.slice(0, -2) + (s.slice(-2) === 'AA' ? 'BB' : 'AA');
  assert.equal(verifyAdminSessionToken(`${h}.${p}.${flipped}`), false);
});

test('用別把金鑰簽的 token 被拒', () => {
  const other = jwt.sign({ type: 'admin_session' }, 'another-secret-another-secret-xx', {
    algorithm: 'HS256', expiresIn: 3600, audience: 'surprise-corner-admin',
  });
  assert.equal(verifyAdminSessionToken(other), false);
});

test('alg:none token 被拒', () => {
  const none = jwt.sign({ type: 'admin_session', aud: 'surprise-corner-admin' }, null, { algorithm: 'none' });
  assert.equal(verifyAdminSessionToken(none), false);
});

test('同金鑰但 audience／type 不同（例如 ST 的 session）被拒', () => {
  const stStyle = jwt.sign({ type: 'admin_session' }, key, { algorithm: 'HS256', expiresIn: 3600 });
  assert.equal(verifyAdminSessionToken(stStyle), false);
  const wrongType = jwt.sign({ type: 'user' }, key, { algorithm: 'HS256', expiresIn: 3600, audience: 'surprise-corner-admin' });
  assert.equal(verifyAdminSessionToken(wrongType), false);
});

test('舊版明文密碼 cookie 被拒', () => {
  assert.equal(isAdminAuthed(fakeReq(PASSWORD)), false);
  assert.equal(verifyAdminSessionToken(PASSWORD), false);
});

test('沒有 cookie／空字串被拒', () => {
  assert.equal(isAdminAuthed(fakeReq(undefined)), false);
  assert.equal(isAdminAuthed(fakeReq('')), false);
});

test('JWT_SECRET 未設定或太短：不簽發、也不通過（fail-closed）', () => {
  const token = createAdminSessionToken();
  delete process.env.JWT_SECRET;
  assert.equal(createAdminSessionToken(), null);
  assert.equal(verifyAdminSessionToken(token), false);
  process.env.JWT_SECRET = 'short';
  assert.equal(createAdminSessionToken(), null);
  assert.equal(verifyAdminSessionToken(token), false);
});

test('密碼比對：正確通過，錯誤／空值／ADMIN_PASSWORD 未設定都不通過', () => {
  assert.equal(isAdminPasswordCorrect(PASSWORD), true);
  assert.equal(isAdminPasswordCorrect('wrong'), false);
  assert.equal(isAdminPasswordCorrect(''), false);
  assert.equal(isAdminPasswordCorrect(undefined), false);
  delete process.env.ADMIN_PASSWORD;
  assert.equal(isAdminPasswordCorrect(undefined), false);
  assert.equal(isAdminPasswordCorrect(''), false);
});

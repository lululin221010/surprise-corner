// src/lib/adminAuth.ts
// 共用管理員驗證：檢查 admin_token cookie 是否等於 ADMIN_PASSWORD
import { NextRequest } from 'next/server';

export function isAdminAuthed(req: NextRequest): boolean {
  const validToken = process.env.ADMIN_PASSWORD;
  if (!validToken) return false;
  return req.cookies.get('admin_token')?.value === validToken;
}

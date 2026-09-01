// GET /api/admin/check-session
// 讓後台頁面在client端確認目前的admin_token cookie是否有效，不外洩密碼本身
import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthed } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  return NextResponse.json({ authed: isAdminAuthed(req) });
}

export const dynamic = 'force-dynamic';

// GET /api/admin/owner-login/verify?token=xxx
// 驗證owner-login寄出的一次性連結，通過才發admin_token session cookie
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const SS_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://surprise-corner.vercel.app';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const loginUrl = new URL('/admin', SS_URL);

  if (!token) {
    loginUrl.searchParams.set('ownerError', '1');
    return NextResponse.redirect(loginUrl);
  }

  const validToken = process.env.ADMIN_PASSWORD;
  if (!validToken) {
    loginUrl.searchParams.set('ownerError', '1');
    return NextResponse.redirect(loginUrl);
  }

  const client = await clientPromise;
  const db = client.db('SurpriseCornerDB');
  const tokens = db.collection('adminLoginTokens');

  const record = await tokens.findOne({
    token,
    used: false,
    expiresAt: { $gt: new Date() },
  });

  if (!record) {
    loginUrl.searchParams.set('ownerError', '1');
    return NextResponse.redirect(loginUrl);
  }

  await tokens.updateOne({ _id: record._id }, { $set: { used: true } });

  const response = NextResponse.redirect(new URL('/admin', SS_URL));
  response.cookies.set('admin_token', validToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8小時，跟/api/admin/auth的密碼登入一致
    path: '/',
  });

  return response;
}

export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  try {
    // Tell the backend to clear its session/token data
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, {
      headers: { 'Cookie': `access_token=${accessToken}` }
    });
  } catch (error) {
    // Even if backend fails, we proceed to clear the cookie on the frontend
    console.error("Backend logout failed, proceeding to clear client cookie.", error);
  } finally {
    // Clear the cookie from the browser
    const response = NextResponse.json({ message: 'Logged out' }, { status: 200 });
    response.cookies.set('access_token', '', { maxAge: -1 }); // Expire the cookie
    response.cookies.set('refresh_token', '', { maxAge: -1 });
    return response;
  }
}
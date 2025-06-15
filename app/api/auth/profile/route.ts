import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Use Axios to make the server-to-server request to your backend
    const backendResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
      headers: {
        // Manually forward the cookie
        'Cookie': `access_token=${accessToken}`,
      },
    });

    // Forward the successful response from the backend to the client
    return NextResponse.json(backendResponse.data, { status: 200 });

  } catch (error: any) {
    // If the backend returns an error (e.g., token expired), forward that error
    return NextResponse.json(
      { message: error.response?.data?.message || 'Authentication failed' },
      { status: error.response?.status || 500 }
    );
  }
}
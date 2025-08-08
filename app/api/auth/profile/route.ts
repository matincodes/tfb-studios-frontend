// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import axios from 'axios';

// export async function GET(req: NextRequest) {
//   const host = req.headers.get('host');
//   const origin = req.headers.get('origin');

//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('access_token')?.value;

//   if (!accessToken) {
//     return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
//   }

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//    if (!apiUrl) {
//     return NextResponse.json({ message: 'API URL not configured' }, { status: 500 });
//   }

//   console.log('API URL:', apiUrl);
//   console.log('Access Token:', accessToken);

//   try {
//     // Use Axios to make the server-to-server request to your backend
//     const backendResponse = await axios.get(`${apiUrl}users/profile`, {
//       headers: {
//         // Manually forward the cookie
//         'Cookie': `access_token=${accessToken}`,
//         'Host': new URL(apiUrl).host,
//         'Origin': origin || `https://${host}`,
//       },
//     });

//     // Forward the successful response from the backend to the client
//     return NextResponse.json(backendResponse.data, { status: 200 });

//   } catch (error: any) {
//     // If the backend returns an error (e.g., token expired), forward that error
//     return NextResponse.json(
//       { message: error.response?.data?.message || 'Authentication failed' },
//       { status: error.response?.status || 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Define a function to get the backend API URL from environment variables
function getApiUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured');
  }
  // Ensure the URL does not end with a slash for clean path concatenation
  return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
}

export async function GET(req: NextRequest) {
  try {
    const apiUrl = getApiUrl();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
      // If no access token is found, return a 401 Unauthorized
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    // Construct the headers to forward to the backend
    const headers = new Headers(req.headers);
    headers.set('Cookie', `access_token=${accessToken}`);

    // Create a new URL for the backend request
    const backendUrl = new URL(`${apiUrl}/users/profile`);

    console.log("Forwarding request to:", backendUrl.toString());

    // Make the request to the backend
    const backendResponse = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: headers,
      cache: 'no-store' // Ensure fresh data on every request
    });

    // Check if the backend response is okay
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const data = await backendResponse.json();

    // Forward the successful response from the backend to the client
    return NextResponse.json(data, { status: 200 });

  } catch (error: any) {
    console.error("API proxy error:", error);
    // Return a generic error for any unexpected issues
    return NextResponse.json(
      { message: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

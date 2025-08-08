"use server";

import { cookies } from 'next/headers';
import axios from 'axios';

// Get the backend API URL from environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUserProfile() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    // If no access token is found, return null
    return null;
  }

  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured');
  }

  try {
    // Make the server-to-server request to your backend
    const backendResponse = await axios.get(`${apiUrl}/users/profile`, {
      headers: {
        'Cookie': `access_token=${accessToken}`,
      },
    });

    return backendResponse.data.user;
  } catch (error) {
    console.error("Server Action error:", error);
    // Return null on authentication failure
    return null;
  }
}

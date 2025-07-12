// TFB_Frontend/app/(public)/verify-email/page.tsx
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Note: No longer need useRouter here
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import api from '@/lib/api';

function VerifyEmailComponent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('No verification token found. Please check the link from your email.');
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await api.get(`/auth/verify-email?token=${token}`);
                setStatus('success');
                setMessage(response.data.message || 'Success! Redirecting to your dashboard...');

                // Automatically redirect to the dashboard after a short delay
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500); // 1.5 second delay before redirect

            } catch (error: any) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'An error occurred during verification.');
            }
        };

        verifyToken();
    }, [token]);

    // The JSX remains mostly the same, but the success case no longer needs a button.
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Account Verification</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4 p-8">
                    {status === 'loading' && <Loader2 className="h-12 w-12 animate-spin text-gray-500" />}
                    {status === 'success' && <CheckCircle2 className="h-12 w-12 text-green-500" />}
                    {status === 'error' && <XCircle className="h-12 w-12 text-red-500" />}
                    
                    <p className={`font-semibold text-lg text-center ${status === 'error' ? 'text-red-500' : ''}`}>{message}</p>
                    
                    {/* The success button is removed, as redirection is now automatic. */}
                    {status === 'error' && (
                        <Button variant="outline" onClick={() => window.location.href = '/signup'}>
                            Go back to Signup
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

// The Suspense wrapper remains the same.
export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailComponent />
        </Suspense>
    );
}

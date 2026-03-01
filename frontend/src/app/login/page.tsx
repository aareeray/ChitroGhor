'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Link from 'next/link';

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const onSubmit = async (data: Record<string, string>) => {
        setLoading(true);
        setErrorMsg('');
        try {
            // Dummy logic for MVP frontend preview
            if (data.email && data.password) {
                // Assume API call succeeds
                login({ id: '1', email: data.email, username: data.email.split('@')[0] }, 'dummy-jwt-token');
                router.push('/');
            }
        } catch (error: unknown) {
            setErrorMsg('Invalid email or password');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#14181c] p-4">
            <Card className="w-full max-w-md bg-[#2b3440] border-[#14181c]">
                <CardHeader className="border-b border-[#14181c]">
                    <h2 className="text-2xl font-bold text-center text-white font-serif">Sign In</h2>
                    <p className="text-center text-[#9ab] mt-2 text-sm uppercase tracking-wider font-semibold">ChitroGhor</p>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {errorMsg && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm text-center">
                                {errorMsg}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-semibold text-[#9ab] mb-2 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full bg-white border-none rounded p-2.5 text-black focus:outline-none focus:ring-2 focus:ring-[#00e054]"
                            />
                            {errors.email?.message && <span className="text-red-500 text-xs mt-1 block">{String(errors.email.message)}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#9ab] mb-2 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                {...register('password', { required: 'Password is required' })}
                                className="w-full bg-white border-none rounded p-2.5 text-black focus:outline-none focus:ring-2 focus:ring-[#00e054]"
                            />
                            {errors.password?.message && <span className="text-red-500 text-xs mt-1 block">{String(errors.password.message)}</span>}
                        </div>

                        <Button type="submit" fullWidth disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>

                        <div className="mt-4 text-center text-sm text-[#9ab]">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-white hover:text-[#00e054] transition-colors font-semibold">
                                Create one
                            </Link>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

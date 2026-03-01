'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import Link from 'next/link';

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const onSubmit = async (data: Record<string, string>) => {
        setLoading(true);
        setErrorMsg('');
        if (data.password !== data.confirmPassword) {
            setErrorMsg('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            // Dummy logic for MVP preview
            login({ id: '1', email: data.email, username: data.username }, 'dummy-jwt-token');
            router.push('/');
        } catch (error: unknown) {
            setErrorMsg('Failed to create account. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#14181c] p-4">
            <Card className="w-full max-w-md bg-[#2b3440] border-[#14181c]">
                <CardHeader className="border-b border-[#14181c]">
                    <h2 className="text-2xl font-bold text-center text-white font-serif">Join</h2>
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
                            <label className="block text-sm font-semibold text-[#9ab] mb-2 uppercase tracking-wider">Username</label>
                            <input
                                type="text"
                                {...register('username', { required: 'Username is required' })}
                                className="w-full bg-white border-none rounded p-2.5 text-black focus:outline-none focus:ring-2 focus:ring-[#00e054]"
                            />
                            {errors.username?.message && <span className="text-red-500 text-xs mt-1 block">{String(errors.username.message)}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#9ab] mb-2 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full bg-white border-none rounded p-2.5 text-black focus:outline-none focus:ring-2 focus:ring-[#00e054]"
                            />
                            {errors.email?.message && <span className="text-red-500 text-xs mt-1 block">{String(errors.email.message)}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#9ab] mb-2 uppercase tracking-wider">Password</label>
                                <input
                                    type="password"
                                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                                    className="w-full bg-white border-none rounded p-2.5 text-black focus:outline-none focus:ring-2 focus:ring-[#00e054]"
                                />
                                {errors.password?.message && <span className="text-red-500 text-xs mt-1 block">{String(errors.password.message)}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#9ab] mb-2 uppercase tracking-wider">Confirm</label>
                                <input
                                    type="password"
                                    {...register('confirmPassword', { required: true })}
                                    className="w-full bg-white border-none rounded p-2.5 text-black focus:outline-none focus:ring-2 focus:ring-[#00e054]"
                                />
                            </div>
                        </div>

                        <Button type="submit" fullWidth disabled={loading} className="mt-6">
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>

                        <div className="mt-4 text-center text-sm text-[#9ab]">
                            Already have an account?{' '}
                            <Link href="/login" className="text-white hover:text-[#00e054] transition-colors font-semibold">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

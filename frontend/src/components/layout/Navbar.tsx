'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { Search, Film, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className="bg-[#14181c] border-b border-[#2b3440] sticky top-0 z-40">
            <div className="lb-container">
                <div className="flex justify-between items-center h-[70px]">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <Film className="h-8 w-8 text-[#00e054] group-hover:text-white transition-colors" />
                            <span className="font-serif text-2xl font-bold text-white tracking-widest hidden sm:inline-block">
                                ChitroGhor
                            </span>
                        </Link>
                    </div>

                    {/* User Menu & Actions */}
                    <div className="flex items-center space-x-6">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-6 text-[#9ab] font-bold text-sm uppercase tracking-wider">
                                <Link href={`/${user?.username}`} className="hover:text-white transition-colors flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">
                                        {user?.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:block">{user?.username}</span>
                                </Link>
                                <Link href="/films" className="hover:text-white transition-colors hidden md:block">Films</Link>
                                <Link href="/lists" className="hover:text-white transition-colors hidden md:block">Lists</Link>
                                <Link href="/network" className="hover:text-white transition-colors hidden md:block">Network</Link>
                                <div className="relative group">
                                    <button className="hover:text-white transition-colors uppercase tracking-wider flex items-center text-sm font-bold">
                                        More <span className="text-[10px] ml-1">▼</span>
                                    </button>
                                    {/* Dropdown (hidden for now) */}
                                </div>
                                <button className="lb-button text-xs py-1.5 px-3 uppercase tracking-widest">+ Log</button>
                                <div className="relative w-48 hidden lg:block">
                                    <input type="text" className="w-full bg-[#2b3440] border-none rounded-sm py-1.5 pl-3 pr-8 text-white focus:ring-1 focus:ring-[#00e054] text-sm" placeholder="Search" />
                                    <Search className="h-4 w-4 absolute right-2 top-2 text-[#9ab]" />
                                </div>
                                <button onClick={handleLogout} className="text-[#9ab] hover:text-red-500 transition-colors" aria-label="Logout" title="Logout">
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4 text-[#9ab] font-bold text-sm uppercase tracking-wider">
                                <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
                                <Link href="/register" className="hover:text-white transition-colors">Create Account</Link>
                                <Link href="/films" className="hover:text-white transition-colors hidden md:block">Films</Link>
                                <Link href="/lists" className="hover:text-white transition-colors hidden md:block">Lists</Link>
                                <div className="relative w-48 hidden lg:block">
                                    <input type="text" className="w-full bg-[#2b3440] border-none rounded-sm py-1.5 pl-3 pr-8 text-white focus:ring-1 focus:ring-[#00e054] text-sm" placeholder="Search" />
                                    <Search className="h-4 w-4 absolute right-2 top-2 text-[#9ab]" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

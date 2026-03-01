import { create } from 'zustand';

interface User {
    id: string;
    username: string;
    email: string;
    profile_photo?: string | null;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null, // Will be hydrated from localStorage in a real app or Next.js layout
    token: null,
    isAuthenticated: false,
    login: (user, token) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        set({ user: null, token: null, isAuthenticated: false });
    },
}));

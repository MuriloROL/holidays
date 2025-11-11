"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HolidayApp } from '@/components/holidayApp';
import { ThemeToggle } from '@/components/ThemeToggle';

const queryClient = new QueryClient();

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeToggle />
            <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <HolidayApp />
                </div>
            </main>
        </QueryClientProvider>
    );
}
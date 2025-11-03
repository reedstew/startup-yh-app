'use client'

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function KeyboardNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Ignore if user is typing in an input field
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            // Global navigation keys
            switch(event.key.toLowerCase()) {
                case 'h':
                case 'escape':
                    // Go home
                    router.push('/');
                    break;
                case '1':
                case 'n':
                    router.push('/news');
                    break;
                case '2':
                case 'l':
                    router.push('/login');
                    break;
                case '3':
                case 'a':
                    router.push('/about');
                    break;
                case '4':
                case 'r':
                    router.push('/register');
                    break;
                case 'b':
                    // Go back
                    router.back();
                    break;
                case '?':
                    // Show keyboard shortcuts help (optional - you'd implement this)
                    console.log('Show shortcuts help');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [router, pathname]);

    return null; // This component doesn't render anything
}
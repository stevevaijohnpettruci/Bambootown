import { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import TextLink from '@/components/text-link';
import type { SharedData } from '@/types';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Discography',
        href: '/Discography',
    },
    {
        title: 'Videos',
        href: '/contact',
    },
    {
        title: 'Merch',
        href: '/contact',
    },
    {
        title: 'Event & Tour Date',
        href: '/contact',
    },
    {
        title: 'Contact',
        href: '/contact',
    },
];

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;
    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setIsScroll(window.scrollY > 1);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="overflow-visible bg-[#FFE760] text-[#1b1b18]">
            <nav
                className={`sticky top-0 z-50 w-full shadow-md flex items-center justify-between px-10 py-3 transition-all duration-300 ${
                isScroll ? 'backdrop-blur-md h-20 bg-[#FFE760]/80' : 'bg-[#FFE760]'
                }`}
            >
                <div>
                <AppLogoIcon />
                </div>

                <div className="flex gap-3 flex-wrap items-center">
                {auth.user ? (
                    <Link
                    href={route('dashboard')}
                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                    Dashboard
                    </Link>
                ) : (
                    <>
                    {mainNavItems.map((item) => (
                        <TextLink
                        key={item.title}
                        href={item.href}
                        className="font-justme text-lg px-3 py-1.5 hover:text-white"
                        >
                        {item.title}
                        </TextLink>
                    ))}
                    </>
                )}
                </div>
            </nav>
        </div>
    );
    }

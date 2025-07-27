import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';
import { usePage } from '@inertiajs/react';

type LinkProps = ComponentProps<typeof Link> & { href: string };

export default function TextLink({ className = '', children, href, ...props }: LinkProps) {
    const currentUrl = usePage().url;
    const isActive = currentUrl === href;

    return (
        <div className="flex flex-col items-center">
            <Link
                href={href}
                className={cn(
                    'text-foreground transition-colors duration-300 ease-out hover:decoration-current dark:decoration-neutral-500',
                    isActive && 'text-white ',
                    className
                )}
                {...props}
            >
                {children}
            </Link>
            {isActive && (
                <div className="w-6 h-[2px] bg-white  rounded-lg" />
            )}
        </div>
    );
}

import React from 'react';
import TextLink from './text-link';
import { Link } from 'lucide-react';
export default function AppLogoIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            
            src="/Bambootown Logo.png"
            alt="Bambootown"
            {...props}
            className='h-10 w-full'         
        />
    );
}


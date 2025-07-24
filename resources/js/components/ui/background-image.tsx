import React from "react";

type FullScreenImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt?: string;
    children?: React.ReactNode;
};

export default function BackgroundImage({ src, alt = '', children, ...props }: FullScreenImageProps) {
    return (
        <div className="relative w-full h-screen">
            <img
                src={src}
                alt={alt}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex justify-center w-full h-full">
                {children}
            </div>
        </div>
    );
}

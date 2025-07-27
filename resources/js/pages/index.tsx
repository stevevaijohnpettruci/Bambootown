import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import Hero from '@/sections/hero';
import Partnership from '@/sections/partnership';
import Discography from '@/sections/discography';
import Videos from '@/sections/video';
import {useState, useEffect} from 'react';
import Navbar from '@/components/ui/index/navbar';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isScroll, setIsScroll] = useState(false);

    useEffect(()=>{
        const HandleScroll = () => {
            setIsScroll(window.scrollY > 1);
        }
        window.addEventListener('scroll',HandleScroll);
        return ()=> window.removeEventListener('scroll',HandleScroll);
    },[]);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
                {/* Navbar */}
                    <Navbar/>
                {/* Main Sections */}
                <main className="flex-1">
                    <Hero/>
                    <Partnership/>
                    <Discography/>
                    <Videos/>
                    {/* Dummy Content */}
                    <div className="h-[1500px] bg-gradient-to-b from-transparent to-gray-200" />
                </main>
            
        </>
    );
}

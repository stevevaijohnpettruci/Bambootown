import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';
import {Calendar, Film, Disc3, 
    Box, BookOpen, Folder, 
    LayoutGrid, UserPen, MessageCircleQuestion} from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        
    },
    {
        title: 'Product',
        href: '/product',
        icon: Box,
        children:[  
            {
                title:'Product',
                href:'/product',
            },
            {
                title:'Category',
                href:'/product/categories',
            },

        ]
    },  
    {
        title: 'Videos',
        href: '/video',
        icon: Film,
        children:[
            {
                title:'Videos',
                href:'/video',
            },
            {
                title:'Category',
                href:'/video/categories',
            }
        ]
    },
    {
        title: 'Event and Tour',
        href: '/event-tour',
        icon: Calendar,
    },
    {
        title: 'Profile',
        href: 'profile',
        icon: UserPen,
    },
    {
        title: 'Help',
        href: 'help',
        icon: MessageCircleQuestion,
        children:[  
            {
                title:'tes',
                href:'tes',
            }       
        ]
    }

];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogoIcon className='w-20 h-max '></AppLogoIcon>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

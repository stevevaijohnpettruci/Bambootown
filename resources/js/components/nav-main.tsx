import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubButton, SidebarMenuSubItem} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [openMenuActive, setOpenMenuActive] = useState(true);

    const handleMenuClick = (itemTitle: string,  hasChildren: boolean) => {
        if (hasChildren) {
            setOpenMenu(openMenu === itemTitle ? null : itemTitle );
        }
    };

    
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {item.children ? (
                            // Menu item dengan children - hanya button tanpa link
                            <SidebarMenuButton 
                                onClick={() => handleMenuClick(item.title, true)}
                                isActive={page.url.startsWith(item.href)} 
                                tooltip={{ children: item.title }}
                                className="cursor-pointer"
                            >
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                                <ChevronDown 
                                    className={`ml-auto transition-transform duration-200 ${
                                        openMenu === item.title ? 'rotate-180' : ''
                                    }`} 
                                />
                            </SidebarMenuButton>
                        ) : (
                            // Menu item tanpa children - dengan link
                            <SidebarMenuButton 
                                asChild 
                                isActive={page.url.startsWith(item.href)} 
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                        
                        {/* Render children hanya jika menu terbuka */}
                        {item.children && openMenu === item.title && (
                            <div className="ml-4 mt-1">
                                {item.children.map((child) => (
                                    <SidebarMenuSubItem key={child.title}>
                                        <SidebarMenuSubButton asChild>
                                            <Link 
                                                href={child.href} 
                                                prefetch
                                                className={`${
                                                    page.url === child.href ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                                                }`}
                                            >
                                                {child.icon && <child.icon className="w-4 h-4" />}
                                                <span>{child.title}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </div>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
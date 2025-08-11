'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Settings, ShoppingCart, Users, Gem } from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/pricing-rules', label: 'Dynamic Pricing', icon: Gem },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-primary-foreground/10 hover:bg-primary-foreground/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-foreground">
                  <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3.366 6.166A.75.75 0 0 0 3 6.821v10.358c0 .33.208.622.51.726l8.256 2.752a.75.75 0 0 0 .468 0l8.256-2.752a.75.75 0 0 0 .51-.726V6.82a.75.75 0 0 0-.366-.655L12.378 1.602ZM12 3.25l7.5 4.219-3.41 1.137-7.5-4.219L12 3.25Zm-8.25 5.023L12 12.492l8.25-4.219v8.71l-7.5 2.5v-8.71L4.5 8.273v-.001Z" />
                </svg>
            </Button>
            <h1 className="text-xl font-bold font-headline text-primary-foreground">RentEase</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/settings'} tooltip={{children: "Settings"}}>
                <Link href="#">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm text-primary-foreground group-data-[collapsible=icon]:hidden">
                        <span className="font-semibold">User</span>
                        <span className="text-primary-foreground/70">user@rentease.com</span>
                    </div>
                </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

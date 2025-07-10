"use client";

import * as React from "react";
import Link from "next/link";
import {
    IconChartBar,
    IconDashboard,
    IconDatabase,
    IconFileAi,
    // IconFolder,
    IconHelp,
    IconInnerShadowTop,
    // IconListDetails,
    IconReport,
    IconSearch,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

// Main navigation configuration
const navigationConfig = {
    user: {
        name: "Admin User",
        email: "admin@company.com",
        avatar: "/avatars/admin.jpg",
    },
    mainNavigation: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },
        {
            title: "Customers",
            url: "/dashboard/customers",
            icon: IconUsers,
        },
        {
            title: "Summary",
            url: "/dashboard/summary",
            icon: IconChartBar,
        },
        // {
        //     title: "Analytics",
        //     url: "/dashboard/analytics",
        //     icon: IconListDetails,
        // },
        // {
        //     title: "Projects",
        //     url: "/dashboard/projects",
        //     icon: IconFolder,
        // },
    ],
    // Secondary navigation for future use
    secondaryNavigation: [
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: IconSettings,
        },
        {
            title: "Help & Support",
            url: "/dashboard/help",
            icon: IconHelp,
        },
        {
            title: "Search",
            url: "/dashboard/search",
            icon: IconSearch,
        },
    ],
    // Documents section for future use
    documents: [
        {
            name: "Data Library",
            url: "/dashboard/data-library",
            icon: IconDatabase,
        },
        {
            name: "Reports",
            url: "/dashboard/reports",
            icon: IconReport,
        },
        {
            name: "AI Assistant",
            url: "/dashboard/ai-assistant",
            icon: IconFileAi,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link href="/dashboard">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">Dashboard App</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navigationConfig.mainNavigation} />
                {/* Future: Add secondary navigation */}
                {/* <NavSecondary items={navigationConfig.secondaryNavigation} className="mt-auto" /> */}
                {/* Future: Add documents section */}
                {/* <NavDocuments items={navigationConfig.documents} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={navigationConfig.user} />
            </SidebarFooter>
        </Sidebar>
    );
}

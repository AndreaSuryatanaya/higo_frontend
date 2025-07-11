"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    IconChartBar,
    // IconDashboard,
    IconDatabase,
    IconFileAi,
    // IconFolder,
    IconHelp,
    IconInnerShadowTop,
    // IconListDetails,
    IconLogout,
    IconReport,
    IconSearch,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
// import { NavUser } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
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
        // {
        //     title: "Dashboard",
        //     url: "/dashboard",
        //     icon: IconDashboard,
        // },
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
    const router = useRouter();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            // Clear auth token
            document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            // Redirect to sign-in page
            router.push("/sign-in");
        }
    };

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link href="#">
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
                <SidebarMenu>
                    <SidebarMenuItem>
                        {mounted && (
                            <Button
                                className="w-full mb-5 bg-lime-400 justify-center h-8 px-2 font-normal text-center hover:bg-lime-500 text-black"
                                onClick={handleLogout}
                            >
                                <IconLogout className="!size-4" />
                                Log out
                            </Button>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
                {/* <NavUser user={navigationConfig.user} /> */}
            </SidebarFooter>
        </Sidebar>
    );
}

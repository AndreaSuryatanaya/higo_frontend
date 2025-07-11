"use client";

import { DataTable } from "@/components/data-table";
import { columns, TColumn } from "./column";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconLoader2,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function CustomersContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "15");

    const [data, setData] = useState<TColumn[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [mounted, setMounted] = useState(false);

    const navigateToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        params.set("limit", limit.toString());
        router.push(`?${params.toString()}`);
    };

    const changePageSize = (newLimit: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1"); // Reset to first page when changing page size
        params.set("limit", newLimit);
        router.push(`?${params.toString()}`);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers?page=${page}&limit=${limit}`);
                const result = await res.json();
                setData(result.data);
                setTotalPages(result.totalPages);
            } catch (err) {
                console.error("Failed to fetch customers", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, [page, limit, mounted]);

    if (!mounted) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="flex justify-center items-center min-h-screen gap-2">
                    <IconLoader2 className="h-6 w-6 animate-spin" />
                    {/* <span className="text-sm text-gray-600">Loading...</span> */}
                </div>
            </div>
        );
    }

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="flex items-center min-h-screen justify-center gap-2">
                        <IconLoader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </div>
            ) : (
                <DataTable columns={columns} data={data} />
            )}

            <div className="mt-4 mr-8 flex justify-end items-center gap-4">
                <div className="hidden items-center gap-2 lg:flex">
                    <Label htmlFor="rows-per-page" className="text-sm font-sans">
                        Rows per page
                    </Label>
                    <Select value={limit.toString()} onValueChange={changePageSize}>
                        <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                            <SelectValue placeholder={limit.toString()} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 15, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <span className="text-sm font-sans text-white">
                    Page <span className="font-sans text-white">{page}</span> of {totalPages}
                </span>

                <Button
                    variant="outline"
                    className="hidden size-8 lg:flex"
                    size="icon"
                    onClick={() => navigateToPage(1)}
                    disabled={page <= 1}
                >
                    <span className="sr-only">Go to first page</span>
                    <IconChevronsLeft />
                </Button>

                <Button
                    variant="outline"
                    className="size-8"
                    size="icon"
                    onClick={() => navigateToPage(page - 1)}
                    disabled={page <= 1}
                >
                    <span className="sr-only">Go to previous page</span>
                    <IconChevronLeft />
                </Button>

                <Button
                    variant="outline"
                    className="size-8"
                    size="icon"
                    onClick={() => navigateToPage(page + 1)}
                    disabled={page >= totalPages}
                >
                    <span className="sr-only">Go to next page</span>
                    <IconChevronRight />
                </Button>

                <Button
                    variant="outline"
                    className="hidden size-8 lg:flex"
                    size="icon"
                    onClick={() => navigateToPage(totalPages)}
                    disabled={page >= totalPages}
                >
                    <span className="sr-only">Go to last page</span>
                    <IconChevronsRight />
                </Button>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense
            fallback={
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="flex items-center gap-2">
                        <IconLoader2 className="h-6 w-6 animate-spin" />
                        <span className="text-sm text-gray-600">Loading...</span>
                    </div>
                </div>
            }
        >
            <CustomersContent />
        </Suspense>
    );
}

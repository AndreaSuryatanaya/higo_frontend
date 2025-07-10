"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./column";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "15");

    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/customers?page=${page}&limit=${limit}`);
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
    }, [page, limit]);

    return (
        <div>
            {loading ? (
                <p className="w-full flex justify-center items-center min-h-screen">Loading...</p>
            ) : (
                <DataTable columns={columns} data={data} />
            )}

            <div className="mt-4 flex justify-center items-center gap-4">
                <a
                    href={`?page=${page - 1}&limit=${limit}`}
                    className={`btn ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
                >
                    Previous
                </a>

                <span className="text-sm font-medium text-gray-700">
                    Page <span className="font-bold">{page}</span> of {totalPages}
                </span>

                <a
                    href={`?page=${page + 1}&limit=${limit}`}
                    className={`btn ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                >
                    Next
                </a>
            </div>
        </div>
    );
}

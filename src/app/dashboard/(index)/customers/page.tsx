import { DataTable } from "@/components/data-table";
import { getCustomers } from "./lib/data";
import { columns } from "./column";

interface PageProps {
    searchParams: {
        page?: string;
        limit?: string;
    };
}

export default async function Page({ searchParams }: PageProps) {
    const limit = parseInt(searchParams.limit ?? "10");
    const customers = await getCustomers({ limit });
    console.log("customers", customers);

    return (
        <>
            <DataTable columns={columns} data={customers} />
        </>
    );
}

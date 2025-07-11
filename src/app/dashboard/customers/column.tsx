import { ColumnDef } from "@tanstack/react-table";

export type TColumn = {
    id: number;
    customerId: number;
    locationName: string;
    date: string;
    loginHour: string;
    fullName: string;
    birthYear: number;
    gender: string;
    email: string;
    phone: string;
    device: string;
    digitalInterest: string;
    locationType: string;
    createdAt: string;
    updatedAt: string;
};

export const columns: ColumnDef<TColumn>[] = [
    {
        accessorKey: "fullName",
        header: "Full Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "device",
        header: "Device",
    },
    {
        accessorKey: "digitalInterest",
        header: "Interest",
    },
    {
        accessorKey: "locationName",
        header: "Location",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "loginHour",
        header: "Login Hour",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
];

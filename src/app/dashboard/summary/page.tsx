"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { IconLoader2, IconUsers, IconDeviceMobile, IconMapPin, IconHeart } from "@tabler/icons-react";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SummaryData {
    totalCustomers: number;
    demographics: {
        age: {
            average: number;
            min: number;
            max: number;
        };
        birthYear: {
            average: number;
            min: number;
            max: number;
        };
        gender: {
            Male: number;
            Female: number;
        };
    };
    digitalInterests: Array<{
        count: number;
        interest: string;
    }>;
    devices: Array<{
        count: number;
        device: string;
    }>;
    locationTypes: Array<{
        count: number;
        locationType: string;
    }>;
}

const chartConfig = {
    male: {
        label: "Male",
        color: "hsl(var(--chart-1))",
    },
    female: {
        label: "Female",
        color: "hsl(var(--chart-2))",
    },
    interest: {
        label: "Interest",
        color: "hsl(var(--chart-3))",
    },
    device: {
        label: "Device",
        color: "hsl(var(--chart-4))",
    },
    location: {
        label: "Location",
        color: "hsl(var(--chart-5))",
    },
};

const COLORS = [
    "#a3e635", // lime-400
    "#84cc16", // lime-500
    "#65a30d", // lime-600
    "#4d7c0f", // lime-700
    "#365314", // lime-800
    "#1a2e05", // lime-900
    "#ecfccb", // lime-100
    "#d9f99d", // lime-200
];

export default function SummaryPage() {
    const [data, setData] = useState<SummaryData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/statistics/summary`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch summary data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="flex justify-center items-center min-h-screen gap-2">
                    <IconLoader2 className="h-8 w-8 animate-spin" />
                    {/* <span className="text-lg text-gray-600">Loading summary...</span> */}
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="p-6">
                <div className="text-center text-gray-500">Failed to load summary data. Please try again.</div>
            </div>
        );
    }

    // Transform data for charts
    const genderData = [
        { name: "Male", value: data.demographics.gender.Male, fill: COLORS[0] },
        { name: "Female", value: data.demographics.gender.Female, fill: COLORS[1] },
    ];

    const digitalInterestsData = data.digitalInterests.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
    }));

    // Debug log to check data
    console.log("Digital Interests Data:", digitalInterestsData);

    const devicesData = data.devices.slice(0, 6).map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
    }));

    const locationData = data.locationTypes.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <div className="p-4 lg:p-6 space-y-6 max-w-full overflow-x-hidden">
            {/* Header */}
            <div className="flex items-center gap-3">
                <IconUsers className="h-8 w-8 text-lime-400" />
                <div>
                    <h1 className="text-3xl font-bold">Customer Summary</h1>
                    <p className="text-gray-600">Overview of customer demographics and preferences</p>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                        <IconUsers className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalCustomers.toLocaleString()}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Age</CardTitle>
                        <IconHeart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.demographics.age.average}</div>
                        <p className="text-xs text-muted-foreground">
                            Range: {data.demographics.age.min} - {data.demographics.age.max}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Device</CardTitle>
                        <IconDeviceMobile className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.devices[0]?.device}</div>
                        <p className="text-xs text-muted-foreground">{data.devices[0]?.count.toLocaleString()} users</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Location</CardTitle>
                        <IconMapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.locationTypes[0]?.locationType}</div>
                        <p className="text-xs text-muted-foreground">
                            {data.locationTypes[0]?.count.toLocaleString()} customers
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-full">
                {/* Gender Distribution */}
                <Card className="w-full min-w-0">
                    <CardHeader>
                        <CardTitle>Gender Distribution</CardTitle>
                        <CardDescription>Distribution of customers by gender</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={genderData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {genderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Digital Interests */}
                <Card className="w-full min-w-0">
                    <CardHeader>
                        <CardTitle>Digital Interests</CardTitle>
                        <CardDescription>Top customer interests and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <ChartContainer config={chartConfig} className="h-[300px] w-full mt-20">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={digitalInterestsData} margin={{ left: 10, right: 10, bottom: 60 }}>
                                    <XAxis
                                        dataKey="interest"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        fontSize={10}
                                        interval={0}
                                    />
                                    <YAxis />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                        formatter={(value) => [value.toLocaleString(), "Customers"]}
                                    />
                                    <Bar dataKey="count" fill="#84cc16" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Device Distribution */}
                <Card className="w-full min-w-0">
                    <CardHeader>
                        <CardTitle>Device Distribution</CardTitle>
                        <CardDescription>Top devices used by customers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={devicesData} margin={{ left: 10, right: 10, bottom: 20 }}>
                                    <XAxis dataKey="device" angle={-45} textAnchor="end" height={60} fontSize={11} />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="count" fill="#84cc16" />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Location Types */}
                <Card className="w-full min-w-0">
                    <CardHeader>
                        <CardTitle>Location Types</CardTitle>
                        <CardDescription>Customer distribution by location type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={locationData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="count"
                                        label={({ locationType, percent }) =>
                                            `${locationType} ${(percent * 100).toFixed(1)}%`
                                        }
                                    >
                                        {locationData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

type GetCustomersParams = {
    // page?: number;
    limit?: number;
};

export async function getCustomers({ limit = 10 }: GetCustomersParams) {
    const res = await fetch(`http://localhost:3000/customers?limit=${limit}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch customers");
    }

    return res.json();
}

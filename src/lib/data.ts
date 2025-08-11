
// In a real application, this data would be stored in a database.
// For this prototype, we're using in-memory data.

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  hint: string;
}

export interface Rental {
    id: string;
    product: Product;
    customer: string;
    status: 'Picked Up' | 'Returned' | 'Reserved' | 'Active' | 'Upcoming';
    from: string;
    to: string;
    amount: string;
    avatar?: string;
    dueDate?: string;
}


export const products: Product[] = [
    {
      id: "prod_1",
      name: "Professional DSLR Camera",
      description: "Capture stunning photos and videos with our top-of-the-line DSLR camera. Comes with a standard 18-55mm lens, battery, and charger.",
      price: 50,
      unit: "day",
      image: "https://placehold.co/600x400.png",
      hint: "camera photography",
    },
    {
      id: "prod_2",
      name: "4-Person Camping Tent",
      description: "Spacious and durable tent, perfect for your next outdoor adventure. Weather-resistant and easy to set up.",
      price: 25,
      unit: "day",
      image: "https://placehold.co/600x400.png",
      hint: "tent camping",
    },
    {
      id: "prod_3",
      name: "High-Performance Projector",
      description: "Ideal for business presentations or movie nights. Bright and clear display with HDMI and USB inputs.",
      price: 40,
      unit: "day",
      image: "https://placehold.co/600x400.png",
      hint: "projector movie",
    },
    {
      id: "prod_4",
      name: "Heavy-Duty Mountain Bike",
      description: "Conquer any trail with this rugged and reliable mountain bike. Features front suspension and 21-speed gears.",
      price: 35,
      unit: "day",
      image: "https://placehold.co/600x400.png",
      hint: "mountain bike",
    },
    {
      id: "prod_5",
      name: "Portable PA System",
      description: "Powerful sound system for events, parties, and public speaking. Includes microphone and stand.",
      price: 60,
      unit: "day",
      image: "https://placehold.co/600x400.png",
      hint: "speaker audio",
    },
    {
      id: "prod_6",
      name: "Cordless Power Drill",
      description: "A versatile and powerful drill for all your DIY projects. Comes with a full set of bits and two batteries.",
      price: 20,
      unit: "day",
      image: "https://placehold.co/600x400.png",
      hint: "power tool",
    }
  ];

export const rentals: Omit<Rental, 'product'> & { productId: string, customerId: string }[] = [
    { id: "ORD001", customerId: "user_1", productId: "prod_1", status: "Picked Up", from: "2023-06-23", to: "2023-06-25", amount: "$250.00" },
    { id: "ORD002", customerId: "user_2", productId: "prod_2", status: "Returned", from: "2023-06-24", to: "2023-06-26", amount: "$150.00" },
    { id: "ORD003", customerId: "user_3", productId: "prod_3", status: "Reserved", from: "2023-06-25", to: "2023-06-28", amount: "$350.00" },
    { id: "ORD004", customerId: "user_4", productId: "prod_4", status: "Picked Up", from: "2023-06-26", to: "2023-06-29", amount: "$450.00" },
    { id: "ORD005", customerId: "user_5", productId: "prod_5", status: "Returned", from: "2023-06-27", to: "2023-06-30", amount: "$550.00" },
    { id: "ORD006", customerId: "user_2", productId: "prod_1", status: "Returned", from: "2024-06-01", to: "2024-06-05", amount: "$200.00" },
    { id: "ORD007", customerId: "user_2", productId: "prod_2", status: "Active", from: "2024-07-10", to: "2024-07-17", amount: "$175.00" },
    { id: "ORD008", customerId: "user_2", productId: "prod_3", status: "Upcoming", from: "2024-08-01", to: "2024-08-03", amount: "$80.00" },
];

export const customers = [
    { id: "user_1", name: "Liam Johnson", avatar: "LJ" },
    { id: "user_2", name: "Olivia Smith", avatar: "OS" },
    { id: "user_3", name: "Noah Williams", avatar: "NW" },
    { id: "user_4", name: "Emma Brown", avatar: "EB" },
    { id: "user_5", name: "Ava Jones", avatar: "AJ" },
    { id: "user_6", name: "Olivia Martin", avatar: "OM" },
    { id: "user_7", name: "Jackson Lee", avatar: "JL" },
    { id: "user_8", name: "Isabella Nguyen", avatar: "IN" },
    { id: "user_9", name: "William Kim", avatar: "WK" },
    { id: "user_10", name: "Sophia Davis", avatar: "SD" },
]


export function getRentals(): Rental[] {
    return rentals.map(r => ({
        ...r,
        product: products.find(p => p.id === r.productId)!,
        customer: customers.find(c => c.id === r.customerId)!.name
    }));
}

export function getUpcomingReturns() {
    return [
        { name: "DSLR Camera", customer: "Olivia Martin", dueDate: "in 2 days", avatar: "OM" },
        { name: "Camping Tent", customer: "Jackson Lee", dueDate: "in 3 days", avatar: "JL" },
        { name: "Electric Drill", customer: "Isabella Nguyen", dueDate: "in 4 days", avatar: "IN" },
        { name: "Projector", customer: "William Kim", dueDate: "in 5 days", avatar: "WK" },
        { name: "Mountain Bike", customer: "Sophia Davis", dueDate: "in 5 days", avatar: "SD" },
    ]
}

export function createRental(productId: string, from: Date, to: Date, price: number) {
    const newRental = {
        id: `ORD${String(rentals.length + 1).padStart(3, '0')}`,
        customerId: 'user_2', // Mock current customer
        productId,
        status: 'Reserved' as const,
        from: from.toISOString().split('T')[0],
        to: to.toISOString().split('T')[0],
        amount: `$${price.toFixed(2)}`,
    };
    rentals.push(newRental);
    return newRental;
}

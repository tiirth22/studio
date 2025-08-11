
import { format } from 'date-fns';

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


// --- Mock Data ---
const products: Product[] = [
    { id: 'prod_1', name: 'Professional DSLR Camera', description: 'High-end camera for professional photography and videography.', price: 50, unit: 'day', image: 'https://placehold.co/600x400.png', hint: 'camera photography' },
    { id: 'prod_2', name: 'Heavy-Duty Power Drill', description: 'A powerful drill for all your construction and home improvement needs.', price: 25, unit: 'day', image: 'https://placehold.co/600x400.png', hint: 'power tool' },
    { id: 'prod_3', name: 'Camping Tent (4-Person)', description: 'Spacious and durable tent, perfect for family camping trips.', price: 35, unit: 'day', image: 'https://placehold.co/600x400.png', hint: 'camping tent' },
    { id: 'prod_4', name: 'Portable Projector', description: 'High-definition projector for movie nights or business presentations.', price: 40, unit: 'day', image: 'https://placehold.co/600x400.png', hint: 'projector screen' },
    { id: 'prod_5', name: 'Mountain Bike', description: 'A sturdy bike designed for off-road trails and rugged terrain.', price: 45, unit: 'day', image: 'https://placehold.co/600x400.png', hint: 'mountain bike' },
    { id: 'prod_6', name: 'Electric Hedge Trimmer', description: 'Lightweight and efficient trimmer for shaping hedges and bushes.', price: 20, unit: 'day', image: 'https://placehold.co/600x400.png', hint: 'gardening tool' },
    { id: 'prod_7', name: 'Stand-Up Paddleboard', description: 'Enjoy a day on the water with this stable and easy-to-use paddleboard.', price: 55, unit: 'day', image: 'https://placehold.co/600x400.png', hint: 'paddleboard water' },
    { id: 'prod_8', name: 'Industrial Dehumidifier', description: 'Powerful dehumidifier for large spaces and water damage restoration.', price: 70, unit: 'day', image: 'https://placehold.co/600x400.png', hint: 'industrial equipment' },
];

const rentals: Omit<Rental, 'product' | 'customer'> & { productId: string; customerId: string }[] = [
    { id: 'rent_1', productId: 'prod_1', customerId: 'user_1', status: 'Returned', from: '2024-06-01', to: '2024-06-05', amount: '$200.00' },
    { id: 'rent_2', productId: 'prod_3', customerId: 'user_2', status: 'Active', from: '2024-06-20', to: '2024-06-27', amount: '$245.00' },
    { id: 'rent_3', productId: 'prod_5', customerId: 'user_3', status: 'Active', from: '2024-06-22', to: '2024-06-24', amount: '$90.00' },
    { id: 'rent_4', productId: 'prod_2', customerId: 'user_4', status: 'Upcoming', from: '2024-07-01', to: '2024-07-03', amount: '$50.00' },
    { id: 'rent_5', productId: 'prod_4', customerId: 'user_1', status: 'Returned', from: '2024-05-15', to: '2024-05-20', amount: '$200.00' },
];

const customers = [
    { id: 'user_1', name: 'Alice Johnson' },
    { id: 'user_2', name: 'Bob Williams' },
    { id: 'user_3', name: 'Charlie Brown' },
    { id: 'user_4', name: 'Diana Prince' },
];
// --- End Mock Data ---


export async function getProducts(): Promise<Product[]> {
    // Simulate DB query
    return Promise.resolve(products);
}

export async function getProductById(id: string): Promise<Product | undefined> {
    // Simulate DB query
    return Promise.resolve(products.find(p => p.id === id));
}


export async function getRentals(): Promise<Rental[]> {
    const populatedRentals = rentals.map(r => {
        const product = products.find(p => p.id === r.productId);
        const customer = customers.find(c => c.id === r.customerId);
        if (!product || !customer) {
            throw new Error('Invalid rental data');
        }
        return { ...r, product, customer: customer.name };
    }).sort((a,b) => new Date(b.from).getTime() - new Date(a.from).getTime());

    return Promise.resolve(populatedRentals);
}

export async function getRentalsByCustomer(customerId: string): Promise<Rental[]> {
     const customerRentals = rentals
        .filter(r => r.customerId === customerId)
        .map(r => {
            const product = products.find(p => p.id === r.productId);
            const customer = customers.find(c => c.id === r.customerId);
            if (!product || !customer) {
                throw new Error('Invalid rental data');
            }
            return { ...r, product, customer: customer.name };
        }).sort((a,b) => new Date(b.from).getTime() - new Date(a.from).getTime());
    
    return Promise.resolve(customerRentals);
}


export async function getUpcomingReturns() {
    return Promise.resolve([
        { name: "DSLR Camera", customer: "Olivia Martin", dueDate: "in 2 days", avatar: "OM" },
        { name: "Camping Tent", customer: "Jackson Lee", dueDate: "in 3 days", avatar: "JL" },
        { name: "Electric Drill", customer: "Isabella Nguyen", dueDate: "in 4 days", avatar: "IN" },
        { name: "Projector", customer: "William Kim", dueDate: "in 5 days", avatar: "WK" },
        { name: "Mountain Bike", customer: "Sophia Davis", dueDate: "in 5 days", avatar: "SD" },
    ]);
}

export async function createRental(productId: string, from: Date, to: Date, price: number) {
    // In a real app, you'd get the customer ID from the authenticated session
    const customerId = 'user_2'; 
    
    const newRental = {
        id: `rent_${Date.now()}`,
        productId,
        customerId,
        from: format(from, 'yyyy-MM-dd'),
        to: format(to, 'yyyy-MM-dd'),
        amount: `$${price.toFixed(2)}`,
        status: 'Reserved' as const,
    };

    rentals.push(newRental);
    
    const product = products.find(p => p.id === productId)!;
    const customer = customers.find(c => c.id === customerId)!;
    
    return Promise.resolve({ ...newRental, product, customer: customer.name });
}


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

const products: Product[] = [
  { id: 'prod_1', name: 'High-Performance E-Bike', description: 'A sleek and powerful electric bike for urban adventures.', price: 75, unit: 'day', image: 'https://images.unsplash.com/photo-1577962144705-a386b620553f?q=80&w=600&h=400&fit=crop', hint: 'electric bike' },
  { id: 'prod_2', name: 'Professional DSLR Camera', description: 'Capture stunning photos with this full-frame DSLR.', price: 50, unit: 'day', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&h=400&fit=crop', hint: 'camera photography' },
  { id: 'prod_3', name: 'Camping Tent for 4 People', description: 'Spacious and durable tent, perfect for family camping trips.', price: 40, unit: 'day', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600&h=400&fit=crop', hint: 'camping tent' },
  { id: 'prod_4', name: 'Portable PA Sound System', description: 'Compact yet powerful sound system for events.', price: 90, unit: 'day', image: 'https://images.unsplash.com/photo-1588693951253-33068f655113?q=80&w=600&h=400&fit=crop', hint: 'sound system' },
  { id: 'prod_5', name: 'Kayak for Two', description: 'Explore the waters with this stable and fun tandem kayak.', price: 60, unit: 'day', image: 'https://images.unsplash.com/photo-1594002135205-d12a76b68593?q=80&w=600&h=400&fit=crop', hint: 'kayak water' },
  { id: 'prod_6', name: 'Heavy-Duty Power Drill', description: 'A reliable power drill for any of your construction needs.', price: 25, unit: 'day', image: 'https://images.unsplash.com/photo-1621989013282-73c155d21362?q=80&w=600&h=400&fit=crop', hint: 'power tool' },
  { id: 'prod_7', name: 'Stand-up Paddleboard', description: 'Enjoy a full-body workout on the water with our SUP.', price: 55, unit: 'day', image: 'https://images.unsplash.com/photo-1598232936352-4a0b27464c12?q=80&w=600&h=400&fit=crop', hint: 'paddleboard water' },
  { id: 'prod_8', name: '88-Key Digital Piano', description: 'A full-sized digital piano with weighted keys and realistic sound.', price: 80, unit: 'day', image: 'https://images.unsplash.com/photo-1520442931968-c99738099b82?q=80&w=600&h=400&fit=crop', hint: 'piano music' },
];

let rentals: Rental[] = [
    { id: 'rent_1', product: products[0], customer: 'Alice Johnson', status: 'Returned', from: '2024-06-01', to: '2024-06-05', amount: '$200.00' },
    { id: 'rent_2', product: products[1], customer: 'Bob Williams', status: 'Active', from: '2024-06-20', to: '2024-06-25', amount: '$245.00' },
    { id: 'rent_3', product: products[2], customer: 'Charlie Brown', status: 'Active', from: '2024-06-22', to: '2024-06-28', amount: '$90.00' },
    { id: 'rent_4', product: products[3], customer: 'Diana Prince', status: 'Upcoming', from: '2024-07-01', to: '2024-07-03', amount: '$50.00' },
    { id: 'rent_5', product: products[0], customer: 'Alice Johnson', status: 'Returned', from: '2024-05-15', to: '2024-05-20', amount: '$200.00' },
];


export async function getProducts(): Promise<Product[]> {
    return Promise.resolve(products);
}

export async function getProductById(id: string): Promise<Product | undefined> {
    return Promise.resolve(products.find(p => p.id === id));
}

export async function getRentals(): Promise<Rental[]> {
    return Promise.resolve(rentals.sort((a,b) => new Date(b.from).getTime() - new Date(a.from).getTime()));
}

export async function getRentalsByCustomer(customerId: string): Promise<Rental[]> {
    // In a real app, customerId would be used to fetch from the DB.
    // For now, we return a subset of rentals for demonstration.
    const customerRentals = rentals.filter(r => ['Alice Johnson', 'Diana Prince'].includes(r.customer));
    return Promise.resolve(customerRentals.sort((a,b) => new Date(b.from).getTime() - new Date(a.from).getTime()));
}

export async function getUpcomingReturns() {
    return Promise.resolve([
        { name: 'High-Performance E-Bike', customer: 'Bob Williams', dueDate: '2024-06-25', avatar: 'BW' },
        { name: 'Camping Tent for 4 People', customer: 'Charlie Brown', dueDate: '2024-06-28', avatar: 'CB' },
    ]);
}

export async function createRental(productId: string, from: Date, to: Date, price: number) {
    const product = await getProductById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    const newRental: Rental = {
        id: `rent_${Date.now()}`,
        product,
        // In a real app, you'd get the customer from the session
        customer: 'Diana Prince', 
        status: 'Reserved',
        from: format(from, 'yyyy-MM-dd'),
        to: format(to, 'yyyy-MM-dd'),
        amount: `$${price.toFixed(2)}`,
    };

    rentals.push(newRental);
    return Promise.resolve(newRental);
}

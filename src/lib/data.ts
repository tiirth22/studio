import { db } from './db';
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

export async function getProducts(): Promise<Product[]> {
    const { rows } = await db.query('SELECT * FROM products');
    return rows.map(row => ({
        id: row.id,
        name: row.name,
        description: row.description,
        price: parseFloat(row.price),
        unit: row.unit,
        image: row.image,
        hint: row.hint,
    }));
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (rows.length === 0) {
        return undefined;
    }
    const row = rows[0];
    return {
        id: row.id,
        name: row.name,
        description: row.description,
        price: parseFloat(row.price),
        unit: row.unit,
        image: row.image,
        hint: row.hint,
    };
}


export async function getRentals(): Promise<Rental[]> {
    const { rows } = await db.query(`
        SELECT 
            r.id, 
            r.status, 
            r.from_date, 
            r.to_date, 
            r.amount, 
            p.id as product_id, 
            p.name as product_name, 
            p.description as product_description,
            p.price as product_price,
            p.unit as product_unit,
            p.image as product_image,
            p.hint as product_hint,
            c.name as customer_name
        FROM rentals r
        JOIN products p ON r.product_id = p.id
        JOIN customers c ON r.customer_id = c.id
        ORDER BY r.from_date DESC
    `);
    
    return rows.map(row => ({
        id: row.id,
        status: row.status,
        from: format(new Date(row.from_date), 'yyyy-MM-dd'),
        to: format(new Date(row.to_date), 'yyyy-MM-dd'),
        amount: `$${parseFloat(row.amount).toFixed(2)}`,
        customer: row.customer_name,
        product: {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            price: parseFloat(row.product_price),
            unit: row.product_unit,
            image: row.product_image,
            hint: row.product_hint
        }
    }));
}

export async function getRentalsByCustomer(customerId: string): Promise<Rental[]> {
     const { rows } = await db.query(`
        SELECT 
            r.id, 
            r.status, 
            r.from_date, 
            r.to_date, 
            r.amount, 
            p.id as product_id, 
            p.name as product_name, 
            p.description as product_description,
            p.price as product_price,
            p.unit as product_unit,
            p.image as product_image,
            p.hint as product_hint,
            c.name as customer_name
        FROM rentals r
        JOIN products p ON r.product_id = p.id
        JOIN customers c ON r.customer_id = c.id
        WHERE r.customer_id = $1
        ORDER BY r.from_date DESC
    `, [customerId]);
    
    return rows.map(row => ({
        id: row.id,
        status: row.status,
        from: format(new Date(row.from_date), 'yyyy-MM-dd'),
        to: format(new Date(row.to_date), 'yyyy-MM-dd'),
        amount: `$${parseFloat(row.amount).toFixed(2)}`,
        customer: row.customer_name,
        product: {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            price: parseFloat(row.product_price),
            unit: row.product_unit,
            image: row.product_image,
            hint: row.product_hint
        }
    }));
}


export async function getUpcomingReturns() {
    // This is more complex and depends on the exact schema and logic for "upcoming".
    // For now, we'll return a placeholder. In a real app, this would be a specific SQL query.
    return [
        { name: "DSLR Camera", customer: "Olivia Martin", dueDate: "in 2 days", avatar: "OM" },
        { name: "Camping Tent", customer: "Jackson Lee", dueDate: "in 3 days", avatar: "JL" },
        { name: "Electric Drill", customer: "Isabella Nguyen", dueDate: "in 4 days", avatar: "IN" },
        { name: "Projector", customer: "William Kim", dueDate: "in 5 days", avatar: "WK" },
        { name: "Mountain Bike", customer: "Sophia Davis", dueDate: "in 5 days", avatar: "SD" },
    ]
}

export async function createRental(productId: string, from: Date, to: Date, price: number) {
    // In a real app, you'd get the customer ID from the authenticated session
    const customerId = 'user_2'; 
    const fromDate = format(from, 'yyyy-MM-dd');
    const toDate = format(to, 'yyyy-MM-dd');
    const status = 'Reserved';

    const { rows } = await db.query(
        'INSERT INTO rentals (product_id, customer_id, from_date, to_date, amount, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [productId, customerId, fromDate, toDate, price, status]
    );

    return rows[0];
}

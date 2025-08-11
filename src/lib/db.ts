import { Pool } from 'pg';

if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is not set');
}

export const db = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

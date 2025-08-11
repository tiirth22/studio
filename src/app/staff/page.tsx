import { redirect } from 'next/navigation';

export default function StaffPage() {
  // Redirect to the products page by default for staff
  redirect('/staff/products');
}

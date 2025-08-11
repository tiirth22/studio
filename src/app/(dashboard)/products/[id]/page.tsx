
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, Edit, Package, CalendarDays } from 'lucide-react';

// Mock data - in a real app, this would be fetched from a database
const products = [
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


export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-headline">Product Not Found</h1>
            <Card>
                <CardContent>
                <div className="flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg p-12 h-80">
                    <Package className="h-16 w-16 text-muted-foreground" />
                    <p className="mt-4 text-lg font-semibold">The requested product could not be found.</p>
                </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">{product.name}</h1>
                <p className="text-muted-foreground">Manage product details, settings, and availability.</p>
            </div>
            <Button>
                <Edit className="mr-2 h-4 w-4" />
                Save Changes
            </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Information</CardTitle>
                        <CardDescription>Edit the general details of your product.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="product-name">Product Name</Label>
                            <Input id="product-name" defaultValue={product.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="product-description">Description</Label>
                            <Textarea id="product-description" defaultValue={product.description} className="min-h-32" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Rental Settings & Pricing</CardTitle>
                        <CardDescription>Configure how this product is rented.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="rental-price">Price per Day</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="rental-price" type="number" defaultValue={product.price} className="pl-8" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rental-unit">Rental Unit</Label>
                                <Input id="rental-unit" defaultValue={product.unit} disabled />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground pt-4">
                            Advanced pricing (hourly, weekly, etc.) and custom rental durations will be configurable in the "Dynamic Pricing" section.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-8">
                <Card>
                    <CardHeader className="p-0">
                        <div className="relative aspect-[4/3] w-full">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover rounded-t-lg"
                                data-ai-hint={product.hint}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Button variant="outline" className="w-full">
                            Change Image
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Availability</CardTitle>
                        <CardDescription>View and manage rental dates.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="multiple"
                            disabled={{ before: new Date() }}
                            selected={[new Date(2024, 6, 12), new Date(2024, 6, 13), new Date(2024, 6, 20)]}
                            className="p-0"
                         />
                         <Separator className="my-4" />
                         <div className="flex items-center gap-2 text-sm">
                             <span className="h-3 w-3 rounded-full bg-primary" />
                             <span>Booked Dates</span>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

    
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Pencil } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  hint: string;
}

export default function ProductCard({ id, name, description, price, unit, image, hint }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg group">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                data-ai-hint={hint}
            />
            <Link href={`/products/${id}`} className="absolute top-2 right-2">
                <Button size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit Product</span>
                </Button>
            </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div className="text-lg font-bold">
          ${price} <span className="text-sm font-normal text-muted-foreground">/{unit}</span>
        </div>
        <Button>
          <CalendarDays className="mr-2 h-4 w-4" />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
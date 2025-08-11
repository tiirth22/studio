'use server';

/**
 * @fileOverview A flow for generating pricing rules for rental products.
 *
 * - generatePricingRules - A function that generates pricing rules based on product details, rental periods, and customer segments.
 * - GeneratePricingRulesInput - The input type for the generatePricingRules function.
 * - GeneratePricingRulesOutput - The return type for the generatePricingRules function.
 */

import {z} from 'zod';

const GeneratePricingRulesInputSchema = z.object({
  productName: z.string().describe('The name of the rental product.'),
  rentalPeriods: z
    .string()
    .describe(
      'A comma-separated list of rental periods (e.g., hourly, daily, weekly, monthly).'
    ),
  customerSegments: z
    .string()
    .describe(
      'A comma-separated list of customer segments (e.g., corporate, VIP, seasonal).'
    ),
  basePrice: z.number().describe('The base price of the rental product.'),
});
export type GeneratePricingRulesInput = z.infer<typeof GeneratePricingRulesInputSchema>;

const GeneratePricingRulesOutputSchema = z.object({
  pricingRules: z
    .string()
    .describe(
      'A detailed description of the generated pricing rules for different rental periods and customer segments.'
    ),
});
export type GeneratePricingRulesOutput = z.infer<typeof GeneratePricingRulesOutputSchema>;

export async function generatePricingRules(input: GeneratePricingRulesInput): Promise<GeneratePricingRulesOutput> {
  const { productName, rentalPeriods, customerSegments, basePrice } = input;

  const periods = rentalPeriods.split(',').map(p => p.trim());
  const segments = customerSegments.split(',').map(s => s.trim());

  let rules = `Pricing for ${productName} (Base Price: $${basePrice}/day):\n\n`;

  rules += "Time-Dependent Pricing:\n";
  periods.forEach(period => {
    let price = basePrice;
    switch (period.toLowerCase()) {
      case 'hourly':
        price = basePrice / 8;
        rules += `- Hourly: $${price.toFixed(2)}\n`;
        break;
      case 'daily':
        rules += `- Daily: $${basePrice.toFixed(2)}\n`;
        break;
      case 'weekly':
        price = basePrice * 5; // e.g., discount for a week
        rules += `- Weekly: $${price.toFixed(2)} (2 days free!)\n`;
        break;
      case 'monthly':
        price = basePrice * 20; // e.g., discount for a month
        rules += `- Monthly: $${price.toFixed(2)} (10 days free!)\n`;
        break;
    }
  });

  rules += "\nCustomer-Specific Rules:\n";
  segments.forEach(segment => {
    switch (segment.toLowerCase()) {
      case 'corporate':
        rules += "- Corporate: 15% discount on all rentals.\n";
        break;
      case 'vip':
        rules += "- VIP: 25% discount and free delivery.\n";
        break;
      case 'seasonal':
        rules += "- Seasonal: 10% surcharge during peak season.\n";
        break;
      default:
        rules += `- ${segment}: Standard pricing applies.\n`;
    }
  });
  
  rules += "\nDiscount Rules:\n";
  rules += "- Long-term rentals (over 1 month) get an additional 5% off.\n";
  rules += "- Rent 2, get 1 free on select accessories.\n";


  return Promise.resolve({ pricingRules: rules });
}

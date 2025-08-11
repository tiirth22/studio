'use server';

/**
 * @fileOverview A flow for generating pricing rules for rental products.
 *
 * - generatePricingRules - A function that generates pricing rules based on product details, rental periods, and customer segments.
 * - GeneratePricingRulesInput - The input type for the generatePricingRules function.
 * - GeneratePricingRulesOutput - The return type for the generatePricingRules function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return generatePricingRulesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePricingRulesPrompt',
  input: {schema: GeneratePricingRulesInputSchema},
  output: {schema: GeneratePricingRulesOutputSchema},
  prompt: `You are an expert in creating pricing strategies for rental products.

  Based on the product name: {{{productName}}},
  available rental periods: {{{rentalPeriods}}},
  customer segments: {{{customerSegments}}},
  and the base price: {{{basePrice}}},

  generate a detailed description of pricing rules that maximizes revenue.
  Consider time-dependent pricing, discount rules, and customer-specific rules.
`,
});

const generatePricingRulesFlow = ai.defineFlow(
  {
    name: 'generatePricingRulesFlow',
    inputSchema: GeneratePricingRulesInputSchema,
    outputSchema: GeneratePricingRulesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

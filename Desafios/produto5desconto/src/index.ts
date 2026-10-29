import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

export interface ProductInput {
    price: number;
}

export interface DiscountResult {
    originalPrice: number;
    discountAmount: number;
    newPrice: number;
}

export class DiscountCalculatorService {
    private static readonly DISCOUNT_PERCENTAGE: number = 0.05;

    public static applyDiscount(data: ProductInput): DiscountResult {
        if (data.price < 0) {
            throw new Error('Price cannot be a negative value.');
        }

        const discountAmount = Number((data.price * this.DISCOUNT_PERCENTAGE).toFixed(2));
        const newPrice = Number((data.price - discountAmount).toFixed(2));

        return {
            originalPrice: data.price,
            discountAmount,
            newPrice
        };
    }
}

async function main(): Promise<void> {
    const rl = createInterface({ input, output });

    try {
        const priceInput = await rl.question('Digite o preço do produto: ');
        const price = parseFloat(priceInput);

        if (isNaN(price)) {
            throw new Error('Invalid numeric input provided.');
        }

        const result = DiscountCalculatorService.applyDiscount({ price });

        console.log(`Preço original: R$ ${result.originalPrice.toFixed(2)}`);
        console.log(`Desconto de 5%: R$ ${result.discountAmount.toFixed(2)}`);
        console.log(`Novo preço com desconto: R$ ${result.newPrice.toFixed(2)}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Erro: ${error.message}`);
        } else {
            console.error('Ocorreu um erro desconhecido.');
        }
    } finally {
        rl.close();
    }
}

if (require.main === module) {
    main();
}
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

export interface WallDimensions {
    width: number;
    height: number;
}

export interface PaintingSpecification {
    area: number;
    litersRequired: number;
}

export class PaintCalculatorService {
    private static readonly SQUARE_METERS_PER_LITER: number = 2;

    public static compute(dimensions: WallDimensions): PaintingSpecification {
        if (dimensions.width <= 0 || dimensions.height <= 0) {
            throw new Error('Dimensions must be positive numbers greater than zero.');
        }

        const area = Number((dimensions.width * dimensions.height).toFixed(2));
        const litersRequired = Number((area / this.SQUARE_METERS_PER_LITER).toFixed(2));

        return {
            area,
            litersRequired
        };
    }
}

async function main(): Promise<void> {
    const rl = createInterface({ input, output });

    try {
        const widthInput = await rl.question('Digite a largura da parede em metros: ');
        const heightInput = await rl.question('Digite a altura da parede em metros: ');

        const width = parseFloat(widthInput);
        const height = parseFloat(heightInput);

        if (isNaN(width) || isNaN(height)) {
            throw new Error('Invalid numeric input provided.');
        }

        const result = PaintCalculatorService.compute({ width, height });

        console.log(`Área da parede: ${result.area} m²`);
        console.log(`Quantidade de tinta necessária: ${result.litersRequired} litros`);
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
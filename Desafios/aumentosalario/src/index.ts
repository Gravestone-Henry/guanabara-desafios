import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

export interface SalaryInput {
    currentSalary: number;
}

export interface SalaryAdjustmentResult {
    currentSalary: number;
    increaseAmount: number;
    newSalary: number;
}

export class SalaryAdjustmentService {
    private static readonly INCREASE_PERCENTAGE: number = 0.15;

    public static calculateIncrease(data: SalaryInput): SalaryAdjustmentResult {
        if (data.currentSalary < 0) {
            throw new Error('Salary cannot be a negative value.');
        }

        const increaseAmount = Number((data.currentSalary * this.INCREASE_PERCENTAGE).toFixed(2));
        const newSalary = Number((data.currentSalary + increaseAmount).toFixed(2));

        return {
            currentSalary: data.currentSalary,
            increaseAmount,
            newSalary
        };
    }
}

async function main(): Promise<void> {
    const rl = createInterface({ input, output });

    try {
        const salaryInput = await rl.question('Digite o salário do funcionário: ');
        const currentSalary = parseFloat(salaryInput);

        if (isNaN(currentSalary)) {
            throw new Error('Invalid numeric input provided.');
        }

        const result = SalaryAdjustmentService.calculateIncrease({ currentSalary });

        console.log(`Salário atual: R$ ${result.currentSalary.toFixed(2)}`);
        console.log(`Aumento de 15%: R$ ${result.increaseAmount.toFixed(2)}`);
        console.log(`Novo salário com aumento: R$ ${result.newSalary.toFixed(2)}`);
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
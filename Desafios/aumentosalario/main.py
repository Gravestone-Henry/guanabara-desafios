def calcular_aumento_salario(salario_atual: float) -> tuple[float, float]:
    aumento = salario_atual * 0.15
    novo_salario = salario_atual + aumento
    return aumento, novo_salario

def main() -> None:
    try:
        entrada = input("Digite o salário do funcionário: R$ ")
        salario_atual = float(entrada)
        
        if salario_atual < 0:
            print("Erro: O salário não pode ser um valor negativo.")
            return

        aumento, novo_salario = calcular_aumento_salario(salario_atual)
        
        print(f"Salário atual: R$ {salario_atual:.2f}")
        print(f"Aumento de 15%: R$ {aumento:.2f}")
        print(f"Novo salário com aumento: R$ {novo_salario:.2f}")
    except ValueError:
        print("Erro: Por favor, digite um valor numérico válido.")

if __name__ == "__main__":
    main()
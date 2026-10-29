def calcular_desconto(preco: float) -> tuple[float, float]:
    if preco < 0:
        raise ValueError("O preço não pode ser negativo.")
    
    desconto = preco * 0.05
    novo_preco = preco - desconto
    return desconto, novo_preco

def main() -> None:
    try:
        preco = float(input("Digite o preço do produto: R$ "))
        
        desconto, novo_preco = calcular_desconto(preco)
        
        print(f"Preço original: R$ {preco:.2f}")
        print(f"Desconto de 5%: R$ {desconto:.2f}")
        print(f"Novo preço com desconto: R$ {novo_preco:.2f}")
    except ValueError as e:
        print(f"Erro: {e}")

if __name__ == "__main__":
    main()
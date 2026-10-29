def calcular_tinta(largura: float, altura: float) -> tuple[float, float]:
    if largura <= 0 or altura <= 0:
        raise ValueError("As dimensões devem ser maiores que zero.")
    
    area = largura * altura
    litros = area / 2
    return area, litros

def main() -> None:
    try:
        largura = float(input("Digite a largura da parede em metros: "))
        altura = float(input("Digite a altura da parede em metros: "))
        
        area, litros = calcular_tinta(largura, altura)
        
        print(f"Área da parede: {area:.2f} m²")
        print(f"Quantidade de tinta necessária: {litros:.2f} litros")
    except ValueError as e:
        print(f"Erro: {e}")

if __name__ == "__main__":
    main()
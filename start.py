
def seat_to_coupe(seat_number):
    if seat_number <= 0:
        return "Номер места должен быть положительным числом"
    coupe_number = (seat_number + 3) // 4
    if coupe_number > 9:
        return f"Место {seat_number} выходит за пределы вагона (в вагоне только 36 мест)"
    return coupe_number
def main():
    try:
        seat_number = int(input("Введите номер места: "))
        result = seat_to_coupe(seat_number)
        if isinstance(result, int):
            print(f"Место номер {seat_number} находится в купе номер {result}")
        else:
            print(result)
    except ValueError:
        print("Пожалуйста, введите целое число")
if __name__ == "__main__":
    main()
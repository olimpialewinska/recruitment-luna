# Zadanie rekrutacyjne

- Napisz aplikację do zarządzania modułami IoT, wykonującymi pomiary parametrów wody w hodowli akwaponicznej
- Sprawdzana będzie głównie funkcjonalność i jakość kodu aplikacji, jej wygląd jest mniej istotny
- Kod backendu aplikacji wraz z instrukcją uruchomienia znajduje się w katalogu [backend](./backend/)
- Aplikację należy stworzyć w ReactJS

## Zadania do wykonania:

### 1. Strona listy modułów

- Jest to strona główna aplikacji, na niej mają być wyświetlane wszystkie dostępne moduły w postaci listy wraz z ich parametrami
- Lista modułów zwracana jest przez endpoint `GET /modules`,

Przykładowy format danych w odpowiedzi zapytania `GET /modules`:

```json
[
  {
    "id": "string",
    "name": "string",
    "targetTemperature": 15.0,
    "available": true
  },
  {
    ...
  }
]
```

- Parametry modułu, które należy wyświetlić to:
  - `name` - nazwa
  - `available` - dostępność modułu
  - `targetTemperature` - temperatura docelowa $[\degree C]$

### 2. Strona szczegółów modułu

- Po kliknięciu odpowiedniej pozycji w liście wszystkich modułów, należy przenieść użytkownika na stronę szczegółów wybranego modułu
- Dane modułu należy pobrać przez endpoint `GET \modules\:id`
- Strona powinna zawierać przycisk umożliwiający edytowanie danego modułu (opis w kolejnym zadaniu)
- Jeżeli moduł jest niedostępny (parametr `available`), należy zablokować możliwość edycji modułu i dodać informację o braku jego dostępności
- Należy dodać możliwość powrotu do strony głównej

Przykładowe dane odpowiedzi zapytania `GET /modules/:id`:

```json
{
  "id": "0a0f77eb1-50a0-4d98-8116-064fc5a84693",
  "name": "Hydroponic module 1",
  "description": "Lorem ipsum dolor sit amet ...",
  "available": true,
  "targetTemperature": 10
}
```

- Parametry modułu, które należy wyświetlić to:
  - `name` - nazwa
  - `description` - opis
  - `available` - dostępność modułu
  - `targetTemperature` - temperatura docelowa $[\degree C]$

### 3. Możliwość edycji modułu

- Na stronie szczegółów modułu należy dodać modal/dialog, otwierany po naciśnięciu przycisku edycji, który pozwoli użytkownikowi na zmianę parametrów modułu
- Możliwa jest edycja następujących pól:
  - `name`
  - `description`
  - `targetTemperature`
- Należy dokonać walidacji pól przed wysłaniem ich do api, według zasad:
  - `name` - ciąg znaków, nie pusty
  - `description` - ciąg znaków nie pusty
  - `targetTemperature` - liczba, między 0 a 40
- Do edycji służy endpoint `PATCH /modules/:id`

### 4. Wyświetlanie aktualnej wartości temperatury

- Na stronach listy modułów oraz szczegółów modułu razem z pozostałymi parametrami należy wyświetlać aktualną temperaturę wody, zmierzoną przez dany moduł
- Temperaturę można pobrać z serwera WebSocket pod adresem `localhost:3001`
- Do komunikacji przez WebSocket wykorzystaj paczkę npm [socket.io-client](https://www.npmjs.com/package/socket.io-client)
- Wyświetlana temperatura ma być aktualizowana w czasie rzeczywistym w momencie otrzymania wiadomości od serwera WebSocket
- Jeżeli temperatura mieści się w zakresie $\pm 0.5 \degree C$ wartości `targetTemperature` należy ją wyświetlać w kolorze zielonym, w przeciwnym przypadku w kolorze czerwonym

Fragment kodu do utworzenia połączenia z serwerem:

```typescript
const socket = io("localhost:3001", {
  transports: ["websocket"],
});
```

### 5. Dodatkowe elementy

- Opis w README
- Testy jednostkowe/komponentów

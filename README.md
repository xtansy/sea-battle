# Sea Battle

### :globe_with_meridians:**[Deploy URL](https://sea-battle-jet.vercel.app/)**

## Робот


**Путь**: `features/Robot`

### Описание

### `getHitChance(type)`
- Функция определяет вероятность попадания робота в зависимости от уровня сложности (`easy`, `medium`, `hard`).
- Вероятности:
  - `easy`: 20%
  - `medium`: 50%
  - `hard`: 80%

### `robotLogic(targets, emptyCells, mode)`
- Эта функция определяет, куда робот должен произвести выстрел
- Определяет вероятность попадания, вызывая `getHitChance(mode)` в зависимости от выбранного режима
- Генерирует случайное число от 0 до 100 и сравнивает его с вероятностью попадания
- Если случайное число меньше или равно вероятности попадания и есть доступные цели (`targets`), то выбирается случайная цель из `targets`
- В противном случае, выбирается случайная пустая ячейка из `emptyCells`

### `useRobot()`
- Хук который управляет действиями робота
- Использует селекторы Redux для получения информации о состоянии игры и настройках робота
- Робот начинает стрелять с определенным интервалом (1000 миллисекунд), используя `robotLogic`, когда игра активна и робот может стрелять
- Робот останавливается, когда игра завершается или робот не может стрелять



## Случайное Расставление Кораблей

**Путь**: `entities/game/lib/board/randomPlaceShip.ts`

### Описание

- `offsets`: Массив, содержащий смещения вокруг клетки для проверки возможности размещения корабля в данной позиции, учитывая правила

- `isValidPlacement(x, y, size, orientation, board)`: Функция, проверяющая, можно ли разместить корабль заданного размера в указанных координатах (x, y) с учетом его ориентации и текущего состояния игровой доски (board). Она использует `offsets` для проверки окружающих клеток, чтобы удостовериться, что рядом нет других кораблей, и что корабль не выходит за границы доски

- `placeShipOnBoard(size, board)`: Функция, размещающая корабль заданного размера на доске. Она генерирует случайные координаты x, y и ориентацию (вертикальную или горизонтальную) и использует `isValidPlacement` для проверки возможности размещения. Если размещение возможно, она обновляет состояние соответствующих клеток на доске

- `randomPlaceShip(ships, board)`: Функция, размещающая корабли разных размеров на игровой доске. Она вызывает `placeShipOnBoard` для каждого размера корабля в массиве `ships`


## Running locally

1. Install dependencies

```bash
npm install
```

2. Start Vite development server

```bash
npm run dev
```

### :hammer: Technologies

-   Feature Sliced Design
-   Vite
-   React
-   React-Router-Dom
-   React-Hook-Form
-   @ebay/nice-modal-react
-   Redux-Toolkit
-   Redux-Persist
-   classnames
-   date-fns
-   yup
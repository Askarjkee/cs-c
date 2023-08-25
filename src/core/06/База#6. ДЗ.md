# ДЗ к лекции База#6

## Посмотреть лекции на канале AlekOS

* [Как работают хэш-таблицы](https://www.youtube.com/watch?v=cWbuK7C13HQ)

## Почитать Лафоре

* Про хэш-таблицы

## Реализовать вектор над типизированным массивом

Вектор должен поддерживать интерфейс двусторонней очереди, как у нативных массивов JS.

   ```js
   const uint8Vector = new Vector(Uint8Array, {capacity: 100});

   uint8Vector.push(100);    // 1
   uint8Vector.push(20, 10); // 3

   uint8Vector.pop();        // 10
   uint8Vector.shift();      // 100

   uint8Vector.unshift(1);          // 2
   console.log(uint8Vector.length); // 2
   ```

## Реализовать класс для описания 3-х мерной матрицы

   ```js
   const matrix = new Matrix3D({x: 10, y: 10, z: 10});

   matrix.set({x: 1, y: 3, z: 2}, 10);
   matrix.get({x: 1, y: 3, z: 2});
   ```

## Реализовать класс для создания хэш-таблицы

В качестве ключей можно использовать примитивы или объекты. Алгоритм хэш-функции можно придумать любой.
Коллизии можно решать через метод цепочек или используя открытую адресацию. Должна быть поддержка расширения внутреннего буфера.

   ```js
   // Задаем ёмкость внутреннего буфера
   const map = new HashMap(120);

   map.set('foo', 1);
   map.set(42, 10);
   map.set(document, 100);
   
   console.log(map.get(42));          // 10
   console.log(map.has(document));    // true
   console.log(map.delete(document)); // 100
   console.log(map.has(document));    // false
   ```

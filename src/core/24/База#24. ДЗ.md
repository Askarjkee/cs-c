# ДЗ к лекции База#24

## Необходимо написать функцию forEach, которая могла бы обходить любой Iterable объект любого размера

Работа функции не должна вызывать фризов. Функция должна возвращать Promise.

```js
let total = 0;

forEach(new Array(50e9), () => {
  total++;
});

console.log(total);
```

## Необходимо доработать функцию forEach, чтобы несколько таких вызовов гарантировано не вызывали фризов

```js
let total = 0;

forEach(new Array(50e9), () => {
  total++;
});

forEach(new Array(50e9), () => {
  total++;
});

forEach(new Array(50e9), () => {
  total++;
});

forEach(new Array(50e9), () => {
  total++;
});

forEach(new Array(50e9), () => {
  total++;
});

console.log(total);
```

## Необходимо доработать функцию forEach и добавить возможность задачи приоритетов

```js
let total = 0;

forEach(new Array(50e9), {priority: 'critical'}, () => {
 total++;
});

forEach(new Array(50e9), {priority: 'high'}, () => {
 total++;
});

forEach(new Array(50e9), {priority: 'low'}, () => {
 total++;
});

forEach(new Array(50e9), () => {
 total++;
});

forEach(new Array(50e9), () => {
 total++;
});

console.log(total);
```

## Необходимо написать семафор для ограничивания одновременных Promise

Одновременно не должно быть более заданного числа Promise в Pending.

```js
const limitedPromises = new IterSemaphore(2, [f1, f2, f3, f4, f5, f6]);

Promise.all(limitedPromises).then(console.log).catch(console.error);
```

## Необходимо написать структуру RWLock

```js
const lock = new RWLock({value: 1});

{
  const {proxy, free} = lock.get();

  console.log(proxy.value); // 1

  try {
    proxy.value = 2;        // Exception
  } catch {}

  try {
    lock.getMut();          // Exception - уже есть читающие
  } catch {}

  free();
}

{
  const {proxy, free} = lock.getMut();

  proxy.value += 2;

  console.log(proxy.value); // 3

  try {
    lock.get();             // Exception - уже есть пишущий
  } catch {}
}
```

## Необходимо написать асинхронный семафор

Функция должна принимать другую функцию и набор флагов.
Новая функция должна возвращать промис и резолвиться результатом внутренней.
Внутренняя функция может быть вызвана только один раз.

```js
const semaphore = createsAsyncSemaphore(() => {
  console.log('Boom!');
  return 121;
}, 'foo', 'bar');

semaphore('foo').then(console.log); // 121

// Boom!
semaphore('bar')
  .then(console.log); // 121
```

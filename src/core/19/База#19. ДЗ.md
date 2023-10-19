# ДЗ к лекции База#19

## Необходимо написать контейнерный тип Result

У которого будет два состояния: Ok и Err.

```js
const res1 = new Result(() => 42);

res1.then((data) => {
  console.log(data);
});

const res2 = new Result(() => { throw 'Boom!'; });

res1.then((data) => {
  // Этот callback не вызовется
  console.log(data);

// А этот вызовется
}).catch(console.error);
```

## Необходимо используя генераторы создать аналог async/await для контейнера Result

```js
exec(function* main() {
  const res1 = new Result(() => 42);
  console.log(yield result);

  try {
    const res2 = new Result(() => { throw 'Boom!'; });

  } catch (err) {
    console.error(err);
  }
});
```

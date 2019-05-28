# most-utils

Rx utility functions for Most.js ([@most/core](https://github.com/mostjs/core)).

## Install (comming soon)
```sh
npm install --save most-utils
```

## API

```interval(period: number) : Stream<number>```

Emits an infinite stream of numbers (starting at 0) according to a time interval (milliseconds).

Example:
```typescript
// 0, 1, 2
runEffects(tap(console.log, take(3, interval(2000))));
```
---

```timer(delay: number | Date, period: number | undefined | null): Stream<number>```

Emits a single event containing value 0 after a delay. If the second argument is different from ```undefined``` or ```null```, subsequent values are then emitted according to the time period (milliseconds) passed in.

Examples:
```typescript
// emit 0 after 2 seconds
runEffects(tap(console.log, take(3, timer(2000, undefined))), newDefaultScheduler());

// emit 0 after 2 seconds and then, every 1 second, subsequent values are emitted, i.e. 1, 2, 3, 4, ...
runEffects(tap(console.log, take(3, timer(2000, 1000))), newDefaultScheduler());
```
---

```bufferCount(bufferSize: number, startEvery: number | undefined | null, stream: Stream<any>): Stream<any[]>```

Buffers stream elements while the informed buffer size is not reached. If the second argument is not ```undefined``` or ```null```, the next buffer starts according to the value passed in.

Examples:
```typescript
// [0, 1, 2] [3, 4, 5] [6, 7, 8]
runEffects(tap(console.log, take(3, bufferCount(3, undefined, interval(2000)))), newDefaultScheduler());

// [0, 1, 2] [1, 2, 3] [2, 3, 4]
runEffects(tap(console.log, take(3, bufferCount(3, 1, interval(2000)))), newDefaultScheduler());
```
---

```bufferTime(period: number, creationInterval: number | undefined | null, stream: Stream<any>): Stream<any[]>```

Buffers stream elements during a given time period (milliseconds). If the second argument is is not ```undefined``` or ```null```, the next buffer starts according to the time interval passed in.

Examples:
```typescript
// [0, 1, 2] [3, 4, 5, 6] [7, 8, 9, 10]
runEffects(tap(console.log, take(3, bufferTime(2000, undefined, interval(500)))), newDefaultScheduler());

// [0, 1, 2] [1, 2, 3, 4, 5] [3, 4, 5, 6, 7]
runEffects(tap(console.log, take(3, bufferTime(2000, 1000, interval(500)))), newDefaultScheduler());
```
---

```bufferToggle(startSignal: Stream<any>, endSignal: Stream<any>, stream: Stream<any>): Stream<any[]>```

Uses streams to control when to start collecting elements (startSignal) and to emit the collected elements as array (endSignal).

Example:
```typescript
// [4, 5, 6, 7] [9, 10, 11, 12] [14, 15, 16, 17]
runEffects(tap(console.log, take(3, bufferToggle(interval(5000), timer(3000, undefined), interval(1000)))), newDefaultScheduler());
```

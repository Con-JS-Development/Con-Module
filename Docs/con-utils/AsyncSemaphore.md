# AsyncSemaphore
An implementation of an asynchronous semaphore that implements the PromiseLike interface.

## Constructor
```js
new AsyncSemaphore()
```
Creates a new instance of the AsyncSemaphore class.

## Methods
### Release
```js
release(id: number): boolean
```
Releases the lock with the given id.

#### Parameters
`id (number)`: The id of the lock to release.
#### Returns 
`(boolean)`: Returns true if the lock was released successfully.
#### Throws
`ReferenceError`: Throws an error if the given id is invalid.

### Lock
```js
lock(): Promise<number>
```
Acquires a lock and returns a promise that resolves with the id of the acquired lock.

#### Returns
`(Promise<number>)`: Returns a promise that resolves with the id of the acquired lock.

### SecureRun
```js
secureRun<k extends []>(method: (...arg: k)=>any, ...params: k): Promise<void>
```
Acquires a lock, runs the given method with the provided parameters, and releases the lock when done.

#### Parameters
 - `method (Function)`: The method to run.
 - `...params (any[])`: The parameters to pass to the method.
#### Returns
`(Promise<void>)`: Returns a promise that resolves when the method has finished running and the lock has been released.

### Thenable
```js
then(onfulfilled?: (value: number) => any, onrejected?: (reason: any) => any): Promise<any>
```
Attaches callbacks for when a lock is acquired or if an error occurs. This allows the AsyncSemaphore instance to be used as a PromiseLike object.

#### Parameters
 - `onfulfilled ((value: number) => any)`: A function that is called when a lock is acquired. The function receives the id of the acquired lock as its argument.
 - `onrejected ((reason: any) => any)`: A function that is called if an error occurs while acquiring a lock. The function receives the error as its argument.
### Returns
`(Promise<any>)`: Returns a promise that resolves with the result of the onfulfilled callback or is rejected with the result of the onrejected callback.

## Examples
### Basic Usage
Here’s an example that demonstrates how to use the AsyncSemaphore class to synchronize multiple asynchronous operations:
```js
import { AsyncSemaphore } from './con-utils/index.js';

async function main() {
    const semaphore = new AsyncSemaphore();

    // Using the lock method
    const id1 = await semaphore.lock();
    console.log('Acquired lock with id:', id1);
    // Do some work here
    semaphore.release(id1);
    console.log('Released lock with id:', id1);

    // Using the await keyword
    const id2 = await semaphore;
    console.log('Acquired lock with id:', id2);
    // Do some work here
    semaphore.release(id2);
    console.log('Released lock with id:', id2);
}

main();
```
### Using then and secure run Methods in Synchronous Code
Here’s an example that demonstrates how to use both the then and saveRun methods of the AsyncSemaphore class in synchronous code:
```js
import { AsyncSemaphore } from './con-utils/index.js';

const semaphore = new AsyncSemaphore();

// Using then method
semaphore.then((id) => {
    console.log('Acquired lock with id:', id);
    // Do some work here
    semaphore.release(id); //You must release acquired lock with given id or semaphore, will nerver be released anymore. 
    console.log('Released lock with id:', id);
});
semaphore.secureRun((param1,param2)=>{
    console.log('Running myMethod with params:', param1, param2);
    // Do some work here
}, 'param1', 'param2');
```
### Deadlock Example
Here’s an example that demonstrates how a deadlock can occur when using the AsyncSemaphore class:
```js
import { AsyncSemaphore } from './con-utils/index.js';

async function main() {
    const semaphore = new AsyncSemaphore();

    // Acquiring two locks without releasing the first one
    const id1 = await semaphore.lock();
    console.log('Acquired lock with id:', id1);
    const id2 = await semaphore.lock();
    console.log('Acquired lock with id:', id2);

    // Deadlock: the second lock will never be acquired because the first one is never released
}

main();
```
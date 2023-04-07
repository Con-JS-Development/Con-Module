# `DisposableHandle`

Represents a disposable handle.

#### `constructor(onUpdate, onDispose)`

Creates a new DisposableHandle.

**Parameters:**

- `onUpdate` (Function): The function to call when the handle is updated.
- `onDispose` (Function): Optional. The function to call when the handle is disposed. Defaults to a no-op function.

```javascript
let onUpdate = async (handle) => {
    console.log('Updating...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Updated!');
};

let onDispose = (handle) => {
    console.log('Disposed!');
};

let handle = new DisposableHandle(onUpdate, onDispose);
```

#### `update()`

Updates the handle.

**Returns:**

(Promise): A promise that resolves when the update is complete.

**Throws:**

(ReferenceError): If the handle is disposed.

```javascript
await handle.update(); // Updating... Updated!
```

#### `dispose()`

Disposes of the handle.

```javascript
handle.dispose(); // Disposed!
```

#### `isDisposed`

Gets whether the handle is disposed.

**Returns:**

(boolean): True if the handle is disposed; otherwise, false.

## Example

Here's an example of how you could use the `DisposableHandle` class:

```javascript
import { DisposableHandle } from './con-utils/index.js';

let onUpdate = async (handle) => {
    console.log('Updating...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Updated!');
};

let onDispose = (handle) => {
    console.log('Disposed!');
};

let handle = new DisposableHandle(onUpdate, onDispose);

await handle.update(); // Updating... Updated!

handle.dispose(); // Disposed!

console.log(handle.isDisposed); // true
```

## Notes

Disposable objects are useful for managing resources that need to be cleaned up when they are no longer needed. For example, you might use a disposable object to represent a database connection or a file handle. When you are finished using the resource, you can call the `dispose` method to release it. This can help prevent resource leaks and ensure that your application runs smoothly.

Is this what you had in mind?
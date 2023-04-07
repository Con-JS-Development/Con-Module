# `EventSignal`

Represents an event signal.

#### `trigger(...params)`

Triggers the event signal.

**Parameters:**

- `...params` (...any): The arguments to pass to the event handlers.

**Returns:**

(Promise<number>): A promise that resolves with the number of successful event handlers.

```javascript
let successCount = await signal.trigger(...params);
console.log(successCount); // e.g. 2
```

#### `subscribe(method)`

Subscribes to the event signal.

**Parameters:**

- `method` (Function): The event handler function to subscribe.

**Returns:**

(Function): The subscribed event handler function.

```javascript
let onEvent = (param1, param2) => {
    console.log('Event triggered!', param1, param2);
};

signal.subscribe(onEvent);
```

#### `unsubscribe(method)`

Unsubscribes from the event signal.

**Parameters:**

- `method` (Function): The event handler function to unsubscribe.

**Returns:**

(Function): The unsubscribed event handler function.

```javascript
signal.unsubscribe(onEvent);
```

## Example

Here's an example of how you could use the `EventSignal` class in this module:

```javascript
import { EventSignal } from './con-utils/index.js';

let signal = new EventSignal();

let onEvent1 = (param1, param2) => {
    console.log('Event 1 triggered!', param1, param2);
};

let onEvent2 = (param1, param2) => {
    console.log('Event 2 triggered!', param1, param2);
};

signal.subscribe(onEvent1);
signal.subscribe(onEvent2);

await signal.trigger('foo', 'bar'); // Event 1 triggered! foo bar
                                    // Event 2 triggered! foo bar

signal.unsubscribe(onEvent1);

await signal.trigger('baz', 'qux'); // Event 2 triggered! baz qux
```

## Notes

Event signals are useful for implementing the observer pattern. This pattern allows objects to subscribe to events and be notified when they occur. For example, you might use an event signal to represent a button click or a data update. When the event occurs, you can call the `trigger` method to notify all subscribed event handlers. This can help decouple your code and make it more modular and reusable.
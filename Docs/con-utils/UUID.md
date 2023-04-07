# UUID Generator

This module provides a function for generating a UUID (Universally Unique Identifier).

A UUID is a 128-bit number used to uniquely identify information in computer systems. The term globally unique identifier (GUID) is also used. The `generateUUID` function in this module generates a version 4 UUID, which is created using random numbers.

## Functions

### `generateUUID()`

Generates a version 4 UUID (Universally Unique Identifier) using random numbers.

**Returns:**

(string): The generated UUID in the format 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', where each 'x' is replaced with a random hexadecimal digit and 'y' is replaced with a random hexadecimal digit from the set [8, 9, A, or B].

## Example

Here's an example of how you could use the function in this module:

```javascript
import { generateUUID } from './con-utils/index.js';

let uuid = generateUUID();
console.log(uuid); // e.g. '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
```

## Notes
This function generates a UUID using a combination of the current timestamp and a random number. This approach guarantees the uniqueness of the generated UUID with a very high probability.
# TextStream

Represents a text stream.

## Properties

- `buffer` (string): The stream's buffer.
- `offset` (number): The stream's current offset.
- `size` (number): The size of the stream's buffer.
- `isEndOfStream` (boolean): Determines if the end of the stream has been reached.

## Methods

- `constructor(string)`: Creates a new TextStream instance.
- `reset(): void`: Resets the stream's offset to 0.
- `skip([length=1]): void`: Skips a specified number of characters in the stream.
- `rewind([length=1]): void`: Moves the stream's current offset backward by a specified number of characters.

# TextWriter extends TextStream

Represents a text writer that writes to a text stream.

## Methods

- `write(string, [offset=this.offset]): void`: Writes a string to the stream at the specified position and advances the current position by the length of the string.
- `insert(string, [offset=this.offset]): void`: Inserts a string into the stream at the specified position and advances the current position by the length of the string.
- `delete([length=1], [offset=this.offset]): void`: Deletes a specified number of characters from the stream at the current position and advances the current position by that number of characters.

# TextReader extends TextStream

Represents a text reader that reads from a text stream. Implements `IterableIterator<string>`.

## Methods

- `peek([length=1], [offset=this.offset]): string`: Peeks at a specific position in the stream without advancing the current position. Returns a string.
- `read([length=1], [offset=this.offset]): string`: Reads a specified number of characters from the stream and advances the current position by that number of characters. Returns a string.

## Example

```javascript
const reader = new TextReader('Hello, world!');
console.log(reader.peek(5)); // 'Hello'
console.log(reader.read(7)); // 'Hello, '
reader.reset();
for (const char of reader) {
    console.log(char);
}
```
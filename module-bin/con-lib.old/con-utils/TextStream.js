const _offset = Symbol('offset');
const _buffer = Symbol('buffer');
/**
 * Represents a text stream.
 */
export class TextStream {
    //private
    [_buffer] = "";
    //private
    [_offset] = 0;

    /**
     * Creates a new TextStream instance.
     * @param {string} string - The string to use as the stream's buffer.
     */
    constructor(string) {
        this[_buffer] = string;
    }

    /**
     * Gets the stream's buffer.
     * @returns {string} The stream's buffer.
     */
    get buffer() {
        return this[_buffer];
    }

    /**
     * Gets the stream's current offset.
     * @returns {number} The stream's current offset.
     */
    get offset() {
        return this[_offset];
    }

    /**
     * Gets the size of the stream's buffer.
     * @returns {number} The size of the stream's buffer.
     */
    get size() {
        return this.buffer.length;
    }

    /**
     * Determines if the end of the stream has been reached.
     * @returns {boolean} True if the end of the stream has been reached; otherwise, false.
     */
    get isEndOfStream() {
        return this.offset >= this.buffer.length;
    }

    /**
     * Resets the stream's offset to 0.
     */
    reset() {this[_offset] = 0;}

    /**
     * Skips a specified number of characters in the stream.
     * @param {number} [length=1] - The number of characters to skip.
     */
    skip(length = 1) {
        if (length < 1) throw new RangeError('Error: Length must be greater than or equal to 1')
        if (length > this.size - this.offset) {
            throw new RangeError('Error: Attempting to skip beyond end of stream');
        }
        this[_offset] += length;
    }
    /**
     * Moves the stream's current offset backward by a specified number of characters.
     * @param {number} [length=1] - The number of characters to move backward.
     * @throws {RangeError} If length is less than 1.
     */
    rewind(length = 1) {
        if (length < 1) throw new RangeError('Error: Length must be greater than or equal to 1')
        if (length > this.offset) this.reset();
        else this[_offset] -= length;
    }
    toString(){return this.buffer;}
}

/**
 * Represents a text writer that writes to a text stream.
 */
export class TextWriter extends TextStream {

    /**
     * Writes a string to the stream at the specified position and advances the current position by the length of the string.
     * @param {string} string - The string to write to the stream.
     * @param {number} [offset=this.offset] - The position in the stream to write at. Defaults to the current offset of the stream.
     */
    write(string, offset = this.offset) {
        if (offset > this.buffer.length) {
            throw new Error('Offset cannot be greater than stream size');
        }
        const before = this.buffer.slice(0, offset);
        const after = this.buffer.slice(offset + string.length);
        this[_buffer] = before + string + after;
        this[_offset] += string.length;
    }

    /**
     * Inserts a string into the stream at the specified position and advances the current position by the length of the string.
     * @param {string} string - The string to insert into the stream.
     * @param {number} [offset=this.offset] - The position in the stream to insert at. Defaults to the current offset of the stream.
     */
    insert(string, offset = this.offset) {
        if (offset > this.size) {
            throw new Error('Offset cannot be greater than stream size');
        }
        const before = this.buffer.slice(0, offset);
        const after = this.buffer.slice(offset);
        this[_buffer] = before + string + after;
        this[_offset] += string.length;
    }

    /**
     * Deletes a specified number of characters from the stream at the current position and advances the current position by that number of characters.
     * @param {number} [length=1] - The number of characters to delete from the stream.
     * @param {number} [offset=this.offset] - The position in the stream to delete at. Defaults to the current offset of the stream.
     */
    delete(length = 1, offset = this.offset) {
        if (length < 1) throw new RangeError('Error: Length must be greater than or equal to 1')
        if (offset < 0 || offset >= this.size) throw new RangeError('Error: offset must be in range between 0 and size of the stream')
        if (length > this.size - offset) {
            throw new RangeError('Error: Attempting to delete beyond end of stream');
        }
        const before = this.buffer.slice(0, offset);
        const after = this.buffer.slice(offset + length);
        this[_buffer] = before + after;
        this[_offset] += length;
    }
}
/**
 * Represents a text reader that reads from a text stream.
 * @implements {IterableIterator<string>}
 */
export class TextReader extends TextStream {
    /**
     * Peeks at a specific position in the stream without advancing the current position.
     * @param {number} [length=1] - The number of characters to peek at.
     * @param {number} [offset=this.offset] - The position in the stream to peek at. Defaults to the current offset of the stream.
     * @returns {string} The characters at the specified position in the stream.
     */
    peek(length = 1, offset = this.offset) {
        if (length < 1) throw new RangeError('Error: Length must be greater than or equal to 1')
        if (offset < 0) throw new RangeError('Error: offset must be greater than or equal to 0')
        if (offset > this.size) {
            throw new RangeError('Error: Attempting to peek beyond end of stream');
        }
        return this.buffer.substring(offset, length);
    }

    /**
     * Reads a specified number of characters from the stream and advances the current position by that number of characters.
     * @param {number} [length=1] - The number of characters to read.
     * @param {number} [offset=this.offset] - The position in the stream to read from. Defaults to the current offset of the stream.
     * @returns {string} The characters read from the stream.
     */
    read(length = 1, offset = this.offset) {
        if (length < 1) throw new RangeError('Error: Length must be greater than or equal to 1')
        if (offset < 0) throw new RangeError('Error: offset must be greater than or equal to 0')
        if (this.isEndOfStream) {
            throw new RangeError('Error: Attempting to read beyond end of stream');
        }
        this[_offset] = offset + length;
        return this.buffer.substring(offset, offset + length);
    }

    /**
     * Returns an object representing the next character in the stream, or indicating that the end of the stream has been reached. This method is implemented from the Iterator interface.
     * @returns {{done: boolean, value?: string}} An object with a `done` property indicating whether the end of the stream has been reached and a `value` property containing the next character in the stream if available.
     */
    next() {
        if (this.isEndOfStream) return { done: true }
        else return { done: false, value: this.buffer[this[_offset]++] }
    }

    /**
     * Returns an iterator for the characters in the stream.
     * @returns {IterableIterator<string>} An iterator for the characters in the stream.
     */
    [Symbol.iterator]() {
        return this;
    }
}
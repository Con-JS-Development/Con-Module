/**
 * Generates a UUID (Universally Unique Identifier).
 * @returns {string} The generated UUID.
 */
export function generateUUID() {
    const timestamp = Date.now();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>{
      let r = (timestamp + Math.random() * 16) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
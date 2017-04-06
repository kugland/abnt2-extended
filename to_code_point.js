export default function toCodePoint(c) {
    if (c === null) {
        return c;
    } else if ('string' == typeof c) {
        let codePoint = c.codePointAt(0);
        if (String.fromCodePoint(codePoint) == c) {
            return codePoint;
        } else {
            throw new Error('Multiple codepoints passed to toCodePoint');
        }
    } else if ('number' == typeof c) {
        return c;
    } else {
        throw new TypeError('toCodePoint accepts single char strings or code point numbers');
    }
}
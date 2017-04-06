import Key from './key';
import toCodePoint from './to_code_point';

let __deadKeysMap = new Map();

let __specialCombinations = {
    'circumflex': [
        [ '0', '⁰' ], [ '1', '¹' ], [ '2', '²' ], [ '3', '³' ],
        [ '4', '⁴' ], [ '5', '⁵' ], [ '6', '⁶' ], [ '7', '⁷' ],
        [ '8', '⁸' ], [ '9', '⁹' ], [ '+', '⁺' ], [ '-', '⁻' ],
        [ '=', '⁼' ], [ '(', '⁽' ], [ ')', '⁾' ]
    ],
    'caron': [
        [ '0', '₀' ], [ '1', '₁' ], [ '2', '₂' ], [ '3', '₃' ],
        [ '4', '₄' ], [ '5', '₅' ], [ '6', '₆' ], [ '7', '₇' ],
        [ '8', '₈' ], [ '9', '₉' ], [ '+', '₊' ], [ '-', '₋' ],
        [ '=', '₌' ], [ '(', '₍' ], [ ')', '₎' ]
    ],
    'cedilla': [ // Remove kebab.
        [ 'S', 'Ș' ], [ 's', 'ș' ], [ 'T', 'Ț' ], [ 't', 'ț' ]
    ],
    'stroke': [
        ['A', 'Ⱥ'], ['a', 'ⱥ'], ['B', 'Ƀ'], ['b', 'ƀ'],
        ['C', 'Ȼ'], ['c', 'ȼ'], ['D', 'Đ'], ['d', 'đ'],
        ['E', 'Ɇ'], ['e', 'ɇ'], ['F', 'Ꞙ'], ['f', 'ꞙ'],
        ['G', 'Ǥ'], ['g', 'ǥ'], ['H', 'Ħ'], ['h', 'ħ'],
        ['I', 'Ɨ'], ['i', 'ɨ'], ['J', 'Ɉ'], ['j', 'ɉ'],
        ['L', 'Ł'], ['l', 'ł'], ['K', 'Ꝁ'], ['k', 'ꝁ'],
        ['N', 'Ꞥ'], ['n', 'ꞥ'], ['O', 'Ø'], ['o', 'ø'],
        ['P', 'Ᵽ'], ['p', 'ᵽ'], ['Q', 'Ꝙ'], ['q', 'ꝙ'],
        ['R', 'Ɍ'], ['r', 'ɍ'], ['S', 'Ꞩ'], ['s', 'ꞩ'],
        ['T', 'Ŧ'], ['t', 'ŧ'], ['U', 'Ʉ'], ['u', 'ʉ'],
        ['V', 'Ꝟ'], ['v', 'ꝟ'], ['Y', 'Ɏ'], ['y', 'ɏ'],
        ['Z', 'Ƶ'], ['z', 'ƶ'], ['=', '≠'], ['←', '↚'],
        ['↑', '⤉'], ['↓', '⤈'], ['→', '↛']
    ],
    'tilde': [
        ['=', '≈']
    ],
    'currency': [
        ['l', '£'], ['c', '¢'], ['s', '₪'], ['e', '€'],
        ['d', '₯'], ['p', '₧'], ['g', '₢'], ['f', '₣'],
        ['L', '₤'], ['w', '₩'], ['R', '₹'], ['r', '₽'],
        ['y', '¥'], ['C', '₢']
    ],
    'greek': [ // Betacode. :-)
        ['A', 'Α'], ['B', 'Β'], ['G', 'Γ'], ['D', 'Δ'],
        ['E', 'Ε'], ['Z', 'Ζ'], ['H', 'Η'], ['Q', 'Θ'],
        ['I', 'Ι'], ['K', 'Κ'], ['L', 'Λ'], ['M', 'Μ'],
        ['N', 'Ν'], ['C', 'Ξ'], ['O', 'Ο'], ['P', 'Π'],
        ['R', 'Ρ'], ['S', 'Σ'], ['T', 'Τ'], ['U', 'Υ'],
        ['F', 'Φ'], ['X', 'Χ'], ['Y', 'Ψ'], ['W', 'Ω'],
        ['a', 'α'], ['b', 'β'], ['g', 'γ'], ['d', 'δ'],
        ['e', 'ε'], ['z', 'ζ'], ['h', 'η'], ['q', 'θ'],
        ['i', 'ι'], ['k', 'κ'], ['l', 'λ'], ['m', 'μ'],
        ['n', 'ν'], ['c', 'ξ'], ['o', 'ο'], ['p', 'π'],
        ['r', 'ρ'], ['j', 'ς'], ['s', 'σ'], ['t', 'τ'],
        ['u', 'υ'], ['f', 'φ'], ['x', 'χ'], ['y', 'ψ'],
        ['w', 'ω']
    ]
};

export default class DeadKey {

    constructor(name, spacing, combining) {
        this.name = name;
        this.spacing = toCodePoint(spacing);
        this.combining = toCodePoint(combining);
        this.isDeadKey = true;

        __deadKeysMap.set(name, this);
    }

    combinations() {
        let result = new Map();
        Key.all().forEach((key) => {
            key.values.forEach((codePoint) => {
                if ('number' == typeof codePoint) {
                    let combined = (String.fromCodePoint(codePoint)
                                  + String.fromCodePoint(this.combining)),
                        normalized = combined.normalize('NFC')
                    if (combined != normalized) {
                        result.set(codePoint, normalized.codePointAt(0));
                    }
                }
            });
        });
        if (this.name in __specialCombinations) {
            __specialCombinations[this.name].forEach((combination) => {
                result.set(toCodePoint(combination[0]), toCodePoint(combination[1]));
            });
        }
        result = Array.from(result.entries());
        result.push([0x20, this.spacing]);
        return result;
    }

    static map() {
        return __deadKeysMap;
    }

}

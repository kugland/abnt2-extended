import Key from './key';
import DeadKey from "./dead_key";

import { abnt2 } from "./parser";

import xkbKeySym from './xkb-keysyms';

let keycodes = [ 49, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 51, 94, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 97 ], i = 0;

Key.all().forEach((key) => {
    let values = key.values.map(key => {
        if (key === null) {
            return 'NoSymbol';
        } else if (key.isDeadKey) {
            return `dead_${key.name}`;
        } else {
            return xkbKeySym(key);
        }
    });

    let level0_1 = values.slice(0, 2).join(' '),
        level2_3 = values.slice(2, 4).join(' ');
    
    console.log(`keycode ${keycodes[i++]} = ${level0_1} ${level0_1} ${level2_3}`)
});
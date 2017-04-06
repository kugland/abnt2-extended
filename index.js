import fs from 'fs';
import Key from './key';
import DeadKey from './dead_key';

let abnt2 = JSON.parse(fs.readFileSync('./abnt2.json'));

abnt2.dead_keys.forEach((dead_key) => {
    new DeadKey(dead_key[0], dead_key[1], dead_key[2]);
});

abnt2.keymap.forEach((row) => row.forEach((key) => {
    new Key(key[0], key[1], key[2], key[3]);
}));

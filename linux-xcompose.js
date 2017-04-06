import DeadKey from "./dead_key";

import "./parser";

import xkbKeySym from './xkb-keysyms';

let deadkeys = Array.from(DeadKey.map().values());
deadkeys.sort((a, b) => a.name.localeCompare(b.name));

for (let deadkey of deadkeys) {
    for (let [key, result] of deadkey.combinations()) {
        console.log(`<dead_${deadkey.name}> <${xkbKeySym(key)}>`.padEnd(40) + `: "${String.fromCodePoint(result).replace('"', '\\"')}" U${result.toString(16).padStart(4, '0')}`);
    }
    console.log(`<dead_${deadkey.name}> <dead_${deadkey.name}>`.padEnd(40) + `: "${String.fromCodePoint(deadkey.spacing).replace('"', '\\"')}" U${deadkey.spacing.toString(16).padStart(4, '0')}`);
}

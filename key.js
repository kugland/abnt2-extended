import DeadKey from './dead_key';
import toCodePoint from './to_code_point';

let __keys = [ ];

export default class Key {

    constructor(normal, shift, altgr, shift_altgr) {
        this.values = [normal, shift, altgr, shift_altgr].map((c) => {
            if (('string' == typeof c) && c.startsWith('dead_')) {
                return DeadKey.map().get(c.slice(5));
            } else {
                return toCodePoint(c);
            }
        });
        //console.log(this.values);
        this.caps = [0, 2].map((s) => this.values.slice(s, s + 2)).map((e) => {
            //console.info(e);
            if (!e[0] === null && !e[1] === null && !e[0].isDeadKey && !e[1].isDeadKey) {
                    String.fromCodePoint(e[1]).toLowerCase() == String.fromCodePoint(e[0]);
                } else {
                    return false;
                }
        });
        __keys.push(this);
    }

    static all() {
        return __keys;
    }

}

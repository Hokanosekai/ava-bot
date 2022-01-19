interface String {
    capitalize(): string;
    parseEmoji(): string;
}

String.prototype.capitalize = function () {
    return this.toString().valueOf().replace(/^\w/, c => c.toUpperCase());
}

String.prototype.parseEmoji = function () {
    const {Emojis} = require('../utils/Emojis');

    const r = /\[([A-Z])\.(.*)]/gm;
    let s;
    let str = this.toString().valueOf()
    do {
        s = r.exec(str);
        if (s) {
            switch (s[1]) {
                case 'E' :
                    str = str.replace(s[0], Emojis[s[2]]);
                    break;
            }
        }
    } while (s);
    return str;
}


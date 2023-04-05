"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = void 0;
const repeat = (n, pattern) => {
    return [...Array(n)].reduce((sum) => sum.concat(pattern), []);
};
exports.repeat = repeat;
//# sourceMappingURL=utils.js.map
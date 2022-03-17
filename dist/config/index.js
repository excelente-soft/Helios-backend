"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
_a = process.env, _b = _a.PORT, exports.PORT = _b === void 0 ? 5000 : _b, _c = _a.VERSION, exports.VERSION = _c === void 0 ? 1 : _c;

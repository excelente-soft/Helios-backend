"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _config_1 = require("./config/index.js");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = (0, express_1.default)();
const path = `/v${_config_1.VERSION}/api`;
app.use(path, auth_route_1.default);
app.listen(_config_1.PORT, () => {
    console.log(`Server started at http://localhost:${_config_1.PORT}${path}`);
});

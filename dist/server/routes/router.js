"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const loginTypeUser_1 = require("../../controller/controllerUser/login/loginTypeUser");
const registerTypeUser_1 = require("../../controller/controllerUser/register/registerTypeUser");
const controllerDataDiarist_1 = require("../../controller/controllerDiarista/dataDiarist/controllerDataDiarist");
const message = __importStar(require("../../modulo/config"));
const jwt = __importStar(require("jsonwebtoken"));
const jsonParser = body_parser_1.default.json();
const router = (0, express_1.Router)();
exports.router = router;
router.post('/v1/limpean/cadastro', jsonParser, async function (request, response) {
    let contentType = request.headers['content-type'];
    if (contentType === 'application/json') {
        let dataBody = request.body;
        let status = await (0, registerTypeUser_1.registerTypeUser)(dataBody);
        if (status) {
            response.status(status.status);
            response.json(status);
        }
        else {
            response.send(message.ERRO_REGISTER_USER);
        }
    }
    else {
        return response.send(message.ERROR_INVALID_CONTENT_TYPE);
    }
});
router.post('/v1/limpean/login', jsonParser, async function (request, response) {
    let contentType = request.headers['content-type'];
    if (contentType === 'application/json') {
        let dataBody = request.body;
        let status = await (0, loginTypeUser_1.loginTypeUser)(dataBody);
        response.status(200);
        response.json(status);
    }
});
const verifyJWT = async function (request, response, next) {
    const token = request.headers['x-api-key'];
    const SECRETE = '3oFEe4PtHxJeXsa7hY8WBFtCt1AJ4GwgqF6WARF1NG0mUnc89W';
    if (!token) {
        return response.status(401).json(message.ERRO_REQUIRED_TOKEN);
    }
    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        next();
    }
    catch (error) {
        return response.status(401).json(message.ERRO_INVALID_TOKEN);
    }
};
router.get('/v1/limpean/diarist/:token', verifyJWT, async function (request, response) {
    const token = request.params.token;
    const statusDataDiarist = await (0, controllerDataDiarist_1.dataDiarist)(token);
    response.status(statusDataDiarist.status);
    response.json(statusDataDiarist);
});
router.get('/v1/form-dados', verifyJWT, jsonParser, async function (request, response) {
    console.log("Acesso");
});

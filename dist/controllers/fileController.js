"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileVulnerable = void 0;
const path_1 = __importDefault(require("path"));
const downloadFileVulnerable = (req, res) => {
    const fileName = req.query.file;
    const filePath = path_1.default.join(__dirname, '../../files', fileName);
    res.download(filePath);
};
exports.downloadFileVulnerable = downloadFileVulnerable;

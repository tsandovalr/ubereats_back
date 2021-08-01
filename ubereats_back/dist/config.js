"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    JWT_SECRET: process.env.JWT_SECRET || "somesecrettoken",
    jwtSecret: process.env.JWT_SECRET || "somesecrettoken",
    secretOrKey: process.env.JWT_SECRET || "somesecrettoken",
    DB: {
        URI: process.env.MONGODB_URI || "mongodb+srv://tsandovalromay:sanandreas@cluster0.nezxj.mongodb.net/ubereats?retryWrites=true&w=majority",
        USER: process.env.MONGODB_USER || "moviles",
        PASSWORD: process.env.MONGODB_PASSWORD || "asd123",
    }
};

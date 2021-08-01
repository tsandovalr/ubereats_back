"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const passport_1 = __importDefault(require("passport"));
const user_controller_1 = require("../controllers/user.controller");
router.route('/profile')
    .get(passport_1.default.authenticate('jwt', { session: false }), user_controller_1.getUserInfo);
router.route('/signout')
    .get(passport_1.default.authenticate('jwt', { session: false }), user_controller_1.signOutUser);
exports.default = router;

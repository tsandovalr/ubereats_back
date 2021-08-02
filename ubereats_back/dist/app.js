"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const meal_1 = __importDefault(require("./routes/meal"));
const restaurant_1 = __importDefault(require("./routes/restaurant"));
//settings
app.set('port', process.env.PORT || 3000);
//env
dotenv_1.default.config({ path: './config/config.env' });
//middlewares
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_2.default);
app.use(cors_1.default({
    origin: true
}));
//routes
app.get('/', (req, res) => {
    res.send(`La API esta en http://localhost:${app.get('port')}`);
});
app.use(auth_1.default);
app.use(meal_1.default);
app.use(restaurant_1.default);
app.use(user_1.default);
exports.default = app;

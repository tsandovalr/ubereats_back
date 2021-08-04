import morgan from 'morgan';
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import passportMiddleware from './middlewares/passport';
import * as dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

const app = express();

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import mealRoutes from './routes/meal';
import restaurantRoutes from './routes/restaurant';
import orderRoutes from './routes/order';

//settings
app.set('port', process.env.PORT || 3000);

//env
dotenv.config({ path: __dirname+'./config/config.env' });

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(cors({
    origin: true
}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
//routes
app.get('/', (req, res) => {
    res.send(`La API esta en http://localhost:${app.get('port')}`)
});
app.use(authRoutes);
app.use(mealRoutes);
app.use(restaurantRoutes);
app.use(orderRoutes);
app.use(userRoutes);

export default app;
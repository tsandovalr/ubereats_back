import morgan from 'morgan';
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import passportMiddleware from './middlewares/passport';

const app = express();

import authRoutes from './routes/auth';
import userRoutes from './routes/user';

//settings
app.set('port', process.env.PORT || 3000);

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

//routes
app.get('/', (req, res) => {
    res.send(`La API esta en http://localhost:${app.get('port')}`)
});
app.use(authRoutes);
app.use(userRoutes);

export default app;
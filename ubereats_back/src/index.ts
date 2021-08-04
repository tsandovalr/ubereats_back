import app from './app';
import * as dotenv from 'dotenv';
import './database'

//env
dotenv.config({ path: __dirname+'./config/config.env' });

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));

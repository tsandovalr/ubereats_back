import app from './app';
require('dotenv').config();
import './database'

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));

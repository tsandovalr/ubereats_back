import jwt from 'jsonwebtoken';
import config from '../config'

const JWT_SECRET: any = config.JWT_SECRET; 

export const createToken = (id: any) : string => {
    return jwt.sign({ id }, JWT_SECRET)
};

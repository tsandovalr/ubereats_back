import { Response } from 'express';

import User from '../models/User';

export const getUserInfo = async (req: any, res: Response) => {
    const { _id } = req.user;
    try {
        const user = await User.findOne({ _id }).select("-password");
        return res.status(200).json({ status: 200, user });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    }
}

export const signOutUser = (req: any, res: Response) => {
    try {
        req.logout();
        return res.status(200).json({ status: 200, message: 'User successfully signed out' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Internal server error', error: e });
    };
};
import { Router } from 'express';
const router = Router();

import passport from 'passport';

import { getUserInfo, signOutUser } from '../controllers/user.controller';

router.route('/profile')
    .get(passport.authenticate('jwt', { session: false }), getUserInfo)

router.route('/signout')
    .get(passport.authenticate('jwt', { session: false }), signOutUser)

export default router;
import express from 'express';
import passport from 'passport';
import socialAuthController from '../controllers/socialAuthController';
import '../config/googlepassportConfig';
import checkUser from '../middlewares/checkUser';

const routes = express.Router();

routes.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

routes.get('/callback', passport.authenticate('google', { failureRedirect: process.env.FAILURE_REDIRECT }), checkUser, socialAuthController.successSignUp);

export default routes;

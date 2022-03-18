const express = require('express');
const {login, forgotPassword, changePassword, createAccount, activateAccount, evaluateToken} = require('../login/login');
const router = express.Router();

router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword', changePassword);
router.post('/createAccount', createAccount);
router.post('/activateAccount', activateAccount);
router.post('/evaluateToken', evaluateToken);

module.exports = {loginRoutes: router};
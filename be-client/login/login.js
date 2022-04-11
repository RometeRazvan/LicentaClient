const express = require('express');
const repoUser = require('../repository/userRepo');
const Client = require('../model/client');
const mailgun = require('mailgun-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var dotenv = require('dotenv');

dotenv.config();

const login = async (request, response) => {
    const {email, pass} = request.body;

    try {
        const data = await repoUser.getUser(email);

        console.log(data[0]);

        const password = data[0].password;

        const valid = await bcrypt.compare(pass, password);

        if(!valid) {
            throw new Error();
        }

        const token = await jwt.sign({email: email, password: pass}, process.env.SECRET_KEY);

        await repoUser.updateLogInToken(email, token);

        response.json({
            token: token,
            nume: data[0].nume,
            prenume: data[0].prenume,
        });

        response.status(200).send();

    }
    catch(err) {
        console.log(err);
        response.status(403).send('Nume sau parola incorecte');
    }
}

const sendEmail = (email , token) => {
    //const senderEmail = process.env.SENDER_EMAIL;
    const emailLink = process.env.EMAIL_LINK;
    const domain = process.env.DOMAIN;
    const apiKey = process.env.API_KEY;

    const mg = mailgun({apiKey: apiKey, domain: domain});
    const mailInfo = {
        from: 'noreply@hello.com',
        to: email,
        subject: 'Forgot password',
        text: `Va rog apasati link-ul urmator pentru a va schimba parola:
                ${emailLink}/forgotMyPassword/${token}`
    };

    console.log(token);

    mg.messages().send(mailInfo);
}

const forgotPassword = async (request, response) => {
    try {
        const {email} = request.body;

        const token = await jwt.sign({email: email},  process.env.SECRET_KEY, {expiresIn: '20m'});

        await repoUser.updateResetPasswordToken(email, token);

        sendEmail(email, token);

        response.status(200).send();
    }
    catch (err) {
        console.log(err);
        response.status(500).send('Erorare pe server');
    }
}

const changePassword = async (request, response) => {
    const {newPassword, token} = request.body;
    try {

        jwt.verify(token, process.env.SECRET_KEY, function(error, decoded) {
            if(error) {
                return response.status(401).json({
                    error: 'Token incorect sau expirat'
                });
            }
        });

        const data = await repoUser.getByResetToken(token);
        
        if(data[0].resetToken !== token) {
            throw new Error();
        }

        const crptdPass = await bcrypt.hash(newPassword, 1);

        await repoUser.resetPassword(crptdPass, token);
    }
    catch(err) {
        console.log(err);
        response.status(401).send('Token invalid');
    }

    response.status(200).send();
}

const createAccount = async(request, response) => {
    const {nume, prenume, email, telefon, password} = request.body;

    try {
        const token = await jwt.sign({nume: nume, prenume: prenume, email: email, telefon: telefon, password: password},  process.env.SECRET_KEY, {expiresIn: '20m'});

        sendEmail(email, token);

        console.log(sent);
    }
    catch(err) {
        console.log(err);
        response.status(500).send();
    }

    response.status(200).send();
}

const evaluateToken = async (request, response) => {
    const {token} = request.body;

    jwt.verify(token, process.env.SECRET_KEY, function(error, decoded) {
        if(error) {
            return response.status(401).json({
                error: 'Token incorect sau expirat'
            });
        }
    });

    return response.status(200).send();
}

const activateAccount = async(request, response) => {
    const {token} = request.body;

    try {
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded) {
                if(err) {
                    response.status(400).send('Token incorect sau expirat');
                }

                const {nume, prenume, email, telefon, password} = decoded;

                const crptdPass = await bcrypt.hash(password, 1);

                repoUser.createAccount(nume, prenume, email, telefon, crptdPass);
            })
        }
    }
    catch(err) {
        console.log(err);
        response.status(500).send();
    }

    response.status(200).send();
}

module.exports = {
    login: login,
    forgotPassword: forgotPassword,
    changePassword: changePassword,
    createAccount: createAccount,
    activateAccount: activateAccount,
    evaluateToken: evaluateToken,
};
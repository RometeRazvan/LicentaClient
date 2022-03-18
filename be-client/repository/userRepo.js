const  connection = require('./connection');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

const getUser = async (email) => {
    const command = `Select * from Client where email = '${email}'`;
    const data = await query(command);

    return data;
}

const updateLogInToken = async (email, token) => {
    const command = `Update Client set logInToken = '${token}' where email = '${email}'`;
    await query(command);
}

const updateResetPasswordToken = async (email, token) => {
    const command = `Update Client set resetToken = '${token}' where email = '${email}'`;
    await query(command);
}

const getByResetToken = async (token) => {
    const command = `Select * from Client where resetToken = '${token}'`;
    const data = await query(command);

    return data;
}

const resetPassword = async (newPassword, token) => {
    const command = `Update Client set password = '${newPassword}' where resetToken = '${token}'`;
    await query(command);
}

const createAccount = async (nume, prenume, email, telefon, password) => {
    const command = `Insert into Client (nume, prenume, email, telefon, password) Values('${nume}', '${prenume}', '${email}', '${telefon}', '${password}')`;
    await query(command);
}

const getGuestdata = async (token) => {
    const command = `Select isRepeteadGuest, previousCancellations, previousNotCancelled from Client where logInToken = '${token}'`;

    const data = await query(command);

    return data[0];
}

const getIdBiToken = async (token) => {
    const command = `Select id from Client where logInToken = '${token}'`;

    const data = await query(command);

    return data[0];
}

module.exports = {
    getUser: getUser,
    updateLogInToken: updateLogInToken,
    updateResetPasswordToken: updateResetPasswordToken,
    getByResetToken: getByResetToken,
    resetPassword: resetPassword,
    createAccount: createAccount,
    getGuestdata: getGuestdata,
    getIdBiToken: getIdBiToken,
}
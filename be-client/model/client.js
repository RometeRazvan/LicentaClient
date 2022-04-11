class Client {
    constructor(nume, prenume, email, telefon, password, logInToken, resetToken) {
        this.nume = nume;
        this.prenume = prenume;
        this.email = email;
        this.telefon = telefon;
        this.password = password;
        this.logInToken = logInToken;
        this.resetToken = resetToken;
    }
}

module.exports = Client;
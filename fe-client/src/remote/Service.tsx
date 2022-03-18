import axios, { AxiosInstance } from 'axios';

class Service {
    private instance: AxiosInstance;
    private authInstance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:3001/'
        });

        this.authInstance = axios.create({
            baseURL: 'http://localhost:3001/',
            headers: {
                Authorization: `${localStorage.getItem('tokenClient')}`
            }
        });
    }

    async logInRequest(body: any) {
        return this.instance.post('/logIn', {email: body.email, pass: body.password});
    }

    async forgotPassword(body: any) {
        return this.instance.post('/forgotPassword', {email: body.email});
    }

    async validateToken(body: any) {
        return this.instance.post('/evaluateToken', {token: body.token});
    }

    async changePassword(body: any) {
        return this.instance.patch('/resetPassword', {newPassword: body.password, token: body.token});
    }

    async createAccount(body: any) {
        return this.instance.post('/createAccount', {nume: body.nume, prenume: body.prenume, email: body.email, telefon: body.telefon, password: body.password});
    }

    async activateAccount(body: any) {
        return this.instance.post('/activateAccount', {token: body.token});
    }

    async getCamere() {
        return this.authInstance.post('/getCamere');
    }

    async getCamera(ind: any) {
        return this.authInstance.post('/getCamera', {ind: ind});
    }

    async checkBooking(body: any) {
        return this.authInstance.post('/checkBooking', {date1: body.dateFrom, date2: body.dateTo, ind: body.camera.ind, nb: body.rooms});
    }

    async addBooking(body: any) {
        return this.authInstance.post('/addBooking', {date1: body.date1, date2: body.date2, adults: body.adults, children: body.children, babies: body.babies, meal: body.meal, tip: body.tip, parking: body.parking, token: body.token, nb: body.nb, marketing: body.marketing});
    }

    async getBookings(body: any) {
        return this.authInstance.post('/getBookings', {token: body.token});
    }

    async cancelBooking(body: any) {
        return this.authInstance.post('/cancelBooking', {id: body.id, token: body.token});
    }
}

export default Service;
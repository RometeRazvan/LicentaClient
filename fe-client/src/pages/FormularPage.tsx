import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Formular from '../components/Formular';
import Service from '../remote/Service';

export interface FormularPageProps extends RouteComponentProps {}
 
export interface FormularPageState {
    adults: string;
    children: string;
    babies: string;
    meal: string;
    parcare: string;
    nume: any;
    tip: any;
    token: any;
    isSent: boolean;
    rooms: number;
    currentForm: number;
    isSubmit: boolean;
    marketing: string;
    fAd: any;
    fCh: any;
    fBa: any;
    fMe: any;
    fMa: any;
    fPa: any;
}
 
class FormularPage extends React.Component<FormularPageProps, FormularPageState> {
    private service: Service;

    constructor(props: FormularPageProps) {
        super(props);

        this.service = new Service();

        this.state = {
            adults: '',
            children: '',
            babies: '',
            meal: 'Da',
            parcare: '',
            nume: '',
            tip: '',
            token: '',
            isSent: true,
            rooms:  Number(localStorage.getItem('rooms')),
            currentForm: 0,
            isSubmit: false,
            marketing: 'None',
            fAd: Array(),
            fCh: Array(),
            fBa: Array(),
            fMe: Array(),
            fMa: Array(),
            fPa: Array(),
        }
    }

    componentDidMount = async () => {
        try {
            this.setState({
                tip: localStorage.getItem('cameraAleasa'),
                nume: localStorage.getItem('numeClient'),
                token: localStorage.getItem('tokenClient'),
            });

            console.log(this.state.rooms);

            if(this.state.rooms === 1) {
                this.setState({
                    isSubmit: true,
                })
            }
        }
        catch(err) {}
    }

    logOut = async () => {
        try {
            localStorage.removeItem('tokenClient');
            localStorage.removeItem('numeClient');

            this.props.history.push('/');
        }
        catch(err) {
            console.log(err);
        }
    }

    handleChange = (data: any) => {
		this.setState({
			...data,
		});
	};

    addVars = async () => {
        var ad = Number(this.state.adults);
        var ch = Number(this.state.children);
        var be = Number(this.state.babies);

        var me = 0;

        if(this.state.meal === 'Da')
            me = 1;

        var ma = 0;

        if(this.state.marketing === 'TA')
            ma = 1;
        else if(this.state.marketing === 'TO')
                ma = 2;
        
        var p = Number(this.state.parcare);

        let fad2 = [...this.state.fAd];
        let fch2 = [...this.state.fCh];
        let fba2 = [...this.state.fBa];
        let fme2 = [...this.state.fMe];
        let fma2 = [...this.state.fMa];
        let fpa2 = [...this.state.fPa];

        fad2.push(ad);
        fch2.push(ch);
        fba2.push(be);
        fme2.push(me);
        fma2.push(ma);
        fpa2.push(p);

        this.setState({
            fAd: fad2,
            fCh: fch2,
            fBa: fba2,
            fMe: fme2,
            fMa: fma2,
            fPa: fpa2,
        });

        console.log(this.state);
    }

    nextButton = async () => {
        var cf = this.state.currentForm + 1;

        this.setState({
            currentForm: cf,
        });

        await this.addVars();

        if(this.state.currentForm === this.state.rooms - 1) {
            this.setState({
                isSubmit: true,
            });
        }

    }

    submit = async () => {
        try {
            await this.addVars();

            var date = localStorage.getItem('date');

            if(date === null)
                date = '';
            
            const dates = date.split('|');

            var bod = {
                date1: dates[0],
                date2: dates[1], 
                adults: this.state.fAd, 
                children: this.state.fCh, 
                babies: this.state.fBa, 
                meal: this.state.fMe, 
                tip: this.state.tip, 
                parking: this.state.fPa, 
                token: this.state.token,
                nb: this.state.rooms,
                marketing: this.state.fMa,
            };

            console.log(bod);
            
            this.setState({
                isSent: false,
            });

            await this.service.addBooking(bod);

        }
        catch(err) {
            console.log(err);
        }
    }

    rezervari = async () => {
        this.props.history.push('/rezervari');
    }

    render() { 
        return (
            <div>
                <Formular {...this.state} handleChange = {this.handleChange} logOut = {this.logOut} submit = {this.submit} rezervari = {this.rezervari} nextButton = {this.nextButton}/>
            </div>
        );
    }
}
 
export default withRouter(FormularPage);
import * as React from 'react';
import CreateAccount from '../components/Login/CreateAccount';
import SendMailSuccess from '../components/Login/SendMailSuccess';
import Service from '../remote/Service';

export interface CreateAccountPageProps {
    
}
 
export interface CreateAccountPageState {
    nume: string;
    prenume: string;
    email: string;
    telefon: string
    password: string
    confirmPassword: string;
    eNume: boolean;
    ePrenume: boolean;
    eEmail: boolean;
    eTelefon: boolean;
    ePassword: boolean;
    eConfirmPassword: boolean;
    change: boolean;
    mNume: string;
    mPrenume: string;
    mEmail: string;
    mTelefon: string
    mPassword: string
    mConfirmPassword: string;
}
 
class CreateAccountPage extends React.Component<CreateAccountPageProps, CreateAccountPageState> {
    private service: Service;

    constructor(props: CreateAccountPageProps) {
        super(props);

        this.service = new Service();

        this.state = {
            nume: '',
            prenume: '',
            email: '',
            telefon: '',
            password: '',
            confirmPassword: '',
            eNume: false,
            ePrenume: false,
            eEmail: false,
            eTelefon: false,
            ePassword: false,
            eConfirmPassword: false,
            change: false,
            mNume: '',
            mPrenume: '',
            mEmail: '',
            mTelefon: '',
            mPassword: '',
            mConfirmPassword: '',
        }
    }

    handleChange = (data: any) => {
		this.setState({
			...data,
		});
	}

    validate = () => {
        var valid = true;

        const {nume, prenume, email, telefon, password, confirmPassword} = this.state;


        if(/^[a-zA-Z]+$/.test(nume) === false) {
            this.setState({
                eNume: true,
                mNume: 'Invalid first name'
            });

            valid = false;
        }
        else {
            this.setState({
                eNume: false,
            });

            valid = true;
        }

        if(/^[a-zA-Z]+$/.test(prenume) === false) {
            this.setState({
                ePrenume: true,
                mPrenume: 'Invalid last name'
            });

            valid = false;
        }
        else {
            this.setState({
                ePrenume: false,
            });
            
            valid = true;
        }

        if(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false) {
            this.setState({
                eEmail: true,
                mEmail: 'Invalid name',
            });

            valid = false;
        }
        else {
            this.setState({
                eEmail: false,
            });
            
            valid = true;
        }

        if(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|)?([0-9]{3}(\s|\.|)){2}$/.test(telefon) === false) {
            this.setState({
                eTelefon: true,
                mTelefon: 'Invalid phone number',
            });

            valid = false;
        }
        else {
            this.setState({
                eTelefon: false,
            });
            
            valid = true;
        }

        if(password.length < 5) {
            this.setState({
                ePassword: true,
                mPassword: 'Password must be at least 5 characters long',
            });

            valid = false;
        }
        else {
            this.setState({
                ePassword: false,
            });
            
            valid = true;
        }

        if(confirmPassword !== password) {
            this.setState({
                ePassword: true,
                eConfirmPassword: true,
                mConfirmPassword: 'Passwords must match',
                mPassword: 'Passwords must match',
            });

            valid = false;
        }
        else if(password.length >= 5) {
            this.setState({
                ePassword: false,
                eConfirmPassword:  false,
            });
            
            valid = true;
        }

        return valid;
    }

    submit = async () => {
        const valid = this.validate();

        if(valid === true) {
            try {
                const response = await this.service.createAccount(this.state);

                if(response.status === 200) {
                    this.setState({
                        change: true,
                    });
                }
            }
            catch(err) {

            }
        }
    }

    render() { 
        return (
            <div>
                {
                    this.state.change ?
                    <SendMailSuccess />
                    :
                    <CreateAccount {...this.state} handleChange = {this.handleChange} submit = {this.submit} />
                }
            </div>
        );
    }
}
 
export default CreateAccountPage;
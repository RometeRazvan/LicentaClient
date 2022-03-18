import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Login from '../components/Login/Login';
import Service from '../remote/Service';

export interface LoginPageProps extends RouteComponentProps {}
 
export interface LoginPageState {
    email: string;
    password: string;
    isError: boolean;
    errorMessage: string;
}
 
class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    private service: Service;

    constructor(props: LoginPageProps) {
        super(props);
        this.state = {
            email: 'razvan_romete@yahoo.com',
            password: 'razvan',
            isError: false,
            errorMessage: '',
        }

        this.service = new Service();
    }

    handleChange = (data: any) => {
		this.setState({
			...data,
			isError: false,
		});
	};

    clearData = () => {
        this.setState({
            password: '',
        })
    }

    setErrorTrue = () => {
        this.setState({
            isError: true,
            errorMessage: 'Incorrect email or password',
        });
    }

    setErrorFalse = () => {
        this.setState({
            isError: false,
            errorMessage: '',
        });
    }

    validate = () => {
        const {email, password} = this.state;

        if(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false) {
            this.setErrorTrue();
        }
        else {
            this.setErrorFalse();
        }

        if(password.length === 0) {
            this.setErrorTrue();
        }
        else {
            this.setErrorFalse();
        }
    }

    submit = async () => {
        this.validate();

        if(this.state.isError === false) {
            try {
                const result = await this.service.logInRequest(this.state);

                if(result.status === 200) {
                    const token = result.data.token;

                    localStorage.setItem('tokenClient', token);

                    const nume = result.data.nume;
                    const prenume = result.data.prenume;

                    localStorage.setItem('numeClient', nume + ' ' + prenume);

                    this.props.history.push('/main');
                }
            }
            catch(err) {
                this.setErrorTrue();
            }
        }
    }

    render() { 
        return (
            <div>
                <Login {...this.state} handleChange = {this.handleChange} submit ={this.submit} />
            </div>
        );
    }
}
 
export default withRouter(LoginPage);
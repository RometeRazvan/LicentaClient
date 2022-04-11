import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ForgotPassword from '../components/Login/ForgotPassword';
import SendMailSuccess from '../components/Login/SendMailSuccess';
import Service from '../remote/Service';

export interface ForgotPasswordPageProps extends RouteComponentProps {}
 
export interface ForgotPasswordPageState {
    email: string;
    isError: boolean;
    errorMessage: string;
    isSent: boolean;
}
 
class ForgotPasswordPage extends React.Component<ForgotPasswordPageProps, ForgotPasswordPageState> {
    private service: Service;
    constructor(props: ForgotPasswordPageProps) {
        super(props);

        this.state = {
            email: '',
            isError: false,
            errorMessage: '',
            isSent: false,
        }

        this.service = new Service();
    }

    setErrorTrue = () => {
        this.setState({
            isError: true,
            errorMessage: 'Invalid Email',
        });
    }

    setErrorFalse = () => {
        this.setState({
            isError: false,
            errorMessage: '',
        });
    }

    submit = async () => {
        try {
            const {email} = this.state;

            if(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) === false) {
                this.setErrorTrue();
            }
            else {
                this.setErrorFalse();

                const result = await this.service.forgotPassword(this.state);

                if(result.status === 200) {
                    this.setState({isSent: true});
                }
            }
        }
        catch(err) {
            this.setErrorFalse();
        }
    }

    handleChange = (data: any) => {
		this.setState({
			...data,
			isError: false,
		});
	};


    render() { 
        return (
            <div>
                {this.state.isSent ? 
                    <SendMailSuccess />
                    :   
                    <ForgotPassword {...this.state} handleChange = {this.handleChange} submit = {this.submit} />
            }
            </div>
        );
    }
}
 
export default withRouter(ForgotPasswordPage);
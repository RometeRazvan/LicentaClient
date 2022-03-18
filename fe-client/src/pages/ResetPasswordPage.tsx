import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Change from '../components/Login/Change';
import ResetPassword from '../components/Login/ResetPassword';
import Service from '../remote/Service';

interface RouteParams {
	token: string;
}

export interface ResetPasswordPageProps extends RouteComponentProps<RouteParams> {}
 
export interface ResetPasswordPageState {
    password: string;
    confirmPassword: string;
    isError: boolean;
    token: string;
    errorMessage: string;
    isErrorValidate: boolean;
    change: boolean;
}
 
class ResetPasswordPage extends React.Component<ResetPasswordPageProps, ResetPasswordPageState> {
    
    private service: Service;

    constructor(props: ResetPasswordPageProps) {
        super(props);

        this.state = {
            password: '',
            confirmPassword: '',
            isError: false,
            token: this.props.match.params.token,
            errorMessage: '',
            isErrorValidate: false,
            change: false,
        }

        this.service = new Service();
    }

    handleChange = (data: any) => {
		this.setState({
			...data,
			isError: false,
		});
	};

    submit = async () => {
        const {password, confirmPassword} = this.state;

        if(password.length < 5) {
            this.setState({
                isError: true,
                errorMessage: 'Password is too short',
            });

            return;
        }

        if(password !== confirmPassword) {
            this.setState({
                isError: true,
                errorMessage: 'Passwords don\'t match',
            });

            return;
        }

        try {
            const response = await this.service.changePassword(this.state);

            if(response.status === 200) {
                this.setState({change: true});
            }
        }
        catch(err) {
            this.setState({
                isErrorValidate: true,
                change: true,
            });
        }

    }

    componentWillMount = async () => {
        try {
            const result = await this.service.validateToken(this.state);

            if(result.status !== 200) {
                this.setState({
                    change: true,
                    isErrorValidate: false,
                });
            }
        }
        catch(err) {
            this.setState({
                change: true,
                isErrorValidate: true,
            });
        }
    }

    render() { 
        return (
            <div>
                {
                    this.state.change ? 
                    <Change {...this.state} />
                    :
                    <ResetPassword {...this.state} handleChange = {this.handleChange} submit = {this.submit} />

                }
            </div>
        );
    }
}
 
export default withRouter(ResetPasswordPage);
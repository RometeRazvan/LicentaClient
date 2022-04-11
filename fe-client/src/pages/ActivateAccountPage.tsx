import * as React from 'react';
import Service from '../remote/Service';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import ActivateAccount from '../components/Login/ActivateAccount';

interface RouteParams {
	token: string;
}

export interface ActivateAccountPageProps extends RouteComponentProps<RouteParams> {}
 
export interface ActivateAccountPageState {
    isOk: boolean;
    token: string;
    isLoaded: boolean;
}
 
class ActivateAccountPage extends React.Component<ActivateAccountPageProps, ActivateAccountPageState> {
    private service: Service;

    constructor(props: ActivateAccountPageProps) {
        super(props);

        this.service = new Service();

        this.state = {
            isOk: false,
            token: this.props.match.params.token,
            isLoaded: false,
        }
    }

    componentDidMount = async () => {
        try {
            const response = await this.service.activateAccount(this.state);

            if(response.status === 200) {
                this.setState({
                    isOk: true,
                });
            }
            else {
                this.setState({
                    isOk: false,
                });
            }
        }
        catch(err) {
            this.setState({
                isOk: false,
            });
        }

        this.setState({
            isLoaded: false,
        });
    }

    render() { 
        return (
            <div>
                {this.state.isLoaded ?
                    <CircularProgress />
                    :
                    <ActivateAccount {...this.state} />
                }
            </div>
        );
    }
}
 
export default withRouter(ActivateAccountPage);
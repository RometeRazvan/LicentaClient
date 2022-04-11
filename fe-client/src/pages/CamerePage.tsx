import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Camere from '../components/Camere';
import Service from '../remote/Service';

export interface CamerePageProps extends RouteComponentProps {}
 
export interface CamerePageState {
    camere: any;
    nume: any;
    isLoading: boolean;
}
 
class CamerePage extends React.Component<CamerePageProps, CamerePageState> {
    private service: Service;

    constructor(props: CamerePageProps) {
        super(props);
        
        this.service = new Service();

        this.state = {
            camere: null,
            nume: '',
            isLoading: true,
        }
    }

    componentDidMount = async () => {
        try {

            this.setState({
                nume: localStorage.getItem('numeClient'),
            });

            const token = localStorage.getItem('tokenClient');

            if(token === null) {
                this.props.history.push('/');
            }

            const result = await this.service.getCamere();

            this.setState({
                camere: result.data,
                isLoading: false,
            });
        }
        catch(err) {
            console.log(err);
            this.props.history.push('/');
        }
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

    changeRoom = async (ind: string) => {
        try {
            localStorage.setItem('cameraAleasa', ind);

            this.props.history.push('/camera');
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
            <Camere {...this.state} logOut = {this.logOut} changeRoom = {this.changeRoom} rezervari = {this.rezervari}/>
        );
    }
}
 
export default withRouter(CamerePage);
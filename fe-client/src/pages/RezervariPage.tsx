import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Rezervari from '../components/Rezervari';
import Service from '../remote/Service';

export interface RezervariPageProps extends RouteComponentProps {}
 
export interface RezervariPageState {
    camere: any;
    nume: any;
    token: any;
    isLoaded: boolean;
    pop: boolean;
}
 
class RezervariPage extends React.Component<RezervariPageProps, RezervariPageState> {
    private service: Service;
    constructor(props: RezervariPageProps) {
        super(props);

        this.service = new Service();

        this.state = {
            camere: null,
            nume: '',
            token: '',
            isLoaded: false,
            pop: false,
        }
    }

    componentDidMount = async () => {
        try {
            const tk = localStorage.getItem('tokenClient');
            this.setState({
                token: tk,
                nume: localStorage.getItem('numeClient'),
            });


            const response = await this.service.getBookings({token: tk});

            console.log(response.data);

            this.setState({
                camere: response.data.data,
                isLoaded: true,
            });

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

    delete = async () => {
        try {
            console.log('111111');
            this.setState({
                isLoaded: false,
            });

            const tk = localStorage.getItem('tokenClient');

            await this.service.cancelBooking({id: Number(localStorage.getItem('idToDelete')), token: tk});

            const response = await this.service.getBookings({token: tk});

            this.setState({
                camere: response.data.data,
                isLoaded: true,
            });

            this.setState({
                pop: false,
            });
        }
        catch(err) {}
    }

    rezervari = async () => {
        this.props.history.push('/rezervari');
    }

    openPopup = async (id: number) => {
        localStorage.setItem('idToDelete', String(id));
        this.setState({
            pop: true,
        });
    }

    closePopup = async () => {
        this.setState({
            pop: false,
        });
    }

    render() { 
        return (
            <div>
                <Rezervari {...this.state} logOut = {this.logOut} delete = {this.delete} rezervari = {this.rezervari} openPopup = {this.openPopup} closePopup = {this.closePopup}/>
            </div>
        );
    }
}
 
export default withRouter(RezervariPage);
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Camera from '../components/Camera';
import Service from '../remote/Service';
import { CamerePageProps } from './CamerePage';

export interface CameraPageProps extends RouteComponentProps {}

export interface CameraPageState {
    camera: any;
    isLoadingRoom: boolean;
    nume: any;
    dateFrom: string;
    dateTo: string;
    isClicked: boolean;
    isLoading: boolean;
    isTrue: boolean;
    chance: [];
    rooms: number;
}
 
class CameraPage extends React.Component<CameraPageProps, CameraPageState> {
    private service: Service;

    constructor(props: CamerePageProps) {
        super(props);

        this.service = new Service();

        this.state = {
            camera: null,
            isLoadingRoom: true,
            nume: '',
            dateFrom: '',
            dateTo: '',
            isClicked: false,
            isLoading: true,
            isTrue: true,
            chance: [],
            rooms: 1,
        }
    }

    componentDidMount = async () => {
        try {
            const ind = localStorage.getItem('cameraAleasa');
            
            const response = await this.service.getCamera(ind);

            this.setState({
                camera: response.data,
                isLoadingRoom: false,
                nume: localStorage.getItem('numeClient'),
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

    handleChange = (data: any) => {
		this.setState({
			...data,
		});
	};

    check = async () => {
        console.log('rooms', this.state.rooms);

        this.setState({
            isClicked: true,
            isLoading: true,
        });

        const response = await this.service.checkBooking(this.state);

        if(response.data.isOk === true) {
            this.setState({
                isLoading: false,
                isTrue: true,
            });
        }
        else {
            this.setState({
                chance: response.data.p,
                isTrue: false,
                isLoading: false,
            });
        }

        console.log('Sanse: ', this.state.chance);
    }

    nextPage = async () => {
        const {dateFrom, dateTo} = this.state;

        const date = dateFrom + '|' + dateTo;

        localStorage.setItem('date', date);

        localStorage.setItem('rooms', String(this.state.rooms));

        this.props.history.push('/formular');
    }

    rezervari = async () => {
        this.props.history.push('/rezervari');
    }

    render() { 
        return (
            <div>
                <Camera {...this.state} logOut = {this.logOut} handleChange = {this.handleChange} check = {this.check} nextPage = {this.nextPage} rezervari = {this.rezervari}/>
            </div>
        );
    }
}
 
export default withRouter(CameraPage);
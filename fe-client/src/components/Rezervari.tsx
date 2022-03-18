import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import * as React from 'react';
import MyAppBar from './MyAppBar';

export interface RezervariProps {
    classes: any;
    nume: any;
    logOut(): any;
    camere: any;
    isLoaded: boolean;
    delete(): any;
    rezervari(): void;
    pop: boolean;
    openPopup(id: number): any;
    closePopup(): any;
}
 
export interface RezervariState {
    
}

const styles = createStyles({
    item: {
        marginRight: '5%',
    },
    imagine: {
        display: 'inline-block',
        maxWidth: '300px',
        maxHeight: '200px',
    },
});
 
class Rezervari extends React.Component<RezervariProps, RezervariState> {

    render() { 
        const {classes, camere, isLoaded} = this.props;
        return (
            <div>
                <MyAppBar nume = {this.props.nume} logOut = {this.props.logOut} rezervari = {this.props.rezervari}  />

                <div style = {{width: '100%', marginTop: '3%'}}>
                    {isLoaded ?
                    <div style = {{width: '100%'}}>
                        <div style = {{width: '100%'}}>
                            {camere.map((item: any) => (
                                <div style = {{width: '100%'}}>
                                    <div style = {{width: '100%',display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '1%', border: '1px solid grey'}}>
                                        <div className = {classes.item}>
                                            <img src = {'/images/rooms/' + item.roomType + '.jpg'} alt = '' className = {classes.imagine} />
                                        </div>
                                        <div className = {classes.item}>
                                            <p>Arrival: {item.date}</p>
                                            <p>Departure: {item.dateTo}</p>
                                        </div>
                                        <div className = {classes.item}>
                                            <p>RoomType: {item.roomType}</p>
                                            <p>Meal: {item.meal}</p>
                                        </div>
                                        <div className = {classes.item}>
                                            <p>Adults: {item.adults}</p>
                                            <p>Children: {item.children}</p>
                                            <p>Babies: {item.babies}</p>
                                        </div>
                                        <div className = {classes.item}>
                                            <Button variant="contained" color="secondary" onClick = {() => (this.props.openPopup(item.id))}>
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <CircularProgress />
                    }
                </div>
                <Dialog
                    open={this.props.pop}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">Do you really want to delete this booking?</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Once it hs been deleted, it may not be recovered, you might not be able to get this booking back immediately.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick = {this.props.delete} color="primary">
                    Yes
                </Button>
                <Button onClick={this.props.closePopup} color="primary" autoFocus>
                    No
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}
 
export default withStyles(styles)(Rezervari);
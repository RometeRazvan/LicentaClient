import {Button, Card, CircularProgress, Grid, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import * as React from 'react';
import MyAppBar from './MyAppBar';

export interface CamereProps {
    classes: any;
    camere: any;
    nume: any;
    logOut(): void;
    isLoading: boolean;
    changeRoom(ind: string): any;
    rezervari(): void;
}
 
export interface CamereState {
    
}

const styles = createStyles({
    container: {
        width: '100%',
        marginTop: '2%',
    },
    imagine: {
        display: 'inline-block',
        maxWidth: '300px',
        maxHeight: '200px',
    },
    card: {
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%'
    },
    gridItem: {
        
    },
     titlu: {
        display: 'flex',
        justifyContent: 'center',
    }
});
 
class Camere extends React.Component<CamereProps, CamereState> {
    render() { 
        const {classes, nume} = this.props;
        return (
            <div style = {{overflowX: 'hidden', overflowY: 'hidden'}}>
                <MyAppBar nume = {nume} logOut ={this.props.logOut} rezervari = {this.props.rezervari} />

                <div className = {classes.titlu}>
                    <h2>Room Types</h2>
                </div>

                <div className = {classes.container}>
                    <Grid container spacing = {1}>
                        {this.props.isLoading ?
                            <CircularProgress />
                            :
                            this.props.camere.map((elem: any) => (
                                    <Grid item xs={4} className = {classes.gridItem} >
                                        <Card className = {classes.card}>
                                            <Button style ={{width: '100%'}} onClick = {() => (this.props.changeRoom(elem.ind))}>
                                                <img src = {'/images/rooms/' + elem.imagine} className = {classes.imagine} alt = ''/>
                                                <div style ={{marginLeft: 'auto', marginRight: 'auto', fontWeight: 'bold'}}>{elem.nume}</div>
                                            </Button>
                                        </Card>
                                    </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(Camere);
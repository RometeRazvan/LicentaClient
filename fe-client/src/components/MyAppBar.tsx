import { AppBar, Button, createStyles, Link, Toolbar, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export interface MyAppBarProps {
    classes: any;
    nume: any;
    logOut(): void;
    rezervari(): void;
}
 
export interface MyAppBarState {
    
}
 
const styles = createStyles({
    tBar: {
        display: 'flex',
        width: '100%'
    },
    item: {
        flexGrow: 1,
    },
    space: {
        flexGrow: 3000
    },
});

class MyAppBar extends React.Component<MyAppBarProps, MyAppBarState> {
    render() {
        const {classes, nume} = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar className = {classes.tbar}>
                        <Typography variant="h6" className = {classes.item}>
                            <Link href = "/main" style={{ textDecoration: 'none', color: 'white'}}>
                                Hotel
                            </Link>
                        </Typography>
                        <div className = {classes.space} />
                        <Typography variant="h6" className = {classes.item}>
                            {nume}
                        </Typography>
                        <Button color="inherit" className = {classes.item} onClick = {this.props.rezervari}>Bookings </Button>
                        <div className = {classes.item}>
                            <PersonIcon style = {{marginLeft: '20%'}}/>
                        </div>
                        <Button color="inherit" className = {classes.item} onClick = {this.props.logOut}>Log Out <ExitToAppIcon /> </Button>
                    </Toolbar>
                </AppBar>
            </div> 
        );
    }
}
 
export default withStyles(styles)(MyAppBar);
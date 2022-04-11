import {createStyles, Icon, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

export interface SendMailSuccessProps {
	classes: any;
}
 
export interface SendMailSuccessState {
    
}

const styles = createStyles({
	icon : {
		color:'green',
	},
	iconRow : {
		borderBottom:'1px solid grey',
		marginBottom: '1%',
	},
	welcomeCard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        backgroundColor: '#e6e6e6',
        borderRadius: '5px',
		padding: '2%',
	},
	container: {
        backgroundImage: 'url(/images/login/login.jpg)',
        width: '100%',
        height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	cardBox: {
		width: '50%',
		marginTop: 'auto',
		marginBottom: 'auto',
	}
});

class SendMailSuccess extends React.Component<SendMailSuccessProps, SendMailSuccessState> {

    render() { 
		const {classes} = this.props;
        return (
            <div className = {classes.container}>
				<div className = {classes.cardBox}>
					<div className = {classes.welcomeCard}>
						<Icon className={classes.iconRow}>
							<DoneOutlineIcon className = {classes.icon} />
						</Icon>
						<Typography variant="h5" component="h2">
							An email has been sent to your inbox !
						</Typography>
					</div>
				</div>
			</div>
        );
    }
}
 
export default withStyles(styles)(SendMailSuccess);
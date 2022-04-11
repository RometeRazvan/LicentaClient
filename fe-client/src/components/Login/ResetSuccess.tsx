import {createStyles, Icon, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

export interface ResetSuccessProps {
	classes: any;
}
 
export interface ResetSuccessState {
    
}

const styles = createStyles({
	icon : {
		color:'green',
	},
	iconRow : {
		marginBottom: '1%',
	},
	container: {
        backgroundImage: 'url(/images/login/login.jpg)',
        width: '100%',
        height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	welcomeCard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        backgroundColor: '#e6e6e6',
        borderRadius: '5px',
		padding: '2%',
	},
	cardBox: {
		width: '50%',
		marginTop: 'auto',
		marginBottom: 'auto',
	}
});

class ResetSuccessValidate extends React.Component<ResetSuccessProps, ResetSuccessState> {

    click = async () => {
        
    }

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
							Your password has been successfully changed !!!
						</Typography>
					</div>
				</div>
			</div>
        );
    }
}
 
export default withStyles(styles)(ResetSuccessValidate);
import { createStyles, Icon, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export interface ActivateAccountProps {
    classes: any;
    isOk: boolean;
}
 
export interface ActivateAccountState {
    
}

const styles = createStyles({
	icon : {
		color:'green',
	},
    icon2 : {
		color:'red',
	},
	iconRow : {
		borderBottom:'1px solid grey',
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
 
class ActivateAccount extends React.Component<ActivateAccountProps, ActivateAccountState> {
    
    render() { 
        const {classes, isOk} = this.props;
        return (
            <div className = {classes.container}>
				<div className = {classes.cardBox}>
					<div className = {classes.welcomeCard}>
						<Icon className={classes.iconRow}>
							{isOk ?
                                <DoneOutlineIcon className = {classes.icon} />
                                :
                                <ErrorOutlineIcon className = {classes.icon2} />
                            }
						</Icon>
						<Typography variant="h5" component="h2">
							{
                                isOk ?
                                'Your account has been successfully activated'
                                :
                                'Error!'
                            }
						</Typography>
					</div>
				</div>
			</div>
        );
    }
}
 
export default withStyles(styles)(ActivateAccount);
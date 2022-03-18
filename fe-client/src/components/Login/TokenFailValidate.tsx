import { createStyles, Icon, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export interface TokenFailValidateProps {
	classes: any;
}
 
export interface TokenFailValidateState {
    
}

const styles = createStyles({
	icon : {
		color:'red',
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

class TokenFailValidate extends React.Component<TokenFailValidateProps, TokenFailValidateState> {

    render() { 
		const {classes} = this.props;
        return (
            <div className = {classes.container}>
				<div className = {classes.cardBox}>
					<div className = {classes.welcomeCard}>
						<Icon className={classes.iconRow}>
							<ErrorOutlineIcon className = {classes.icon} />
						</Icon>
						<Typography variant="h5" component="h2">
							Incorrect or expired token !
						</Typography>
					</div>
				</div>
			</div>
        );
    }
}
 
export default withStyles(styles)(TokenFailValidate);
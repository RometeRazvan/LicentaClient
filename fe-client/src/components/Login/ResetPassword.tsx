import { Button, CssBaseline, TextField, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import * as React from 'react';

export interface ResetPasswordProps {
    classes: any;
    password: string;
    confirmPassword: string;
    isError: boolean;
    errorMessage: string;
    handleChange(data: any): any;
    submit(): any;
}
 
export interface ResetPasswordState {
    
}

const styles = createStyles({
    container : {
        backgroundImage: 'url(/images/login/login.jpg)',
        //opacity: 0.5,
        width: '100%',
        height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
    },
	paper: {
        marginTop: 'auto',
        marginBottom: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        backgroundColor: '#e6e6e6',
        width: '20%',
        padding: '20px',
        borderRadius: '5px',
	},
	message: {
		display: 'none',
	},
	errMessage: {
		display: 'block',
		color: 'red',
		margin: '0px',
	},
});

class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {
    
    handleData = (type: any) => (event: any) => {
        this.props.handleChange({
            [type]: event.target.value,
        });
    };

    render() { 
        const {classes, password, confirmPassword, isError, errorMessage} = this.props;
        return (
            <div
             className = {classes.container}>
                <CssBaseline />
                <div className = {classes.paper}>
                    <div>
                        Va rog introduceti noua parola:
                    </div>
                    <TextField
  						variant="outlined"
  						margin="normal"
  						required
  						fullWidth
  						id="password"
  						label="Password"
  						name="password"
  						autoComplete="password"
                        type = "password" 
  						autoFocus
  						value={password}
  						onChange={this.handleData('password')}
  						error={isError}
  					/>
                    <TextField
  						variant="outlined"
  						margin="normal"
  						required
  						fullWidth
  						id="confirmPassword"
  						label="Confirm Password"
  						name="confirmPassword"
  						autoComplete="confirmPassword"
                        type = "password" 
  						autoFocus
  						value={confirmPassword}
  						onChange={this.handleData('confirmPassword')}
  						error={isError}
  					/>
                      <h4 className={isError ? classes.errMessage : classes.message}>
                          {errorMessage}
                      </h4>
  					<Button
  						className={classes.button}
  						fullWidth
  						variant="contained"
  						color="primary"
  						onClick={this.props.submit}
  					>
                    Request
  					</Button>
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(ResetPassword);
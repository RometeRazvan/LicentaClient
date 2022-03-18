import { Button, CssBaseline, TextField, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import * as React from 'react';

export interface ForgotPasswordProps {
    classes: any;
    submit(): any;
    handleChange(data: any): any;
    email: string;
    isError: boolean;
    errorMessage: string;
}
 
export interface ForgotPasswordState {
    
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
 
class ForgotPassword extends React.Component<ForgotPasswordProps, ForgotPasswordState> {

    handleData = (type: any) => (event: any) => {
        this.props.handleChange({
            [type]: event.target.value,
        });
    };

    render() {
        const {classes, email, isError, errorMessage} = this.props;
        return (
            <div
             className = {classes.container}>
                <CssBaseline />
                <div className = {classes.paper}>
                    <div>
                        Va rog introduceti adresa dumeavoastra de email:
                    </div>
                    <TextField
  						variant="outlined"
  						margin="normal"
  						required
  						fullWidth
  						id="email"
  						label="Email Address"
  						name="email"
  						autoComplete="email"
  						autoFocus
  						value={email}
  						onChange={this.handleData('email')}
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
 
export default withStyles(styles)(ForgotPassword);
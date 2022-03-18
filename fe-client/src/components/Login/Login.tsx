import { Avatar, Button, createStyles, CssBaseline, Grid, Link, TextField, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export interface LoginProps {
    classes: any;
    email: string;
    password: string;
    errorMessage: string;
    isError: boolean;
    handleChange(data: any): any;
    submit(): any;
}
 
export interface LoginState {
    
}

const styles = createStyles({
    container : {
        backgroundImage: 'url(/images/login/login.jpg)',
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
	button: {
		marginBottom: '10px',
	},
});
 
class Login extends React.Component<LoginProps, LoginState> {

    handleData = (type: any) => (event: any) => {
        this.props.handleChange({
            [type]: event.target.value,
        });
    };

    render() {
        const {classes, email, password, isError, errorMessage} = this.props;
        return (
            <div className = {classes.container}>
                <CssBaseline />
                <div className={classes.paper}>
  				<Avatar>
  					<LockOutlinedIcon />
  				</Avatar>
  				<Typography component="h1" variant="h5">
            Sign in
  				</Typography>
  				<div>
  					<h4 className={isError ? classes.errMessage : classes.message}>
  						{errorMessage}
  					</h4>
  				</div>
  				<form className={classes.form} noValidate>
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
  					<TextField
  						error={isError}
  						variant="outlined"
  						margin="normal"
  						required
  						fullWidth
  						name="password"
  						label="Password"
  						type="password"
  						id="password"
  						autoComplete="current-password"
  						onChange={this.handleData('password')}
  						value={password}
  					/>
  					<Button
  						className={classes.button}
  						fullWidth
  						variant="contained"
  						color="primary"
  						onClick={this.props.submit}
  					>
              Sign In
  					</Button>
  					<Grid container>
                        <Grid item xs = {12}>
  							<Link href="/forgotPassword" variant="body2">
  								{'Forgot password?'}
  							</Link>
  						</Grid>
						  <Grid item xs = {12}>
  							<Link href="/createAccount" variant="body2">
  								{'Don\'t have an account? Create one.'}
  							</Link>
  						</Grid>
  					</Grid>
  				</form>
  			</div>
            </div>
        );
    }
}
 
export default withStyles(styles)(Login);
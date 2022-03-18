import { Avatar, Button, CssBaseline, TextField, Typography, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import * as React from 'react';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';

export interface CreateAccountProps {
    classes: any;
    nume: string;
    prenume: string;
    email: string;
    telefon: string
    password: string
    confirmPassword: string;
    eNume: boolean;
    ePrenume: boolean;
    eEmail: boolean;
    eTelefon: boolean;
    ePassword: boolean;
    eConfirmPassword: boolean;
    mNume: string;
    mPrenume: string;
    mEmail: string;
    mTelefon: string
    mPassword: string
    mConfirmPassword: string;
    handleChange(data: any): any;
    submit(): any;
    
}
 
export interface CreateAccountState {
    
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
        width: '35%',
        padding: '10px',
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
    form: {
        width: '80%'
    },
});

class CreateAccount extends React.Component<CreateAccountProps, CreateAccountState> {

    handleData = (type: any) => (event: any) => {
        this.props.handleChange({
            [type]: event.target.value,
        });
    };

    render() { 
        const {classes, nume, prenume, email, password, confirmPassword, eNume, ePassword, ePrenume, eConfirmPassword, eEmail, eTelefon, telefon, mNume, mPassword, mConfirmPassword, mEmail, mPrenume, mTelefon} = this.props;
        return (
            <div className = {classes.container}>
                <CssBaseline />
                <div className={classes.paper}>
  				<Avatar>
  					<FormatAlignCenterIcon />
  				</Avatar>
  				<Typography component="h1" variant="h5">
            Create account
  				</Typography>
  				<form className={classes.form} noValidate>
                    <TextField
  						variant="outlined"
  						margin="normal"
  						required
  						fullWidth
  						label="First Name"
  						autoComplete="First Name"
  						autoFocus
  						value={nume}
  						onChange={this.handleData('nume')}
  						error={eNume}
  					/>
                    <div>
                        <h4 className={eNume ? classes.errMessage : classes.message}>
                            {mNume}
                        </h4>
                    </div>
                    <TextField
  						variant="outlined"
  						margin="normal"
  						required
  						fullWidth
  						label="Last Name"
  						autoComplete="Last Name"
  						autoFocus
  						value={prenume}
  						onChange={this.handleData('prenume')}
  						error={ePrenume}
  					/>
                    <div>
                        <h4 className={ePrenume ? classes.errMessage : classes.message}>
                            {mPrenume}
                        </h4>
                    </div>
                    <TextField
  						variant="outlined"
  						margin="normal"
  						required
  						fullWidth
  						label="Email"
  						autoComplete="Email"
  						autoFocus
  						value={email}
  						onChange={this.handleData('email')}
  						error={eEmail}
  					/>
                    <div>
                        <h4 className={eEmail ? classes.errMessage : classes.message}>
                            {mEmail}
                        </h4>
                    </div>
                    <TextField
  						variant="outlined"
  						margin="normal"
  						required
  						fullWidth
  						label="Phone number"
  						autoComplete="Phone number"
  						autoFocus
  						value={telefon}
  						onChange={this.handleData('telefon')}
  						error={eTelefon}
  					/>
                    <div>
                        <h4 className={eTelefon ? classes.errMessage : classes.message}>
                            {mTelefon}
                        </h4>
                    </div>
                    <TextField
  						variant="outlined"
  						margin="normal"
  						required
  						fullWidth
  						label="Password"
  						autoComplete="Password"
  						type="password"
  						autoFocus
  						value={password}
  						onChange={this.handleData('password')}
  						error={ePassword}
  					/>
                    <div>
                        <h4 className={ePassword ? classes.errMessage : classes.message}>
                            {mPassword}
                        </h4>
                    </div>
                    <TextField
  						variant="outlined"
  						margin="normal"
  						required
  						fullWidth
  						label="Confirm Password"
  						autoComplete="Confirm Password"
  						type="password"
  						autoFocus
  						value={confirmPassword}
  						onChange={this.handleData('confirmPassword')}
  						error={eConfirmPassword}
  					/>
                    <div>
                        <h4 className={eTelefon ? classes.errMessage : classes.message}>
                            {mConfirmPassword}
                        </h4>
                    </div>
  					<Button
  						className={classes.button}
  						fullWidth
  						variant="contained"
  						color="primary"
  						onClick={this.props.submit}
  					>
              Register
  					</Button>
  				</form>
  			</div>
            </div>
        );
    }
}
 
export default withStyles(styles)(CreateAccount);
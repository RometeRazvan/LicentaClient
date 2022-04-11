import { Button, createStyles, FormControl, FormControlLabel, FormLabel, Icon, Radio, RadioGroup, TextField, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import MyAppBar from './MyAppBar';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

export interface FormularProps {
    classes: any;
    adults: string;
    children: string;
    babies: string;
    meal: string;
    parcare: string;
    nume: any;
    logOut(): any;
    handleChange(data: any): void;
    submit(): any;
    isSent: boolean;
    rezervari(): void;
    marketing: string;
    isSubmit: boolean;
    nextButton(): any;
    currentForm: number;
    rooms: number;
}
 
export interface FormularState {
    
}

const styles = createStyles({
    box: {
        display: 'inline-flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    container: {
        display: 'inline-flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: '5%',
    },
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
});
 
class Formular extends React.Component<FormularProps, FormularState> {

    handleData = (type: any) => (event: any) => {
        this.props.handleChange({
            [type]: event.target.value,
        });
    };

    render() { 
        const {classes, adults, children, babies, meal, parcare, marketing, currentForm, rooms} = this.props;
        return (
            <div>
                <MyAppBar nume = {this.props.nume} logOut = {this.props.logOut} rezervari = {this.props.rezervari}  />

                <div className = {classes.container}>
                    {this.props.isSent ?
                        <div className = {classes.box}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Adults"
                            autoComplete="Adults"
                            autoFocus
                            value={adults}
                            onChange={this.handleData('adults')}
                            //error={eNume}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Children"
                            autoComplete="Copii"
                            autoFocus
                            value={children}
                            onChange={this.handleData('children')}
                            //error={eNume}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Babies"
                            autoComplete="Babies"
                            autoFocus
                            value={babies}
                            onChange={this.handleData('babies')}
                            //error={eNume}
                        />
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Meal?</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={meal} onChange={this.handleData('meal')}>
                                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                                        <FormControlLabel value = 'Da' control={<Radio />} label="Yes" />
                                        <FormControlLabel value = 'Nu' control={<Radio />} label="No" />
                                    </div>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">How did you find out about us?</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={marketing} onChange={this.handleData('marketing')}>
                                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                                        <FormControlLabel value = 'None' control={<Radio />} label="None" />
                                        <FormControlLabel value = 'TA' control={<Radio />} label="Traveling Agents" />
                                        <FormControlLabel value = 'TO' control={<Radio />} label="Tour operators" />
                                    </div>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Parking spaces"
                            autoComplete="Parcare"
                            autoFocus
                            value={parcare}
                            onChange={this.handleData('parcare')}
                            //error={eNume}
                        />
                        {this.props.isSubmit ?
                            <Button variant="contained" color="primary" onClick = {this.props.submit}>
                                Submit
                            </Button>
                            :
                            <Button variant="contained" color="primary" onClick = {this.props.nextButton}>
                                Next
                            </Button>
                        }
                        <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '5%', fontSize:'40px', color: 'grey'}}>{currentForm + 1} / {rooms}</div>
                    </div>
                    :
                    <div className = {classes.welcomeCard}>
						<Icon className={classes.iconRow}>
							<DoneOutlineIcon className = {classes.icon} />
						</Icon>
						<Typography variant="h5" component="h2">
							Cazarea dumneavoastra a fost inregistrata !
						</Typography>
					</div>
                    }
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(Formular);
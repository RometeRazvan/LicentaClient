import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import * as React from 'react';
import MyAppBar from './MyAppBar';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';

export interface CameraProps {
    classes: any;
    nume: any;
    logOut(): any;
    camera: any;
    isLoadingRoom: boolean;
    handleChange(data: any): void;
    dateFrom: string;
    dateTo: string;
    check(): any;
    isClicked: boolean;
    isLoading: boolean;
    isTrue: boolean;
    chance: [];
    nextPage(): any;
    rezervari(): void;
    rooms: number;
}

export interface CameraState {
    
}

const styles = createStyles({
    box: {
        margitTop:'5%',
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    image: {
        display: 'inline-block',
        maxWidth: '500px',
        maxHeight: 'auto',
    },
    info: {
        display: 'inline-flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        border: '1px solid grey',
        borderRadius: '5px',
        padding: '2%', 
        width: '60%', 
        marginTop: '5%', 
        marginLeft: '2%',
    }
});

class Camera extends React.Component<CameraProps, CameraState> {
    handleData = (type: any) => (event: any) => {
        this.props.handleChange({
            [type]: event.target.value,
        });
    };

    render() {
        const {classes, camera, dateFrom, dateTo, rooms} = this.props;
        return (
            <div>
                <MyAppBar nume = {this.props.nume} logOut = {this.props.logOut} rezervari = {this.props.rezervari} />

                <div className = {classes.box}>
                    {this.props.isLoadingRoom ?
                        <CircularProgress />
                        :
                        <div className = {classes.info}>
                            <div style = {{display: 'flex', flexDirection: 'row'}}>
                                <div style ={{marginRight: '50px'}}>
                                    <img src = {'/images/rooms/' + camera.imagine} alt = '' className = {classes.image}/>
                                    <div style = {{fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>
                                        Surface: {camera.suprafata} square meters.
                                    </div>
                                </div>
                                <div style = {{width: '100%'}}>
                                    <div style = {{display: 'inline'}}> <h3 style = {{display: 'flex', justifyContent: 'center'}}>Qualities</h3> </div>
                                    <div>
                                        <Grid container spacing = {3}>
                                            {camera.descriere.map((item: any) => (
                                                <Grid item xs = {1} sm = {6}>
                                                    <div style = {{display: 'flex', alignItems: 'center'}}><DoneOutlineIcon style = {{color: 'green', marginRight: '5%'}}/> {item}</div>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div style = {{marginTop: '5%', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style ={{display:'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', marginBottom: 'auto', marginLeft: '60%'}}>
                            <div style = {{display: 'flex', flexDirection: 'row'}}>
                                <TextField
                                    id="date"
                                    label="From"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    value = {dateFrom}
                                    onChange = {this.handleData('dateFrom')}
                                />
                                <TextField
                                    id="date"
                                    label="To"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    style={{marginLeft:'5%'}}
                                    value = {dateTo}
                                    onChange = {this.handleData('dateTo')}
                                />
                                <Button color="inherit" className = {classes.item} onClick = {this.props.check}> <ArrowForwardIcon /> </Button>
                            </div>
                            <div style ={{marginTop:'5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <InputLabel id="demo-simple-select-label">How many rooms?</InputLabel>
                                <FormControl className={classes.formControl}>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={rooms}
                                        onChange={this.handleData('rooms')}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {this.props.isClicked ?
                                <div>
                                    {this.props.isLoading ?
                                        <CircularProgress />
                                        :
                                        <div>
                                            {this.props.isTrue ?
                                                <div style = {{marginTop: '5%', width: '200px', display: 'flex', flexDirection: 'column'}}>
                                                    <Box bgcolor="success.main" style ={{padding: '20px', textAlign: 'center'}}>The booking is available</Box>
                                                    <Button variant="contained" color="primary" style = {{marginTop: '5%'}} onClick = {this.props.nextPage}> <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}><p>Formular</p><TrendingFlatIcon /> </div> </Button>
                                               </div> 
                                                :
                                                <div style = {{marginTop: '20%', width: '200px'}}>
                                                    <Box bgcolor="warning.main" style ={{padding: '20px', textAlign: 'center'}}>
                                                        The room(s) is/aren't available but there is a chance they might free up:
                                                            {this.props.chance.map((item: any, key: any) => (
                                                                <div>
                                                                    {key + 1 !== 1 ?
                                                                        <div>
                                                                            {key + 1} Rooms : {item} %
                                                                        </div>
                                                                        :
                                                                        <div>
                                                                            {key + 1} Room : {item} %
                                                                        </div>
                                                                    }
                                                                </div>
                                                            ))}
                                                        </Box>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                :
                                <div />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Camera);
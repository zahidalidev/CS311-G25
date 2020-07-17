import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);


class Teachers extends Component {

    state = {
        teachers: [
            ["", [
            ["Monday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Tuesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Wednesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Thursday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Friday", 1, 1, 1, 1, 1, 1, 1, 1],
        ]]],

        width: 0, height: 0,
        marginLeftTextField: 0 
    }

    handleChange = (e, i, j, k) => {
        const teachers = [...this.state.teachers];
        
        if(k === undefined){
            teachers[i][j] = e.target.value;
        }else{
            teachers[i][1][j][k] = e.target.value;
        }
        this.setState({teachers})
    }

    addMoreField = () => {
        const teachers = [...this.state.teachers, ["", [
            ["Monday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Tuesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Wednesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Thursday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Friday", 1, 1, 1, 1, 1, 1, 1, 1],
        ]]]
        this.setState({teachers});
    }

    handleSubmit = () => {
        this.props.onHandleTeachers(this.state.teachers);
    }

    handleRemove = (i) => {
        const teachers = [...this.state.teachers];
        if(teachers.length > 1){
            teachers.splice(i, 1);
            this.setState({teachers});
        }else{
            alert("Add atleast one teacher!")
        }
    }



    setMarginLeft = () => {
        if(window.innerWidth <= 700){
            this.setState({marginLeftTextField: 20})
        }else{
            this.setState({marginLeftTextField: 0})
        }
    }

    updateDimensions = (i) => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        if(i === 1){
            this.setMarginLeft();
        }
    };
    
    componentDidMount() {

        window.addEventListener('resize', () => this.updateDimensions(1));
        this.setMarginLeft();
        
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateDimensions(0));
        this.setMarginLeft();
        // console.log(this.state.width)
    }
    

    render(){
        const { teachers, marginLeftTextField } = this.state;
        const leftMargin = marginLeftTextField === 0 ? marginLeftTextField * -4 + 70 : 70;

        return (
            <form noValidate>
                <Grid container alignItems="center" item xs={12} style={{marginTop: 60, marginLeft: marginLeftTextField * 2}}>
                    {
                        teachers.map((teacher, i) => {
                            return (
                                <Grid container key = {i} direction="column" justify="center" alignItems="center" item xs={9} style={{marginTop: 50, marginLeft: marginLeftTextField }}>  
                                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={4} item sm={12}>                                    
                                        <Grid container direction="row" justify="flex-end" alignItems="center" item xs={4} style={{paddingLeft: {leftMargin}, paddingRight: marginLeftTextField * -3}}>
                                            <Grid container direction="row" justify="flex-end" alignItems="center" item xs={marginLeftTextField === 0 ? 4 : 1} >
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick = {() => this.handleRemove(i)}
                                                    style={{marginRight: 20}}
                                                >
                                                    X
                                                </Button>
                                            </Grid>
                                            <Grid container direction="row" justify="flex-end" alignItems="center" item xs={marginLeftTextField === 0 ? 8 : 11} >
                                                <CssTextField
                                                    label = {marginLeftTextField === 0 ? `Teacher-${i+1} Name` : null}
                                                    variant = "outlined"
                                                    id = "custom-css-outlined-input"
                                                    value = {teacher[0]}
                                                    onChange = {(e) => this.handleChange(e, i, 0)}
                                                    size="small"
                                                    
                                                />
                                                {marginLeftTextField === 0 ? null : 
                                                    <FormHelperText id="standard-weight-helper-text">Teacher-{i+1} Name</FormHelperText>
                                                }
                                                
                                            </Grid>
                                        </Grid>
                                        {teacher[1].map((week, j) => {
                                            return (
                                                <Grid container key = {j} direction="row" justify="flex-end" alignItems="center" item xs={8}>
                                                    <p style={{marginRight: 20}} >{week[0]}</p>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[1]}
                                                            onChange={(e) => this.handleChange(e, i, j, 1)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>8-9AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[2]}
                                                            onChange={(e) => this.handleChange(e, i, j, 2)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>9-10AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[3]}
                                                            onChange={(e) => this.handleChange(e, i, j, 3)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>10-11AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[4]}
                                                            onChange={(e) => this.handleChange(e, i, j, 4)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>11-12AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[5]}
                                                            onChange={(e) => this.handleChange(e, i, j, 5)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>12-1PM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[6]}
                                                            onChange={(e) => this.handleChange(e, i, j, 6)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>1-2PM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[7]}
                                                            onChange={(e) => this.handleChange(e, i, j, 7)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>2-3PM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[8]}
                                                            onChange={(e) => this.handleChange(e, i, j, 8)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>3-4PM</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                    <Divider style={{width: "80%", marginLeft: 120, marginTop: 30}} />
                                </Grid>
                            );
                        })
                    }
                    <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start" 
                    item sm={3}
                    style={{marginTop: 20, marginLeft: marginLeftTextField * 2}}
                    >
                        <Button onClick={this.addMoreField} variant="contained" color="primary">
                            Add more
                        </Button>
                    </Grid>
                </Grid>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center" 
                    item xs={12}
                    style={{ marginTop: 40, marginBottom: 100}}
                >
                    <Button
                        variant="contained"
                        style={{backgroundColor: '#90ee90'}}
                        endIcon={<SendIcon>send</SendIcon>}
                        onClick = {this.handleSubmit}
                    >
                        Submit and Next
                    </Button>
                </Grid>
            </form>
        );
    }
}

export default Teachers;
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// styling of linear progrss bar
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 6,
    borderRadius: 5,
    width: '100%',
  },
  colorPrimary: {
    backgroundColor: "#76adbc",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#2a3547',
  },
}))(LinearProgress);

// styling for circlular progress bar
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

// circle progress bar
function FacebookCircularProgress(props) {
  const classes = useStylesFacebook();
  return (
    <div className={classes.root}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant = "static"
          // variant = {(props.onononProgressValue === 0 || props.onononProgressValue === 100) ? "static" : "indeterminate"}
          style={{color: '#2a3547', animationDuration: '550ms'}}
          value={props.onononProgressValue}
        {...props}
        
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            props.onononProgressValue,
          )}%`}</Typography>
        </Box>
      </Box>
    </div>
  );
}



// getting value of progress from its parent component (ononProgressValue) taht is Pagination 
export default function ProgressBars({ononProgressValue}) {
  return (
    <div className style={{flexGrow: 1}}>
      <form noValidate>
        <Grid container direction="row" item sm={12} >
          <Grid container direction="row" item sm={1} >
            <FacebookCircularProgress onononProgressValue = {ononProgressValue} />  {/* circular progress bar component */}
          </Grid>
          <Grid container direction="row" item sm={11} style={{paddingLeft: 5, marginTop: 15}} >
            <BorderLinearProgress variant="determinate" value={ononProgressValue} />  {/* linear progress bar component */}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

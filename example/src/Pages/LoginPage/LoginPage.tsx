import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { useState } from 'react';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(15),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
     
    },
  }),
);

export default function LoginPage() {
  const classes = useStyles();
  const adminUser = {
    username: 'kwicki',
    password: 'sevenet',
  }

  const [user, setUser] = useState({username: '', password: ''});
  const [error, setError] = useState('');

  const Login = (details: string) => {
    console.log(details)
  }

  const Logout = () => {
    console.log("Logout")
  }

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          {(user.username != "") ? (
          <>
            <Paper className={classes.paper}>
              Welcome
            </Paper>
            <button>Logout</button>
          </>

          ) : (
            <Paper className={classes.paper}>
              <LoginForm Login={Login} error={error}/>
            </Paper>
          )}
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Container>


  );
}
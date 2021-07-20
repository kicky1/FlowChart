import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(15),
    },
    textFiled: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface Props {
  Login: Function;
  error: String;
}

const LoginForm: React.FC<Props> = ({Login, error}) => {
  const classes = useStyles();
  const [details, setDetails] = useState({username:'', password:''})
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      Login(details);
  }
  return (
    <form onSubmit={submitHandler}>
        <TextField className={classes.textFiled} id="outlined-basic" label="Username" variant="outlined" />
        <TextField className={classes.textFiled} id="outlined-basic" label="Password" variant="outlined" />
        <Button className={classes.button} variant="contained" color="primary" type="submit">
                  Zatwierdź
        </Button>
    </form>
  );
}

export default LoginForm
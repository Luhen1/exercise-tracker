import React from "react";
import axios from "axios";
import {  makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function addclick () {
  var exerciseStatus;
  var name = document.getElementById('name').value;
  var desc = document.getElementById('desc').value;
  var dura = document.getElementById('dura').value;
  var date = document.getElementById('date').value;

  if(name == '' && desc == 'Nenhum' && dura == 0 && date == 0) alert("Preencha pelo menos um campo!");
  else
  {
    axios.post('http://localhost:8000/exercises/add', {
      name: name,
      description: desc,
      duration: dura,
      date: date,
  }).then((response) => {
    if(response.data)
    {
      exerciseStatus = response.data;
      alert(exerciseStatus);
    };
  });
  }
}

function CreateExercise() {
  const classes = useStyles();

  return (
  <div className={classes.root}>
    <h3>Coloque o nome do exercicio</h3>
    <input type="text" placeholder="insere nome aqui" id="name">
      </input>
    <h3>Descreve como foi o seu exercicio</h3>
    <input type="text" placeholder="insere descrição aqui" id="desc">
      </input>
    <h3>Quanto tempo demorou?</h3>
    <input type="text" placeholder="insere duração aqui em minutos" id="dura">
      </input>
    <h3>Quando foi ?</h3>
    <input type="text" placeholder="insere a data do exercicio" id="date">
      </input>
    <Button variant="contained" onClick={() => {addclick()}}>Send</Button>
  </div>
  );
}

export default CreateExercise;

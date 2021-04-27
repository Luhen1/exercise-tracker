import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button"
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const CreateExercise = () => {

  var deletestatus;

  const classes = useStyles();
  const [exercise, setExercise] = useState([]);
  const [search, setSearch] = useState("");
  
  const deleteClick = (_id) => {
      axios.delete(`http://localhost:8000/exercises/${_id}`)
      .then((response) =>{
        if(response.data)
        {
          deletestatus = response.data;
          alert(deletestatus);
        };
      })
}

  const getExerciseData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8000/exercises"
      );
      console.log(data.data);
      setExercise(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getExerciseData();
  }, []);
  return (
    <div className="App">
       <Navbar/>
      <h1>Exercise Tracker</h1>
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Link to="/exercise/create">
        <Button variant="contained" color="primary" Link="/">Novo Exercício</Button>
      </Link>
    

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>             
              <StyledTableCell >Exercise Name</StyledTableCell>
              <StyledTableCell align="right">Descrição</StyledTableCell>
              <StyledTableCell align="right">Duração (minutos)</StyledTableCell>
              <StyledTableCell align="right">Data</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exercise
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    
                    <StyledTableCell component="th" scope="row">
                      {item.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.description}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.duration}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.date}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                    <Link to="/exercise/edit">
                        <Button variant="contained">Edit</Button>
                    </Link>
                    <Button variant="contained" color="secondary" onClick={() => {deleteClick(item._id)}} >Delete</Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CreateExercise;
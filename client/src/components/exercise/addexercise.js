import React, {useState, useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import Navbar from '../navbar/navbar'
import { v4 as uuid } from "uuid";
import axios from 'axios'
import {
    Form, 
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

const [name, setName] = useState('');
const { addUser } = useContext(GlobalContext);
const history = useHistory();

const onSubmit = (e) => {
  e.preventDefault();
  const newUser = {
    id: uuid(),
    name
  }
  addUser(newUser);
  history.push("/");
}

const onChange = (e) => {
  setName(e.target.value);
}




function addexercise() {

    return (
        <Form onSubmit={onSubmit}>
          <Navbar/>
        <FormGroup>
          <Label>Name</Label>
          <Input type="text" value={name} onChange={onChange} name="name" placeholder="Enter user" required></Input>
        </FormGroup>
        <Button type="submit">Submit</Button>
        <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
      </Form>
    )
  }

  export default addexercise();
import React from 'react';
import "./login.css";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


function login() {   
  
    return (  
        <div className="login">
               
                    <img
                    className="login__logo"
                    src="/photos/fit.png" 
                    alt=""
                    /> 
    
                <div className="login__container">
                    <h1>Login</h1>
                    <form>  
                        <h5>Email:</h5>
                        <input type="text" name="nome" id = "nome2"/>
                        <h5>Senha:</h5>   
                        <input type="password" name="password" id = "senha"/>
                    </form>
                    <div className="login__Button">
                        <div className="login_sign">
                            <Button type = "button" variant="outlined" className="login__Button">Entrar</Button>    
                        </div>
                        <div className="login_register">
                            <Link to="/register">    
                                <Button type = "button" variant="outlined" className="login__Button">Novo?</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
} 


export default login;
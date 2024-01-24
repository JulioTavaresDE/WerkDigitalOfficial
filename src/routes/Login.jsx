import React, { useState, useEffect } from 'react'   
import axios from 'axios';  
import { useNavigate } from "react-router-dom";


function Login(props) {  
    const [employee, setemployee] = useState({ Email: '', Password: ''});  
    const apiUrl = "https://localhost:7243/api/Task/Login";   
    const navigate = useNavigate()
     
    const Authent_Login = (e) => {    
            e.preventDefault();    
 
            const data = { Email:employee.Email, Password: employee.Password };    
            axios.post(apiUrl, data)    
            .then((result) => {    
 
                console.log(result.data);   
                const serializedState = JSON.stringify(result.data.UserDetails);  
               var a= localStorage.setItem('myData', serializedState);   
                console.log("A:",a)  
                const user =result.data.UserDetails;  
                console.log(result.data.message);  
                if (result.data.status == '200')    
                    navigate("/Home");    
                    //alert('yahooo...')
                else    
                    alert('Invalid User');    
            })        
          };    
          
          const onChange = (e) => {    
                e.persist();       
                setemployee({...employee, [e.target.name]: e.target.value});    
              }    
    return (  
        
                        <div>
                      <form onSubmit={Authent_Login} >  
                        <div >  
                          <input type="email"  value={employee.Email} onChange={ onChange }  name="Email" id="Email" aria-describedby="emailHelp" placeholder="Enter Email"/>  
                        </div>  
                        <div >  
                          <input type="password" value={employee.Password} onChange={ onChange }  name="Password" id="DepPasswordartment" placeholder="Password"/>  
                        </div>  
                        {/* <div class="form-group">  
                          <div class="custom-control custom-checkbox small">  
                            <input type="checkbox" class="custom-control-input" id="customCheck"/>  
                            <label class="custom-control-label" for="customCheck">Remember Me</label>  
                          </div>  
                        </div> */}  
                        <button type="submit" className="btn btn-info mb-1" ><span>Login</span></button>    
                        <hr/>  
                      </form>  
                      <hr/>  
                    </div>  
    )  
}  
  
export default Login 
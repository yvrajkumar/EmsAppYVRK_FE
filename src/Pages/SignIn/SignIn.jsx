import React, { useState } from "react";
import classes from './SignIn.module.css';
import { Link, useHistory} from "react-router-dom";
import SignIn_Img from "../../Images/SignIn.svg";
import axios from 'axios';

function SignIn() {
    const [signinDetails, setsigninDetails] = useState({
        email: "",
        password: "",
      });

      let history = useHistory();

      const onChangeHandler = (e) => {
        let user = signinDetails;
        user[e.target.name] = e.target.value;
        setsigninDetails(user);
      };
    
      const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/SignIn`, { signinDetails })
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        if(res.data.validation==="true")
        {
          console.log(res.data.validation);
          localStorage.setItem('userDetails', JSON.stringify(res.data));
          history.push('/profile')
          
        }
      })
        return;        
      }
    
  return (
    <div className={classes.SignIn}>
      <div className={classes.SignIn_Image}>
          <img src={SignIn_Img} alt="SignIn" />
      </div>
      <div className={classes.SignIn_Box}>
            <form onSubmit={onSubmitHandler}>
              <h1 className={classes.title_SU}>SIGN IN</h1>
              <br></br>
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChangeHandler}
              /><br></br>

              <input type="submit" value="SUBMIT" />
              <br></br><br></br>
              <div className={classes.bottomLinkWrapper}>
              <Link to="/ForgotPassword" className={classes.BottomLinks}>
                Forgot Password ?
              </Link>
              <br></br>
              <Link to="/SignUp" className={classes.BottomLinks}>
                New User ?
              </Link>
            </div>
            </form>
        </div>
    </div>
  );
}

export default SignIn;

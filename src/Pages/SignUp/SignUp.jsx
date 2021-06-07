import React, { useState } from "react";
import classes from './SignUp.module.css';
import { Link, useHistory} from "react-router-dom";
import SignUp_Img from "../../Images/SignUp.svg";
import axios from 'axios';

function SignUp() {
  const [signupDetails, setsignupDetails] = useState({
    name: "",
    email: "",
    password: "",
    empcode: "",
    address: "",
    joiningdate: "",

  });
  
  let history = useHistory();

  const onChangeHandler = (e) => {
    let user = signupDetails;
    user[e.target.name] = e.target.value;
    setsignupDetails(user);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.post(`https://ems-app-yvrk.herokuapp.com/SignUp`, { signupDetails })
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        if(res.data.result==="Account Created")
        {
          history.push('/SignIn')
        }
        else
        {
          alert("Account exist with this email.");
        }
      })
    return;        
  }
    return (
      <div className={classes.SignUp}>
      <div className={classes.SignUp_Image}>
          <img src={SignUp_Img} alt="SignUp" />
      </div>
      <div className={classes.SignUp_Box}>
            <form onSubmit={onSubmitHandler}>
              <h1 className={classes.title_SU}>SIGN UP</h1>
              <br></br>
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="email"
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

              <input
                type="text"
                placeholder="Emp-Code"
                name="empcode"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="date"
                placeholder="Joining date"
                name="joiningdate"
                onChange={onChangeHandler}
              /><br></br>

              <input type="submit" value="SUBMIT" />
              <br></br><br></br>
              <div className={classes.bottomLinkWrapper}>
              <Link to="/SignIn" className={classes.BottomLinks}>
                Have an account ?
              </Link>
            </div>
            </form>
        </div>
    </div>
    );
  }
  
  export default SignUp;

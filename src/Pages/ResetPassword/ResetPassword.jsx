import React, { useState } from "react";
import classes from './ResetPassword.module.css';
import ResetPassword_Img from "../../Images/ResetPassword.svg";

function ResetPassword() {
    const [newpassword, setnewpassword] = useState({
        resetcode: "",
        password: "",
        confirmpassword: "",
      });
      const onChangeHandler = (e) => {
        let user = newpassword;
        user[e.target.name] = e.target.value;
        setnewpassword(user);
      };
    
      const onSubmitHandler = async (e) => {
        e.preventDefault();
        return;        
      }
    
  return (
    <div className={classes.ResetPassword}>
      <div className={classes.ResetPassword_Image}>
          <img src={ResetPassword_Img} alt="ResetPassword" />
      </div>
      <div className={classes.ResetPassword_Box}>
            <form onSubmit={onSubmitHandler}>
              <h3 className={classes.title_SU}>Enter reset code sent to your mail to reset password.</h3>
              <br></br>
              <input
                type="text"
                placeholder="Reset Code"
                name="resetcode"
                onChange={onChangeHandler}
              /><br></br>

            <input
                type="text"
                placeholder="New Password"
                name="password"
                onChange={onChangeHandler}
              /><br></br>

            <input
                type="text"
                placeholder="Confirm New Password"
                name="confirmpassword"
                onChange={onChangeHandler}
              /><br></br>

              <input type="submit" value="SUBMIT" />
            </form>
        </div>
    </div>
  );
}

export default ResetPassword;

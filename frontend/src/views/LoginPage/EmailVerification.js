import React from "react";
import axios from "axios";
export default function Emailverify(props){
    const token= props.match.params.token;
    axios({
        method: 'post',
        url: "http://localhost:5000/users/verify/",
        headers: {}, 
        data: {
            token: token
        }
      }).then(res =>{
            alert(res.data.message);
           const token = res.data.token;
           localStorage.setItem('TokenKey', token);
           window.location.href = "/login-page";
        })
        return(
            <div>
                <h3 style={{justify: "center"}}>Please Wait</h3>
            </div>
        )
}

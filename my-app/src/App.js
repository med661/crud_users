import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "./features/userSlice";
import axios from "./config/axios";
import {Link}from "react-router-dom"
function App() {

  const [name, setname] = useState("")
  const [email, setemil] = useState("")
  const [mobile, setmobile] = useState("")


  const users = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("api/users")
      .then((res) => {
        console.log({ res });
        console.log(res.data.data);
        console.log({ users });
        dispatch(setUsers({ value: res.data.data }));
        console.log("user effect" + { users });
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [setUsers]);
  const handelregister=(e)=>{ 
    e.preventDefault();
    axios.post('api/users',{name,email,mobile}).then((res)=>{
        alert(res.data.message)
       dispatch(setUsers()) 
        setTimeout(() => {
   }, 4000);
    }).catch((err)=>{
    console.log(err);
     
    })

  }
  const handeldelete=(id)=>{
if (window.confirm(`dou you wanna delete user with id ${id} `)) {
  axios.delete(`api/users/${id}`).then((res)=>{
    console.log("resdelet"+JSON.stringify(res))
        console.log("resdelet"+JSON.stringify(res))


  }).catch((err)=>{
    console.log(err);
  })  
  
}
  }

  return (
    <div className="App">
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        redux tool
      </h1>

      {users.map((user) => {

        return <table className="table" style={{width:"50%",height:"50%"}}>
          <tr>
          <th>name</th>
    <th>email</th>
    <th>mobile</th>
    <th>action</th>

    </tr>
<tr>
 <td> {user.name}</td>
 <td> {user.email}</td>
 <td> {user.mobile}</td>
 <td><button  style={{backgroundColor:"#ffaacc"}} onClick={()=>{handeldelete(user._id)}}>delete</button></td>


  
  </tr>
        </table>;
      })}
      <form onSubmit={handelregister} style={{ marginTop:"-400px",display: "flex",alignItems: "self-end",justifyContent: "flex-end"}}>
        <table>
          <tr>
            <td>name</td>
            <td>
              {" "}
              <input type="text" name="name" value={name} placeholder="your name" 
              onChange={e=>{setname(e.target.value)}}
              />
            </td>
          </tr>
          <tr>
            <td>email</td>
            <td>
              {" "}
              <input
                type="text"
                name="email"
                value={email}
                placeholder="your email"
                onChange={e=>{setemil(e.target.value)}}

              />
            </td>
          </tr>
          <tr>
            <td>mobile</td>{" "}
            <td>
              {" "}
              <input
                type="text"
                name="mobile"
                value={mobile}
                placeholder="your mobile"
                onChange={e=>{setmobile(e.target.value)}}

              />
            </td>
          </tr>
        </table>

        <button className="btn btn-primary" type="submit">
          Add user
        </button>
      </form>
    </div>
  );
}

export default App;

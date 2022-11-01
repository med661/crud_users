import React, { useEffect, useState } from "react";
import InputGroup from "../components/InputGroup";
import RowDetails from "../components/RowDetails";
import axios from "axios";
import Alert from "../components/Alert";

function Home() {
    
const [users, setUsers] = useState([]);
const [form,setForm]=useState()
const [errors,setErrors]=useState({})
const [message, setMessage] = useState("")
const [show, setShow] = useState(false)
const onChangeHnadler=(e)=>{
setForm({
    ...form,
    [e.target.name]:e.target.value
})
console.log(form)
}


const onSubmitHandler=(e)=>{
     e.preventDefault();
    axios.post('/api/users',form).then((res)=>{
       // alert(res.data.message)
       setMessage(res.data.message)
      setShow(true)
      console.log({form})

   setTimeout(() => {
    setShow(false)
   }, 4000);
    }).catch((err)=>{
      setErrors(err.response.data)
    console.log(errors);
     
    })


}


/**add user */
    useEffect(() => {
      const fetchData = async () =>{
        try {
          const {data: response} = await axios.get('/api/users/');
          setUsers(response.data);
         
       } catch (error) {
          console.error(error.message);
        }
      }
  
      fetchData();
    },[form,users]);


    /**delete user  */
    const onDelete=(ID)=>{
      if (window.confirm("are y sure to delete this user")) {
       axios.delete(`/api/users/${ID}`).then((res)=>{
        setMessage(res.data.message)

        setShow(true)

        setTimeout(() => {
          setShow(false)
         }, 4000);
       }) 
      }
   

  }
  return (
    <div className="row p-4">
      <Alert message={message} show={show}/>
      <div className="mt-4">
        <h2>Crud Users</h2>
      </div>
      <div className="col-12 col-lg-4">
        <form onSubmit={onSubmitHandler}>
          <InputGroup label="name" type="text" name="name" 
          onChangeHnadler={onChangeHnadler}
          errors={errors.name}
          />
          <InputGroup label="email" type="text" name="email"
            onChangeHnadler={onChangeHnadler}
            errors={errors.email}

             />

          <InputGroup label="mobile" type="text" name="mobile"  
          onChangeHnadler={onChangeHnadler}
          errors={errors.mobile}

          />

          <button className="btn btn-primary" type="submit">
            Add user
          </button>
        </form>
      </div>
      <div className="col-12 col-lg-7">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">mobile</th>
            </tr>
          </thead>
          <tbody>



          {users.map(({ name, email, mobile, _id }) => (
              <RowDetails key={_id}
              email={email} name={name} mobile={mobile} Id={_id} 
              onDelete={onDelete}
              />
            ))}
           
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

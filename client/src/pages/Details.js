import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InputGroup from '../components/InputGroup'
import { useNavigate } from 'react-router-dom'

function Details() {
    const [form,setForm]=useState({})
    const {id}=useParams()
    const [errors,setErrors]=useState({})
const navigate =useNavigate()

    const onChangeHnadler=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
        console.log(form)
        }
        

    const onSubmitHandler=(e)=>{
        e.preventDefault();
       axios.put(`/api/users/${id}`,form).then((res)=>{
          // alert(res.data.message)
          navigate('/')
   
       }).catch((err)=>{
         setErrors(err.response.data)
       console.log(errors);
        
       })
   
   
   }
   useEffect(() => {
    const fetchData = async () =>{
      try {
        const {data: response} = await axios.get(`/api/users/${id}`);
        setForm(response.data);
     } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  },[]);
   
  return (
    <div className="container mt-4 col-12 col-lg-4">
    <form onSubmit={onSubmitHandler}>
      <InputGroup label="name" type="text" name="name" 
      onChangeHnadler={onChangeHnadler}
      errors={errors.name}
      value={form.name}
      />
      <InputGroup label="email" type="text" name="email"
        onChangeHnadler={onChangeHnadler}
        errors={errors.email}
        value={form.email}

         />

      <InputGroup label="mobile" type="text" name="mobile"  
      onChangeHnadler={onChangeHnadler}
      errors={errors.mobile}
      value={form.mobile}


      />

      <button className="btn btn-primary" type="submit">
        Add user
      </button>
    </form>
  </div>
  )
}

export default Details
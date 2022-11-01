import React from 'react'
import { Link } from 'react-router-dom'
function RowDetails({name,email,mobile,Id,onDelete}) {
  
  return (
    <tr>
    <th>{name}</th>
    <td>{email}</td>
    <td>{mobile}</td>
    <td className="gap__actions">
      <span className="badge bg-info">
        <Link to={`/${Id}`} className="text-white">
          <i className="fas fa-edit"></i>
        </Link>
      </span>

      <span className="badge bg-danger" onClick={()=>onDelete(Id)}>
        <i className="fas fa-trash-alt"></i>
      </span>
    </td>
  </tr>
  )
}

export default RowDetails
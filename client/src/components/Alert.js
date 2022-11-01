import React from 'react'

function Alert({message,show}) {
  return (
    <div className="alert alert-success" role="alert" style={{display:show?"block":"none"}}>
        {message}
  </div>
  )
}

export default Alert
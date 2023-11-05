import React from 'react'

export default function Alert(props) {
    const captalize=(word)=>{
      if(word==="danger"){
        word = "error";
      }
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }
  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{captalize(props.alert.type)}!</strong> {props.alert.msg}.
    </div>
  )
}
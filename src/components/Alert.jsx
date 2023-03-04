import React, { useEffect } from 'react'

const Alert = ({type, msg, removeAlert, groceryList}) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 50);
    return () => clearTimeout(timeout)
  }, [groceryList])

  return <p className={`alert alert-${type}`}> {msg} </p>
}

export default Alert
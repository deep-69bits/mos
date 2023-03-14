import React from 'react'

function Card(props) {
  return (
    <div className={`rounded-md shadow-md flex flex-col justify-center items-center p-10 gap-3 m-5 ${props.className}`}>
        {props.children}
    </div>
  )
}

export default Card
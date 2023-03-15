import React from 'react'

function Card(props) {
  return (
    <div className={`rounded-md border-[0.5px] border-white flex flex-col justify-center items-center p-10 gap-3 m-5 ${props.className}`}>
        {props.children}
    </div>
  )
}

export default Card
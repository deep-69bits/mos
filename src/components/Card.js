import React from 'react'

function Card(props) {
  return (
    <div className={`rounded-lg rounded-t-3xl border-[0.5px] border-gray-500 flex flex-col justify-center pb-10 items-center gap-3 m-5 ${props.className}`}>
        {props.children}
    </div>
  )
}

export default Card
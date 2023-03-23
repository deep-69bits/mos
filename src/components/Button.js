import React from "react";

function Button(props) {
  return (
    <button
      type={props.type}
      className={`max-w-[90%] hover:bg-white hover:text-black transition-all py-2 bg-black backdrop-blur-2xl bg-opacity-30 border-[1px] rounded-xl ${
        props.className
      } ${props.white ? `bg-white text-black` : "bg-[#4b70e2] text-[#f9f9f9]"}`}
      onClick={props.onClick}>
      {props.image && (
        <img src={props.image} alt="button" className="h-[50px] w-[50px] p-3" />
      )}
      <p
        className={`m-auto pr-[50px] font-light text-sm  ${
          !props.image ? "pl-[50px]" : "pl-[20px]"
        }`}>
        {props.children}
      </p>
    </button>
  );
}

export default Button;

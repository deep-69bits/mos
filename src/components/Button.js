import React from "react";

function Button(props) {
  return (
    <button
      type={props.type}
      className={`cursor-pointer max-w-[90%] flex gap py-[10px] h-[50px] rounded-[25px] items-center hover:bg-transparent hover:border-white hover:border-2 transition-all text-xl ${
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

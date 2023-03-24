import React from "react";
import Button from "./Button";

function MemberCard() {
  return (
    <div className="flex flex-col rounded-md shadow-md justify-evenly h-[20%] lg:w-[45%] w-[90%] overflow-hidden my-10 border text-center p-5">
      <img
        src="https://images.unsplash.com/photo-1602866813929-6bc4933c7013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhbXBsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        alt=""
        className="mx-auto h-[200px] w-[90%] object-cover rounded-md shadow-lg"
      />
      <h1 className="mt-5 text-3xl font-bold">Sample Name</h1>
      <h1 className="mt-3 text-lg text-gray-500">Sample Designation</h1>
      <p className="mt-2 mx-2 font-light text-sm">
        Two lines about how christ is the saviour and should be prayed to with
        all your dedication and truthfulness.
      </p>
      <div className="mt-3 flex w-full justify-evenly">
          <Button>Edit</Button>
          <Button>Delete</Button>
      </div>
    </div>
  );
}

export default MemberCard;

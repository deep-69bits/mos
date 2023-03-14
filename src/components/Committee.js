import React from "react";
import Navbar from "./Navbar";
import MemberCard from "./MemberCard";
import Button from "./Button";

const Commitie = () => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="flex flex-wrap gap-3 justify-evenly">
        <MemberCard></MemberCard>
        <MemberCard></MemberCard>
        <MemberCard></MemberCard>
        <MemberCard></MemberCard>
      </div>
      <Button href="" className='my-3 mx-auto'>Add Committee Member</Button>
    </div>
  );
};

export default Commitie;

import React from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import Button from "./Button";

const Commitie = () => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="flex flex-wrap gap-3 justify-evenly">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      <Button href="" className='my-3 mx-auto'>Add Commitie Member</Button>
    </div>
  );
};

export default Commitie;

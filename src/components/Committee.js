import React from "react";
import Navbar from "./Navbar";
import MemberCard from "./MemberCard";
import Button from "./Button";
import { getAuth, signOut } from "firebase/auth";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import { Link, useNavigate } from "react-router-dom";

const Committee = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const signout = () => {
    signOut(auth);
    navigate("/");
  };
  const items = [
    <SidebarItem>
      <Link to={"/"}>Dashboard</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link to={"/events"}>Events</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link to={"/committeemembers"}>Committee Member</Link>
    </SidebarItem>,
    <SidebarItem>
      <Link to={"/hadid"}>Hadid</Link>
    </SidebarItem>,
    <SidebarItem>
      <button onClick={signout}>logout</button>
    </SidebarItem>,
  ];
  return (
    <div className="min-h-screen bg-[#02062a]">
      <Sidebar content={items} background="#000000" backdrop={true}>
        <div className="flex flex-wrap gap-3 justify-evenly">
          <MemberCard></MemberCard>
          <MemberCard></MemberCard>
          <MemberCard></MemberCard>
          <MemberCard></MemberCard>
        </div>
        <Button href="" className="mx-auto mb-3">
          Add Committee Member
        </Button>
      </Sidebar>
    </div>
  );
};

export default Committee;

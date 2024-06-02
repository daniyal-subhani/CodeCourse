"use client";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Navbar() {
  return (
    <nav className="flex  items-center pt-6 p-2 mb-8 px-12">
      <span className="mx-3 pr-6 text-blue-600">
      <AccountCircleIcon style={{ width: '50px', height: '50px' }} />
      </span>
      <div className="flex flex-1 justify-between items-center ">
        <ul className="flex gap-6">
          <NavLink className="px-1" to="/">Home</NavLink>
          <NavLink className="px-1" to="">Library</NavLink>
          <NavLink className="px-1" to="">Subjects</NavLink>
        </ul>
        <ul className="flex gap-5">
          <NavLink className="p-2" to="">Sign in</NavLink>
          <NavLink className="bg-blue-500 p-2 cursor-pointer rounded-md text-white" to="">JoinPro</NavLink>
        </ul>
      </div>
    </nav>
  );
}

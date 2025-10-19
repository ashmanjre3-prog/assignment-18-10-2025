import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";

const Navbar = ({ options, onSelect, companyIndex }) => {
  return (
    <>
      <div className="navbar bg-white flex justify-between px-4 space-x-2 h-[68px] shadow-md">
        {options ? (
          <div className="flex items-center justify-center text-[#272643] font-semibold">
            <img src="/companyBranch.png" alt="" className="w-4" />
            <select
              className="cursor-pointer pr-1 flex text-sm"
              value={companyIndex}
              onChange={(e) => {
                onSelect(e.target.value);
              }}
            >
              {options.map((company, i) => (
                <option key={i} value={i}>
                  {company?.companyName}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex justify-end gap-4">
          <IoIosChatbubbles size={40} className="text-[#272643]" />
          <IoIosNotifications size={40} className="text-[#272643]" />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn border-black rounded-xl my-1 flex justify-evenly"
            >
              English
              <FaAngleDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 rounded-box z-1 w-24 p-2"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

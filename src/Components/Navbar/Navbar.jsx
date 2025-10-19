import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";

import FolderSharedIcon from "@mui/icons-material/FolderShared";

const Navbar = ({ options, onSelect, companyIndex }) => {
  return (
    <>
      <div className="navbar bg-white flex justify-between px-4 space-x-2 h-[68px] shadow-md">
        <div className="flex items-center gap-3 mb-6 p-1.5 m-2">
          {/* Icon */}
          <div className="bg-[#007B7F] p-3 rounded-lg flex items-center pt-1.5 justify-center">
            <FolderSharedIcon />
          </div>

          {/* Text Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Directory</h1>
            <p className="text-gray-500 text-sm">
              Manage and view all user profiles
            </p>
          </div>
        </div>

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

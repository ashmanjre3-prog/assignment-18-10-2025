import React from "react";

import { useEffect, useRef, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import { NavLink } from "react-router-dom";
import Toast from "./Toast/Toast";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaAngleUp } from "react-icons/fa";
import Navbar from "./Navbar/Navbar";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/userSlices/listAllUsers";

const master = [
  { label: "Company Master", path: "/companyMaster" },
  { label: "Customer Master", path: "/customerMaster" },
  { label: "Employee Master", path: "/employeeMaster" },
  { label: "Vehicle Master", path: "/vehicleMaster" },
  { label: "Spare Parts Master", path: "/sparePartsMaster" },
  { label: "Accessories Master", path: "/accessoriesMaster" },
  { label: "Service Master", path: "/serviceMaster" },
  { label: "Branch Master", path: "/branchMaster" },
  { label: "Insurance", path: "/insurance" },
  { label: "Vehicle Transit", path: "/vehicleTransit" },
  { label: "Spare Part Transit", path: "/sparePartTransit" },
  { label: "Tax Master", path: "/taxMaster" },
  { label: "Tenant Master", path: "/TenantMaster" },
];

const subscriptionManagement = [
  { label: "Invoices", path: "/invoices" },
  { label: "Subscription", path: "/subscriptionList" },
];

const Dashboard = () => {
  const [listUsers, setListUsers] = useState([]); // full list
  const [list, setList] = useState([]); // filtered/displayed list
  const [searchInput, setSearchInput] = useState("");

  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { list: reduxList, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]); // only run once on mount

  useEffect(() => {
    setListUsers(reduxList);
    setList(reduxList); // initially display full list
  }, [reduxList]);

  const handleSearch = (searchInput) => {
    console.log(searchInput, "***********");

    if (!searchInput.trim()) {
      setList(listUsers);
      return;
    }

    const filteredList = listUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase())
    );

    console.log(filteredList, "41524");

    setList(filteredList);
  };

  useEffect(() => {
    handleSearch(searchInput);
  }, [searchInput, listUsers]);

  //Pagination function
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= listUsers.length / 12 &&
      selectedPage !== page
    );
    setPage(selectedPage);
  };

  const [uniqueCompanyName, setUniqueCompanyName] = useState([]);

  useEffect(() => {
    const uniquelist = [...new Set(listUsers.map((each) => each.company.name))];
    setUniqueCompanyName(uniquelist);
  }, [listUsers]);

  const handleDropdown = (e) => {
    console.log(e.target.value, "++++++++++++");
    const selection = e.target.value;
    if (selection.trim() !== "") {
      const filteredList = listUsers.filter(
        (user) => user.company.name === selection
      );

      console.log(filteredList, "41524");

      setList(filteredList);
    } else {
      setList(reduxList);
    }
  };

  return (
    <>
      <div className="min-h-screen heading-font select-none">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content bg-base-300 min-h-screen w-full">
            {/* Tenant List Content here */}
            <label
              htmlFor="my-drawer-2"
              className="absolute top-0 left-0 py-5 px-4 drawer-button lg:hidden "
            >
              <div className="w-8 flex flex-col space-y-2">
                <hr /> <hr /> <hr />
              </div>
            </label>
            {toast && <Toast message={toast} />}

            {/* Navbar */}
            <Navbar />

            <div className="m-3 py-1 bg-white rounded-lg">
              <div className="flex flex-col md:flex-row justify-between px-4 pt-2">
                <h1 className="text-[#272643] mb-3 md:mb-0 text-lg md:text-xl pt-2 font-bold">
                  Dashboard
                  <span className="text-[#ABABAB]"> / Users</span>{" "}
                </h1>

                <div className="flex flex-col space-y-4 items-end md:flex-row md:space-x-2 md:space-y-0 md:items-center  relative">
                  {/* Input with search icon */}
                  <label className="input input-md w-70">
                    <input
                      type="text"
                      placeholder="Search for user name and email"
                      className=""
                      onChange={(e) => setSearchInput(e.target.value)}
                      value={searchInput}
                    />
                    <IoMdSearch className="cursor-pointer text-gray-400" />
                  </label>

                  {/*  company name dropdown */}
                  <select
                    onChange={handleDropdown}
                    className="bg-black p-2 rounded-sm"
                  >
                    <option value="">Filter By Company Name</option>
                    {uniqueCompanyName.map((each, index) => (
                      <option key={index} value={each}>
                        {each}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* New Table */}
              <div className="p-4">
                <div className="overflow-x-auto shadow-md border-[#AFC9F5] border-2">
                  <table className="min-w-full divide-y divide-gray-200 border-[#AFC9F5]">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs text-[#2C3E50] font-bold bg-[#AFC9F5] tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs text-[#2C3E50] font-bold bg-[#AFC9F5] tracking-wider">
                          Email
                          <button className="cursor-pointer">
                            <img
                              src="/sort.png"
                              className="w-3.5 mx-2"
                              alt=""
                            />
                          </button>
                        </th>
                        <th className="px-4 py-2 text-left text-xs text-[#2C3E50] font-bold bg-[#AFC9F5] tracking-wider">
                          Company Name
                          <button className="cursor-pointer">
                            <img
                              src="/sort.png"
                              className="w-3.5 mx-2"
                              alt=""
                            />
                          </button>
                        </th>

                        <th className="px-4 py-2 text-left text-xs text-[#2C3E50] font-bold bg-[#AFC9F5] tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {list
                        .slice(page * 12 - 12, page * 12)
                        .map((user, index) => (
                          <tr
                            key={index}
                            className="hover:bg-[#D3D3D3] hover:text-[#667085] cursor-pointer"
                          >
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-[#101828] hover:text-[#667085] border border-gray-200">
                              {user?.name}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap flex gap-3 text-sm text-[#101828] hover:text-[#667085] border border-gray-200">
                              <img
                                src="/companylogoEg.png"
                                alt=""
                                className="w-6"
                              />
                              <span>{user?.email}</span>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-[#101828] hover:text-[#667085] border border-gray-200">
                              {user?.company?.name}
                            </td>

                            <td className="px-4 py-2 whitespace-nowrap text-sm text-[#101828] flex gap-2">
                              {/*  Update button */}
                              <button
                                className="text-[#615E83] cursor-pointer"
                                onClick={() => {}}
                              >
                                <GoPencil />
                              </button>

                              {/* Delete button */}
                              <button
                                className="text-[#EB4335] cursor-pointer"
                                onClick={() => {}}
                              >
                                <RiDeleteBin5Line />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {listUsers.length > 0 && (
              <div className="join absolute right-0 bottom-4 gap-2 px-10">
                <button
                  className={`join-item btn btn-sm text-white bg-blue-300 hover:bg-blue-400 ${
                    page > 1 ? `` : `btn-disabled`
                  }`}
                  onClick={() => selectPageHandler(page - 1)}
                >
                  <IoIosArrowBack />
                </button>
                {Array.from(
                  {
                    length:
                      Math.trunc(listUsers.length / 12) +
                      (listUsers.length % 12 === 0 ? 0 : 1),
                  },
                  (_, i) => {
                    return (
                      <button
                        onClick={() => selectPageHandler(i + 1)}
                        key={i}
                        className={`join-item btn btn-sm rounded-md ${
                          page === i + 1 ? `border border-black` : ``
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  }
                )}
                <button
                  className={`join-item btn btn-sm text-white bg-blue-300 hover:bg-blue-400 ${
                    page < listUsers.length / 12 ? `` : `btn-disabled`
                  }`}
                  onClick={() => selectPageHandler(page + 1)}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}
          </div>
          <div className="drawer-side bg-white shadow-lg">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu bg-base-200 text-base-content min-h-full w-[255px] p-4">
              {/* Sidebar content here */}
              <h1 className="text-center text-2xl logo-font">ASM</h1>
              <div className="mt-6 flex flex-col space-y-4">
                <h1 className="text-[#757575]">Dashboard</h1>
                <div className={`w-52 font-sans text-[#757575]`}>
                  <details open className="group">
                    <summary className="cursor-pointer flex justify-between items-center list-none group-open:text-[#272643] group-open:font-bold">
                      Masters
                      <span className="transform transition-transform group-open:rotate-180">
                        <FaAngleUp size={18} className="text-[#757575]" />
                      </span>
                    </summary>

                    <div className="flex flex-col ml-4 mt-3 space-y-4">
                      {master.map((item) => (
                        <NavLink
                          key={item.path}
                          className={({ isActive }) =>
                            `text-[#A3A0B0] ${
                              isActive
                                ? `bg-[#615E83] text-white px-2 rounded-full`
                                : ``
                            } px-2 rounded-full`
                          }
                          to={item.path}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </details>
                </div>
                <div className={`w-52 font-sans text-[#757575]`}>
                  <details closed="true" className="group">
                    <summary className="cursor-pointer flex justify-between items-center list-none group-open:text-[#272643] group-open:font-bold">
                      Subscription Management
                      <span className="transform transition-transform group-open:rotate-180">
                        <FaAngleUp size={18} className="text-[#757575]" />
                      </span>
                    </summary>

                    <div className="flex flex-col ml-4 mt-3 space-y-4">
                      {subscriptionManagement.map((item) => (
                        <NavLink
                          key={item.path}
                          className={({ isActive }) =>
                            `text-[#A3A0B0] ${
                              isActive
                                ? `bg-[#615E83] text-white px-2 rounded-full`
                                : ``
                            } px-2 rounded-full`
                          }
                          to={item.path}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from "react";

import { useEffect, useRef, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import Toast from "./Toast/Toast";
import { IoMdCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaAngleUp } from "react-icons/fa";
import Navbar from "./Navbar/Navbar";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/userSlices/listAllUsers";
import { Button, IconButton, Tooltip } from "@mui/material";

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

  const navigate = useNavigate();

  const handleNavigation = (id) => {
    console.log("id is:", id);

    navigate(`user/${id}`);
  };

  const loadingCard = () => (
    <Button
      loading
      loadingPosition="start"
      startIcon={<SearchIcon />}
      variant="outlined"
      sx={{ bgcolor: "white" }}
    >
      Save
    </Button>
  );

  const successCard = () => (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        marginTop: 2,
        padding: 5,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <Table aria-label="user list table">
        <TableHead
          sx={{
            backgroundColor: "#007B7F",
            "& th": {
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
            },
          }}
        >
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Company</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  backgroundColor: "rgba(0, 123, 127, 0.1)",
                  transition: "0.3s ease",
                },
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
              }}
            >
              <TableCell align="left" sx={{ fontWeight: 500 }}>
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.company.name}</TableCell>
              <TableCell align="center">
                <Tooltip title="View Profile">
                  <IconButton
                    onClick={() => handleNavigation(row.id)}
                    sx={{
                      color: "#007B7F",
                      "&:hover": {
                        backgroundColor: "rgba(0,123,127,0.1)",
                      },
                    }}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const errorCard = () => (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 border-2 border-red-500/30">
              <ErrorIcon className="h-12 w-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Error Card */}
        <Card className="border-0 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-b border-red-500/20 px-6 py-4">
            <h1 className="text-3xl font-bold text-foreground">Oops!</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Something went wrong
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Error Code */}
            <div className="text-center">
              <div className="inline-block px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/20 mb-4">
                <p className="text-sm font-mono text-red-600 font-semibold">
                  Error {errorCode}
                </p>
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {errorMessage}
              </h2>
            </div>

            {/* Error Details */}
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                We encountered an issue while trying to load the user details.
                This could be due to a temporary network issue or server
                problem. Please try again or return to the dashboard.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                >
                  <RefreshIcon className="h-4 w-4" />
                  Try Again
                </Button>
              )}
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="w-full gap-2"
              >
                <HomeIcon className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                If the problem persists, please contact support or try again
                later.
              </p>
            </div>
          </div>
        </Card>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="h-1 w-1 rounded-full bg-accent/30" />
          <div className="h-1 w-1 rounded-full bg-accent/50" />
          <div className="h-1 w-1 rounded-full bg-accent/30" />
        </div>
      </div>
    </main>
  );

  return (
    <>
      <div className="min-h-screen heading-font select-none">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content  min-h-screen w-full">
            {/* Navbar */}
            <Navbar />

            <div className="m-10 py-1 bg-white rounded-lg">
              <div className="flex flex-col md:flex-row justify-between px-4 pt-2">
                <h1 className="text-[#272643] mb-3 md:mb-0 text-lg md:text-xl pt-2 font-bold">
                  Dashboard
                  <span className="text-[#ABABAB]"> / Users</span>{" "}
                </h1>

                <div className="flex flex-col space-y-4 items-end md:flex-row md:space-x-2 md:space-y-0 md:items-center  relative">
                  {/* Input with search icon */}
                  <div className="bg-black p-3  min-w-[20vw] flex items-center justify-between gap-2 rounded-sm">
                    <input
                      type="text"
                      placeholder="Search by name and email...."
                      className="outline-none font-medium"
                      onChange={(e) => setSearchInput(e.target.value)}
                      value={searchInput}
                    />
                    <SearchIcon className="cursor-pointer text-gray-400" />
                  </div>

                  {/*  company name dropdown */}
                  <select
                    onChange={handleDropdown}
                    className="bg-gray-500  text-black font-medium p-3 rounded-sm"
                  >
                    <option value="">Filter By Company Name</option>
                    {uniqueCompanyName.map((each, index) => (
                      <option key={index} value={each}>
                        {each}
                      </option>
                    ))}
                  </select>

                  {loading ? loadingCard() : errorCard()}
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

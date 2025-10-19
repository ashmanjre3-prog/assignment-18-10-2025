import React from "react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar/Navbar";

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
import { Button, Card, IconButton, Tooltip } from "@mui/material";

const Dashboard = () => {
  const [listUsers, setListUsers] = useState([]);
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  const {
    list: reduxList,
    loading,
    error,
  } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setListUsers(reduxList);
    setList(reduxList);
  }, [reduxList]);

  const handleSearch = (searchInput) => {
    if (!searchInput.trim()) {
      setList(listUsers);
      return;
    }

    const filteredList = listUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase())
    );

    setList(filteredList);
  };

  const onRetry = () => {
    dispatch(fetchUsers());
  };

  useEffect(() => {
    handleSearch(searchInput);
  }, [searchInput, listUsers]);

  const [uniqueCompanyName, setUniqueCompanyName] = useState([]);

  useEffect(() => {
    const uniquelist = [...new Set(listUsers.map((each) => each.company.name))];
    setUniqueCompanyName(uniquelist);
  }, [listUsers]);

  const handleDropdown = (e) => {
    const selection = e.target.value;
    if (selection.trim() !== "") {
      const filteredList = listUsers.filter(
        (user) => user.company.name === selection
      );

      setList(filteredList);
    } else {
      setList(reduxList);
    }
  };

  const navigate = useNavigate();

  const handleNavigation = (id) => {
    navigate(`user/${id}`);
  };

  const loadingCard = () => (
    <div className="flex justify-center items-center my-4">
      <Button
        loading
        loadingPosition="start"
        disabled
        sx={{
          color: "black",
          borderColor: "black",
          textTransform: "none",
          "& .MuiCircularProgress-root": {
            color: "black", // spinner color
          },
          "&.Mui-disabled": {
            color: "black",
            borderColor: "black",
          },
        }}
      >
        Loading user table...
      </Button>
    </div>
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
    <main className="min-h-screen  m-15  rounded-2xl flex items-center justify-center px-4">
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
                  Error
                </p>
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {/* {errorMessage} */}
              </h2>
            </div>

            {/* Error Details */}
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                We encountered an issue while trying to load the users. This
                could be due to a temporary network issue or server problem.
                Please try again after Some time.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={onRetry}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
              >
                <RefreshIcon className="h-4 w-4" />
                Try Again
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

  const status = loading
    ? "loading"
    : error
    ? "error"
    : reduxList.length > 0
    ? "success"
    : "empty";

  const statusUI = {
    loading: loadingCard(),
    error: errorCard(),
    success: successCard(),
  };

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
                </div>
              </div>

              <div>{statusUI[status]}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

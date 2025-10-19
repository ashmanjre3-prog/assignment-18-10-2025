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

const statesList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const categoryList = ["Automobile"];

const Dashboard = () => {
  const [id, setId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [category, setCategory] = useState("");
  const [contactPersonOne, setContactPersonOne] = useState("");
  const [mobileOne, setMobileOne] = useState("");
  const [contactPersonTwo, setContactPersonTwo] = useState("");
  const [mobileTwo, setMobileTwo] = useState("");
  const [extraNote, setExtraNote] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");

  const [error, setError] = useState({});
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [deleteId, setDeleteId] = useState();

  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const openUpdateDailog = () => setIsUpdateDialogOpen(true);

  const [companyData, setCompanyData] = useState([
    {
      id: "#812378",
      companyName: "Apex Automotive **",
      mobileNumber: "9881563612",
      email: "apex1@example.com",
      gstNumber: "27AAPFU0939F1ZV",
      city: "Mumbai",
      state: "Maharashtra",
      pin: "400001",
      category: "Automobile",
      contactPerson1: "Raj Malhotra",
      mobileNo1: "+91 9876543210",
      contactPerson2: "Suman Verma",
      mobileNo2: "+91 9876501234",
      extraNote: "Preferred vendor for 2-wheeler parts.",
      addressLine1: "123 Industrial Area",
      addressLine2: "Near Eastern Flyover",
    },
    {
      id: "#812379",
      companyName: "John Auto Works",
      email: "john.auto@example.com",
      gstNumber: "29AAACJ4321L1ZB",
      city: "Pune",
      state: "Maharashtra",
      pin: "411001",
      category: "Automobile",
      contactPerson1: "John Dsouza",
      mobileNo1: "+91 9988776655",
      contactPerson2: "Neha John",
      mobileNo2: "+91 9988001122",
      extraNote: "Specializes in engine parts.",
      addressLine1: "45 MG Road",
      addressLine2: "Shivaji Nagar",
    },
    {
      id: "#812380",
      companyName: "Spark Motors",
      email: "spark.motors@example.com",
      gstNumber: "24ABACZ6789R1ZC",
      city: "Ahmedabad",
      state: "Gujarat",
      pin: "380015",
      category: "Automobile",
      contactPerson1: "Pooja Mehta",
      mobileNo1: "+91 9123456789",
      contactPerson2: "Karan Bhatt",
      mobileNo2: "+91 9876543120",
      extraNote: "Bulk supplier for tires.",
      addressLine1: "89 Motera Industrial Park",
      addressLine2: "Sector 2",
    },
    {
      id: "#812381",
      companyName: "Prime Vehicles",
      email: "prime.vehicles@example.com",
      gstNumber: "23AAGCU1234N1ZK",
      city: "Indore",
      state: "Madhya Pradesh",
      pin: "452001",
      category: "Automobile",
      contactPerson1: "Ankit Sinha",
      mobileNo1: "+91 9898989898",
      contactPerson2: "Reena Joshi",
      mobileNo2: "+91 9870012345",
      extraNote: "Deliveries delayed during monsoon.",
      addressLine1: "Plot No 14, Transport Nagar",
      addressLine2: "Opp. Railway Station",
    },
    {
      id: "#812382",
      companyName: "AutoGear Pvt Ltd",
      email: "autogear@example.com",
      gstNumber: "20ABCPP1234M1ZF",
      city: "Ranchi",
      state: "Jharkhand",
      pin: "834001",
      category: "Automobile",
      contactPerson1: "Vikash Yadav",
      mobileNo1: "+91 9012345678",
      contactPerson2: "Sneha Sharma",
      mobileNo2: "+91 9023456781",
      extraNote: "Priority orders allowed.",
      addressLine1: "Sector 9, Industrial Estate",
      addressLine2: "Near Tata Gate",
    },
  ]);

  //Validation Functions
  const validEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validphone = (mobileNo) => {
    const pattern = /^(?:\+91\s?|91\s?)?[6-9]\d{9}$/;
    return pattern.test(mobileNo);
  };

  const validString = (string) => {
    const pattern = /^(?!\s*$).+/;
    return pattern.test(string);
  };

  const validPincode = (pincode) => {
    const pattern = /^(?!\s*$)[1-9][0-9]{5}$/;
    return pattern.test(pincode);
  };

  //Drag Drop Image Functions
  const fileInputRef = useRef();
  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
    const newFilesArray = Array.from(e.target.files);
    console.log(newFilesArray);
    setFiles(newFilesArray);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(URL.createObjectURL(e.dataTransfer.files[0]));
    }
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    console.log(URL.createObjectURL(droppedFiles[0]));
  };
  const removeImage = () => {
    setImage(null);
    setFiles([]);
  };

  //Handle Toggle function
  const handleToggle = (value, id) => {
    const updated = companyData.map((company) =>
      company.id === id ? { ...company, toggle: value } : company
    );
    console.log(updated);
    setCompanyData(updated);
    // setNewCompanyData(updated);
    return;
  };

  // Add tenant function
  const onAdd = (e) => {
    e.preventDefault();

    if (!companyName) {
      setError({ companyName: true });
      return;
    }

    if (!category) {
      setError({ category: true });
      return;
    }

    if (!mobileNumber) {
      setError({ mobileNumber: true });
      return;
    }

    if (!addressLine1) {
      setError({ addressLine1: true });
      return;
    }

    if (!location) {
      setError({ location: true });
      return;
    }

    if (!state) {
      setError({ state: true });
      return;
    }

    if (!pin) {
      setError({ pin: true });
      return;
    }

    const data = {
      companyName,
      category,
      contactPersonOne,
      mobileOne,
      contactPersonTwo,
      mobileTwo,
      extraNote,
      addressLine1,
      addressLine2,
      email,
      gstNumber,
      location,
      state,
      pin,
      files,
    };

    console.log(data);
    setIsDialogOpen(false);
    setToast("Company added successfully.");
    setTimeout(() => {
      setToast("");
    }, 2000);
    setError([]);
    setCategory("");
    setMobileNumber("");
    setContactPersonOne("");
    setMobileOne("");
    setContactPersonTwo("");
    setMobileTwo("");
    setExtraNote("");
    setAddressLine1("");
    setAddressLine2("");

    setCompanyName("");
    setEmail("");
    setGstNumber("");
    setLocation("");
    setState("");
    setPin("");
    setFiles("");
    setImage("");
  };

  //Handling delete function
  const handleDelete = () => {
    console.log(deleteId);
    console.log(`Data deleted with ID:${deleteId}`);
    document.getElementById("my_modal_3").close();
    setToast("Company deleted successfully.");
    setTimeout(() => {
      setToast("");
    }, 2000);
    setDeleteId();
  };

  //Handling Update Button
  const handleUpdateModal = (company) => {
    setId(company.id);
    setCategory(company.category);
    setMobileNumber(company.mobileNumber);
    setContactPersonOne(company.contactPerson1);
    setMobileOne(company.mobileNo1);
    setContactPersonTwo(company.contactPerson2);
    setMobileTwo(company.mobileNo2);
    setExtraNote(company.extraNote);
    setAddressLine1(company.addressLine1);
    setAddressLine2(company.addressLine2);

    setCompanyName(company.companyName);
    setEmail(company.email);
    setLocation(company.city);
    setState(company.state);
    setPin(company.pin);
    setGstNumber(company.gstNumber);
    // document.getElementById("my_modal_2").showModal();
  };

  console.log(formErrors, "formErrors", error, "err");

  //Updating tenanat function
  const onUpdate = (e) => {
    e.preventDefault();
    if (!companyName) {
      setError({ companyName: true });
      return;
    }

    if (!category) {
      setError({ category: true });
      return;
    }

    if (!addressLine1) {
      setError({ addressLine1: true });
      return;
    }

    if (!Location) {
      setError({ location: true });
      return;
    }

    if (!state) {
      setError({ state: true });
      return;
    }

    if (!pin) {
      setError({ pin: true });
      return;
    }
    const data = {
      id,
      category,
      contactPersonOne,
      mobileOne,
      contactPersonTwo,
      mobileTwo,
      extraNote,
      addressLine1,
      addressLine2,
      companyName,
      email,
      gstNumber,
      location,
      state,
      pin,
    };

    console.log(data);

    setIsUpdateDialogOpen(false);

    // document.getElementById("my_modal_2").close();
    // document.getElementById("my_modal_3").close();
    setToast("Company updated successfully.");
    setTimeout(() => {
      setToast("");
    }, 2000);
    setError([]), setCategory("");
    setContactPersonOne("");
    setMobileTwo("");
    setContactPersonTwo("");
    setMobileOne("");
    setExtraNote("");
    setAddressLine1("");
    setAddressLine2("");

    setCompanyName(""),
      setEmail(""),
      setGstNumber(""),
      setLocation(""),
      setState(""),
      setPin(""),
      setFiles(""),
      setImage("");
  };

  //Pagination function
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= companyData.length / 12 &&
      selectedPage !== page
    );
    setPage(selectedPage);
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!companyName.trim()) newErrors.companyName = true;
      if (!category.trim()) newErrors.category = true;
    }

    if (step === 2) {
      if (!addressLine1.trim()) newErrors.addressLine1 = true;
      if (!addressLine2.trim()) newErrors.addressLine2 = true;
      if (!city.trim()) newErrors.city = true;
      if (!state.trim()) newErrors.state = true;
      if (!pin.trim()) newErrors.pin = true;
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchPincodeData = async (pin) => {
    try {
      const response = await axios.get("https://pinlookup.in/api/pincode", {
        params: { pincode: pin },
      });

      const { data } = response;

      const info = data.data;

      const { state_name, district_name, taluk } = info;

      console.log("Pincode Details:", state_name, district_name, taluk);

      // if (taluk && taluk.toLowerCase() !== "na") {
      //   setTehsil(taluk);
      // }

      // if (district_name && district_name.toLowerCase() !== "na") {
      //   setDistrict(district_name);
      // }

      if (state_name && state_name.toLowerCase() !== "na") {
        setState(state_name);
      }
    } catch (error) {
      console.error("Error fetching pincode details:", error.message);
    }
  };

  useEffect(() => {
    if (validPincode(pin)) {
      fetchPincodeData(pin);
    }
  }, [pin]);

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
                  Masters
                  <span className="text-[#ABABAB]"> / Company Master</span>{" "}
                </h1>

                <div className="flex flex-col space-y-4 items-end md:flex-row md:space-x-2 md:space-y-0 md:items-center  relative">
                  {/* Input with search icon */}
                  <label className="input input-md w-70">
                    <input
                      type="text"
                      placeholder="Search for company name, mobile etc."
                      className=""
                    />
                    <IoMdSearch className="cursor-pointer text-gray-400" />
                  </label>

                  {/* Button with form trigger */}
                  <div className="relative">
                    <button
                      className="bg-[#272643] text-white px-4 py-2 rounded-lg w-40 flex justify-center items-center space-x-2"
                      onClick={openDialog}
                    >
                      <span className="text-sm">Add Company</span>
                      <span className="font-bold text-lg">+</span>
                    </button>

                    {/* Add Employee form */}
                    {isDialogOpen && (
                      <div className="box-border w-[90vw] max-w-[100vw] absolute top-full right-0 flex flex-col place-items-center  mt-1 px-14 rounded-4xl z-50 sm:w-[400px] md:w-[450px]  md:max-w-[500px] shadow-lg bg-white p-4 mb-4">
                        {/* Downward triangle */}
                        <div className="absolute top-0 right-6 -translate-y-full">
                          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-l-[#615E83]"></div>
                        </div>
                        <form
                          className=" flex flex-col px-2 space-y-4"
                          onSubmit={onAdd}
                        >
                          <h1 className=" mb-5 s leading-[44px]  text-[28px] text-center text-[#272643] heading-font font-bold mt-1 px-2">
                            Add Company
                          </h1>

                          <div className="flex gap-4">
                            {/* Company name */}

                            <div className="flex flex-col relative w-45">
                              <input
                                type="text"
                                value={companyName}
                                onChange={(e) => {
                                  setCompanyName(e.target.value);
                                  validString(e.target.value)
                                    ? setError((prev) => ({
                                        ...prev,
                                        companyName: false,
                                      }))
                                    : setError((prev) => ({
                                        ...prev,
                                        companyName: true,
                                      }));
                                }}
                                placeholder="Company Name"
                                className={`
                                peer w-full h-12 pl-10 pr-3 rounded-lg bg-white text-sm 
                                focus:outline-none
                                ${
                                  error.companyName || formErrors.companyName
                                    ? "border border-[#EB4335]"
                                    : validString(companyName)
                                    ? "border border-green-400"
                                    : "border border-[#8D89AD]"
                                }
                              `}
                              />

                              <img
                                src="\Office (2).svg"
                                alt="company"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                              />

                              {/* Floating Label */}
                              <span
                                className={`
                                  absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                  transition-all duration-200 ease-out
                                  ${
                                    companyName || companyName.length > 0
                                      ? "opacity-100 scale-100 -translate-y-2"
                                      : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                  }
                                `}
                              >
                                Company Name
                              </span>

                              {/* Error Message */}
                              {(error.companyName ||
                                formErrors.companyName) && (
                                <span className="text-xs text-[#EB4335] mt-1">
                                  Company Name is required.
                                </span>
                              )}
                            </div>

                            {/* Category */}
                            <div className="flex flex-col relative w-45">
                              <select
                                value={category}
                                onChange={(e) => {
                                  setCategory(e.target.value);
                                  setError((prev) => ({
                                    ...prev,
                                    category: e.target.value === "",
                                  }));
                                }}
                                className={`
                                peer w-full h-12 pl-10 pr-3 rounded-lg bg-white text-sm
                                focus:outline-none
                                ${
                                  formErrors.category
                                    ? "border border-[#EB4335]"
                                    : category
                                    ? "border border-green-400"
                                    : "border border-[#8D89AD]"
                                }
                              `}
                              >
                                <option value="">Category</option>
                                {categoryList.map((cat) => (
                                  <option key={cat} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                              </select>

                              <span
                                className={`
                                        absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                        transition-all duration-200 ease-out
                                        ${
                                          category || category.length > 0
                                            ? "opacity-100 scale-100 -translate-y-2"
                                            : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                        }
                                      `}
                              >
                                {" "}
                                Category
                              </span>
                              {(formErrors.category || error.category) && (
                                <span className="text-xs text-[#EB4335] mt-1">
                                  Please select Category.
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-4">
                            {/* Email */}

                            <div className="flex flex-col relative w-45">
                              <input
                                type="text"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  validEmail(e.target.value)
                                    ? setError((prev) => ({
                                        ...prev,
                                        email: false,
                                      }))
                                    : setError((prev) => ({
                                        ...prev,
                                        email: true,
                                      }));
                                }}
                                placeholder="Email"
                                className={`
                                peer w-full h-12 pl-10 pr-3 rounded-lg bg-white text-sm 
                                focus:outline-none
                                ${
                                  error.email || formErrors.email
                                    ? "border border-[#EB4335]"
                                    : validEmail(email)
                                    ? "border border-green-400"
                                    : "border border-[#8D89AD]"
                                }
                              `}
                              />

                              <img
                                src="\Email.svg"
                                alt="mobile"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                              />

                              {/* Floating Label */}
                              <span
                                className={`
                                absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                transition-all duration-200 ease-out
                                ${
                                  email || email.length > 0
                                    ? "opacity-100 scale-100 -translate-y-2"
                                    : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                }
                              `}
                              >
                                Email
                              </span>

                              {/* Error Message */}
                              {(error.email || formErrors.email) && (
                                <span className="text-xs text-[#EB4335] mt-1">
                                  Enter a valid Email
                                </span>
                              )}
                            </div>

                            {/* mobile no. */}
                            <div className="flex flex-col relative w-45">
                              <input
                                type="text"
                                value={mobileNumber}
                                onChange={(e) => {
                                  setMobileNumber(e.target.value);
                                  validphone(e.target.value)
                                    ? setError((prev) => ({
                                        ...prev,
                                        mobileNumber: false,
                                      }))
                                    : setError((prev) => ({
                                        ...prev,
                                        mobileNumber: true,
                                      }));
                                }}
                                placeholder="Mobile Number"
                                className={`
                                peer w-full h-12 pl-10 pr-3 rounded-lg bg-white text-sm 
                                focus:outline-none
                                ${
                                  error.mobileNumber || formErrors.mobileNumber
                                    ? "border border-[#EB4335]"
                                    : validphone(mobileNumber)
                                    ? "border border-green-400"
                                    : "border border-[#8D89AD]"
                                }
                              `}
                              />

                              <img
                                src="\Phone (3).svg"
                                alt="mobile"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                              />

                              {/* Floating Label */}
                              <span
                                className={`
                                absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                transition-all duration-200 ease-out
                                ${
                                  mobileNumber || mobileNumber.length > 0
                                    ? "opacity-100 scale-100 -translate-y-2"
                                    : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                }
                              `}
                              >
                                Mobile Number
                              </span>

                              {/* Error Message */}
                              {(error.mobileNumber ||
                                formErrors.mobileNumber) && (
                                <span className="text-xs text-[#EB4335] mt-1">
                                  Enter a valid 10-digit mobile number
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-4">
                            {/* Contact Person One */}
                            <div className="flex flex-col relative w-30">
                              <input
                                type="text"
                                value={contactPersonOne}
                                onChange={(e) =>
                                  setContactPersonOne(e.target.value)
                                }
                                placeholder="Contact Person One"
                                className="peer w-full h-12 pl-10 pr-3 rounded-lg border border-[#8D89AD] bg-white text-sm focus:outline-none"
                              />
                              <img
                                src="\Person.svg"
                                alt="person"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                              />
                              <span
                                className={`
                                    absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                    transition-all duration-200 ease-out
                                    ${
                                      contactPersonOne ||
                                      contactPersonOne.length > 0
                                        ? "opacity-100 scale-100 -translate-y-2"
                                        : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                    }
                                  `}
                              >
                                Contact Person One
                              </span>
                            </div>

                            {/* Mobile No. (One) */}
                            <div className="flex flex-col relative w-30">
                              <input
                                type="text"
                                value={mobileOne}
                                onChange={(e) => {
                                  setMobileOne(e.target.value);
                                  validphone(e.target.value)
                                    ? setError((prev) => ({
                                        ...prev,
                                        mobileOne: false,
                                      }))
                                    : setError((prev) => ({
                                        ...prev,
                                        mobileOne: true,
                                      }));
                                }}
                                placeholder="Mobile Number One"
                                className={`
                                peer w-full h-12 pl-10 pr-3 rounded-lg bg-white text-sm 
                                focus:outline-none
                                ${
                                  error.mobileOne
                                    ? "border border-[#EB4335]"
                                    : validphone(mobileOne)
                                    ? "border border-green-400"
                                    : "border border-[#8D89AD]"
                                }
                              `}
                              />

                              <img
                                src="\Phone (3).svg"
                                alt="mobile"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                              />

                              {/* Floating Label */}
                              <span
                                className={`
                                absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                transition-all duration-200 ease-out
                                ${
                                  mobileOne || mobileOne.length > 0
                                    ? "opacity-100 scale-100 -translate-y-2"
                                    : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                }
                              `}
                              >
                                Mobile Number One
                              </span>

                              {/* Error Message */}
                              {error.mobileOne && (
                                <span className="text-xs text-[#EB4335] mt-1">
                                  Enter a valid 10-digit mobile number
                                </span>
                              )}
                            </div>

                            <button className="w-30" type="button">
                              +
                            </button>
                          </div>

                          <div className="flex gap-4">
                            {/* Contact Person Two */}
                            <div className="flex flex-col relative w-45">
                              <input
                                type="text"
                                value={contactPersonTwo}
                                onChange={(e) =>
                                  setContactPersonTwo(e.target.value)
                                }
                                placeholder="Contact Person Two"
                                className="peer w-full h-12 pl-10 pr-3 rounded-lg border border-[#8D89AD] bg-white text-sm focus:outline-none"
                              />
                              <img
                                src="\Person.svg"
                                alt="person"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                              />
                              <span
                                className={`
                                    absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                    transition-all duration-200 ease-out
                                    ${
                                      contactPersonTwo ||
                                      contactPersonTwo.length > 0
                                        ? "opacity-100 scale-100 -translate-y-2"
                                        : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                    }
                                  `}
                              >
                                Contact Person Two
                              </span>
                            </div>

                            {/* Mobile No. (TWO) */}

                            <div className="flex flex-col relative w-45">
                              <input
                                type="text"
                                value={mobileTwo}
                                onChange={(e) => {
                                  setMobileTwo(e.target.value);
                                  validphone(e.target.value)
                                    ? setError((prev) => ({
                                        ...prev,
                                        mobileTwo: false,
                                      }))
                                    : setError((prev) => ({
                                        ...prev,
                                        mobileTwo: true,
                                      }));
                                }}
                                placeholder="Mobile Number Two"
                                className={`
                                peer w-full h-12 pl-10 pr-3 rounded-lg bg-white text-sm 
                                focus:outline-none
                                ${
                                  error.mobileTwo
                                    ? "border border-[#EB4335]"
                                    : validphone(mobileTwo)
                                    ? "border border-green-400"
                                    : "border border-[#8D89AD]"
                                }
                              `}
                              />

                              <img
                                src="\Phone (3).svg"
                                alt="mobile"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                              />

                              {/* Floating Label */}
                              <span
                                className={`
                                absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                transition-all duration-200 ease-out
                                ${
                                  mobileTwo || mobileTwo.length > 0
                                    ? "opacity-100 scale-100 -translate-y-2"
                                    : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                }
                              `}
                              >
                                Mobile Number Two
                              </span>

                              {/* Error Message */}
                              {error.mobileTwo && (
                                <span className="text-xs text-[#EB4335] mt-1">
                                  Enter a valid 10-digit mobile number
                                </span>
                              )}
                            </div>
                          </div>

                          {/* ************ */}

                          <div className="flex gap-4">
                            {/* GST No. */}
                            <div className="flex flex-col relative w-45">
                              <input
                                type="text"
                                value={gstNumber}
                                onChange={(e) => setGstNumber(e.target.value)}
                                placeholder="GST No."
                                className="peer w-full h-12 pl-10 pr-3 rounded-lg border border-[#8D89AD] bg-white text-sm focus:outline-none"
                              />
                              <img
                                src="\Binary Code.svg"
                                alt="gst"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                              />
                              <span
                                className={`
                                  absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                  transition-all duration-200 ease-out
                                  ${
                                    gstNumber || gstNumber.length > 0
                                      ? "opacity-100 scale-100 -translate-y-2"
                                      : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                  }
                                `}
                              >
                                GST No.
                              </span>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col relative w-45">
                              <input
                                type="text"
                                value={location}
                                onChange={(e) => {
                                  setLocation(e.target.value);
                                  validString(e.target.value)
                                    ? setError((prev) => ({
                                        ...prev,
                                        location: false,
                                      }))
                                    : setError((prev) => ({
                                        ...prev,
                                        location: true,
                                      }));
                                }}
                                placeholder="Location"
                                className={`peer w-full h-12 pl-10 pr-3 rounded-lg bg-white text-sm focus:outline-none
                                ${
                                  error.location || formErrors.location
                                    ? "border border-[#EB4335]"
                                    : validString(location)
                                    ? "border border-green-400"
                                    : "border border-[#8D89AD]"
                                }`}
                              />

                              <img
                                src="\addresline.svg"
                                alt="address"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                              />

                              <span
                                className={`
                                    absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                    transition-all duration-200 ease-out
                                    ${
                                      location || location.length > 0
                                        ? "opacity-100 scale-100 -translate-y-2"
                                        : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                    }
                                  `}
                              >
                                Location
                              </span>
                              {(error.location || formErrors.location) && (
                                <span className="text-xs text-[#EB4335] mt-1">
                                  Location is required.
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Address Line 1 */}
                          <div className="flex flex-col relative w-94 mb-4">
                            <input
                              type="text"
                              value={addressLine1}
                              onChange={(e) => {
                                setAddressLine1(e.target.value);
                                validString(e.target.value)
                                  ? setError((prev) => ({
                                      ...prev,
                                      addressLine1: false,
                                    }))
                                  : setError((prev) => ({
                                      ...prev,
                                      addressLine1: true,
                                    }));
                              }}
                              placeholder="Address Line 1"
                              className={`peer w-full h-12 pl-10 pr-3 rounded-lg bg-white text-sm focus:outline-none
                                ${
                                  error.addressLine1 || formErrors.addressLine1
                                    ? "border border-[#EB4335]"
                                    : validString(addressLine1)
                                    ? "border border-green-400"
                                    : "border border-[#8D89AD]"
                                }`}
                            />

                            <img
                              src="\addresline.svg"
                              alt="address"
                              className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                            />

                            <span
                              className={`
                                    absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                    transition-all duration-200 ease-out
                                    ${
                                      addressLine1 || addressLine1.length > 0
                                        ? "opacity-100 scale-100 -translate-y-2"
                                        : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                    }
                                  `}
                            >
                              Address Line 1
                            </span>
                            {(error.addressLine1 ||
                              formErrors.addressLine1) && (
                              <span className="text-xs text-[#EB4335] mt-1">
                                Address is required.
                              </span>
                            )}
                          </div>

                          {/* Address Line 2 */}
                          <div className="flex flex-col relative w-94 mb-4">
                            <input
                              type="text"
                              value={addressLine2}
                              onChange={(e) => {
                                setAddressLine2(e.target.value);
                              }}
                              placeholder="Address Line 2"
                              className="peer w-full h-12 pl-10 pr-3 rounded-lg border border-[#8D89AD] bg-white text-sm focus:outline-none"
                            />

                            <img
                              src="\addresline.svg"
                              alt="address"
                              className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                            />

                            <span
                              className={`
                                      absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                      transition-all duration-200 ease-out
                                      ${
                                        addressLine2 || addressLine2.length > 0
                                          ? "opacity-100 scale-100 -translate-y-2"
                                          : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                      }
                                    `}
                            >
                              Address Line 2
                            </span>
                          </div>

                          <div className="flex gap-2">
                            {/* state */}
                            <div className="flex flex-col relative w-30 mb-4">
                              <select
                                value={state}
                                onChange={(e) => {
                                  setState(e.target.value);
                                  setError((prev) => ({
                                    ...prev,
                                    state: e.target.value === "",
                                  }));
                                }}
                                className={`
                                peer w-full h-12 pl-10 pr-3 rounded-lg bg-white text-sm
                                focus:outline-none
                                ${
                                  formErrors.state
                                    ? "border border-[#EB4335]"
                                    : state
                                    ? "border border-green-400"
                                    : "border border-[#8D89AD]"
                                }
                              `}
                              >
                                <option value="">State</option>
                                {statesList.map((uid) => (
                                  <option key={uid} value={uid}>
                                    {uid}
                                  </option>
                                ))}
                              </select>

                              <img
                                src="\state.svg"
                                alt="state"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                              />
                              <span
                                className={`
                                          absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                          transition-all duration-200 ease-out
                                          ${
                                            state || state.length > 0
                                              ? "opacity-100 scale-100 -translate-y-2"
                                              : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                          }
                                        `}
                              >
                                {" "}
                                State
                              </span>
                              {(formErrors.state || error.state) && (
                                <span className="text-xs text-[#EB4335] mt-1">
                                  Please select State
                                </span>
                              )}
                            </div>

                            {/* Pincode */}
                            <div className="flex flex-col relative w-30 mb-4">
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="\d{6}"
                                maxLength={6}
                                placeholder="Pincode"
                                value={pin}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setPin(val);
                                  if (validPincode(val)) {
                                    setError((prev) => ({
                                      ...prev,
                                      pin: false,
                                    }));
                                    // Optional: auto-fetch location here
                                  } else {
                                    setError((prev) => ({
                                      ...prev,
                                      pin: true,
                                    }));
                                  }
                                }}
                                className={`peer w-full h-12 pl-10 pr-3 rounded-lg border ${
                                  error.pin || formErrors.pin
                                    ? "border-[#EB4335]"
                                    : validPincode(pin)
                                    ? "border-green-400"
                                    : "border-[#8D89AD]"
                                } bg-white text-sm focus:outline-none`}
                              />

                              <img
                                src="\Postal.svg"
                                alt="pincode"
                                className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                              />

                              <span
                                className={`
                                    absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                    transition-all duration-200 ease-out
                                    ${
                                      pin || pin.length > 0
                                        ? "opacity-100 scale-100 -translate-y-2"
                                        : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                    }
                                  `}
                              >
                                Pincode
                              </span>
                              {(error.pin || formErrors.pin) && (
                                <span className="text-xs text-[#EB4335] mt-1">
                                  Enter a valid 6 digit pincode.
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col relative w-30 mb-4">
                              {/* Upload Field */}
                              <div
                                className="peer w-full h-12 px-3 border border-[#8D89AD] rounded-lg bg-white flex items-center justify-between cursor-pointer"
                                onClick={handleCustomButtonClick}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDrop(e)}
                              >
                                {image ? (
                                  <div className="relative w-full h-12 flex items-center justify-center">
                                    {/* Close Icon at Top-Right */}
                                    <button
                                      onClick={removeImage}
                                      className="absolute top-1 right-1"
                                    >
                                      <RxCross2
                                        size={14}
                                        className="text-gray-400 cursor-pointer"
                                      />
                                    </button>

                                    {/* Centered Image */}
                                    <img
                                      src={image}
                                      alt="Logo"
                                      className="w-10 h-10 rounded-sm"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 w-full">
                                    <img
                                      src="/Upload.svg"
                                      alt="upload"
                                      className="w-5 h-5 text-gray-500"
                                    />
                                    <span className="text-sm text-gray-500">
                                      Logo
                                    </span>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  id="files"
                                  name="files"
                                  accept=".jpg, .jpeg, .png"
                                  className="hidden"
                                  multiple
                                  ref={fileInputRef}
                                  onChange={handleFileChange}
                                />
                              </div>

                              {/* Floating Label */}
                              <span
                                className={`
                                absolute left-4 top-[-0.4rem] z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                transition-all duration-200 ease-out
                                ${
                                  image || files.length > 0
                                    ? "opacity-100 scale-100 -translate-y-2"
                                    : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                }
                              `}
                              >
                                Logo
                              </span>
                            </div>
                          </div>

                          {/* Extra Note */}
                          <div className="flex flex-col relative w-94 mb-4">
                            <textarea
                              rows={4}
                              value={extraNote}
                              onChange={(e) => setExtraNote(e.target.value)}
                              placeholder="Extra Note"
                              className="peer w-full pl-10 pr-3 pt-3 rounded-lg border border-[#8D89AD] bg-white text-sm focus:outline-none resize-none"
                            />

                            <span
                              className={`
                              absolute left-4 z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                              transition-all duration-200 ease-out
                              ${
                                extraNote && extraNote.length > 0
                                  ? "opacity-100 scale-100 -translate-y-2"
                                  : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                              }
                            `}
                            >
                              Extra Note
                            </span>
                          </div>
                          {/* Add Button */}
                          <button
                            type="submit"
                            className={
                              error.pin ||
                              error.state ||
                              error.mobileNumber ||
                              error.companyName ||
                              error.addressLine1 ||
                              error.category ||
                              error.location
                                ? `btn rounded-lg error-linear-gradient bg-[#EB4335] text-white w-94 h-[40px]`
                                : `btn rounded-lg  ${
                                    pin &&
                                    category &&
                                    mobileNumber &&
                                    addressLine1 &&
                                    state &&
                                    location &&
                                    companyName
                                      ? `bg-[#359F51] success-linear-gradient`
                                      : `bg-[#272643] btn-linear-gradient`
                                  } text-white w-94 h-[40px] mb-3`
                            }
                          >
                            Add
                          </button>
                        </form>

                        <form method="dialog">
                          <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold m-4 cursor-pointer"
                            onClick={() => {
                              setError([]),
                                setCompanyName(""),
                                setMobileNumber(""),
                                setContactPersonOne("");
                              setCategory("");
                              setMobileOne("");
                              setContactPersonTwo("");
                              setMobileTwo("");
                              setExtraNote("");
                              setAddressLine1("");
                              setAddressLine2("");
                              setEmail(""),
                                setGstNumber(""),
                                setLocation(""),
                                setState(""),
                                setPin(""),
                                setImage(null),
                                setFiles([]);
                              setIsDialogOpen(false); // ⬅️ Hide the popup
                            }}
                          >
                            &times;
                          </button>
                        </form>
                      </div>
                    )}
                  </div>

                  <FiDownload
                    size={24}
                    className="my-2 text-gray-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* New Table */}
              <div className="p-4">
                <div className="overflow-x-auto shadow-md border-[#AFC9F5] border-2">
                  <table className="min-w-full divide-y divide-gray-200 border-[#AFC9F5]">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs text-[#2C3E50] font-bold bg-[#AFC9F5] tracking-wider">
                          Company ID
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
                          Category
                          <button className="cursor-pointer">
                            <img
                              src="/sort.png"
                              className="w-3.5 mx-2"
                              alt=""
                            />
                          </button>
                        </th>

                        <th className="px-4 py-2 text-left text-xs text-[#2C3E50] font-bold bg-[#AFC9F5] tracking-wider">
                          Mobile Number
                        </th>
                        <th className="px-4 py-2 text-left text-xs text-[#2C3E50] font-bold bg-[#AFC9F5] tracking-wider">
                          Company Address
                        </th>
                        <th className="px-4 py-2 text-left text-xs text-[#2C3E50] font-bold bg-[#AFC9F5] tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {companyData
                        .slice(page * 12 - 12, page * 12)
                        .map((company, index) => (
                          <tr
                            key={index}
                            className="hover:bg-[#D3D3D3] hover:text-[#667085] cursor-pointer"
                          >
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-[#101828] hover:text-[#667085] border border-gray-200">
                              {company.id}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap flex gap-3 text-sm text-[#101828] hover:text-[#667085] border border-gray-200">
                              <img
                                src="/companylogoEg.png"
                                alt=""
                                className="w-6"
                              />
                              <span>{company.companyName}</span>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-[#101828] hover:text-[#667085] border border-gray-200">
                              {company.category}
                            </td>

                            <td className="px-4 py-2 whitespace-nowrap text-sm text-[#101828] hover:text-[#667085] border border-gray-200">
                              {company.mobileNo1}
                            </td>

                            <td className="px-4 py-2 whitespace-nowrap text-sm text-[#101828] hover:text-[#667085] border border-gray-200">
                              {company.addressLine1}
                            </td>

                            <td className="px-4 py-2 whitespace-nowrap text-sm text-[#101828] flex gap-2">
                              {/*  Update button */}
                              <button
                                className="text-[#615E83] cursor-pointer"
                                onClick={() => {
                                  setStep(1);
                                  handleUpdateModal(company);
                                  openUpdateDailog();
                                }}
                              >
                                <GoPencil />
                              </button>

                              {/* Delete button */}
                              <button
                                className="text-[#EB4335] cursor-pointer"
                                onClick={() => {
                                  document
                                    .getElementById("my_modal_3")
                                    .showModal(),
                                    setDeleteId(company.id);
                                }}
                              >
                                <RiDeleteBin5Line />
                              </button>

                              {/* Delete Modal */}
                              <dialog
                                id="my_modal_3"
                                className="fixed top-50 left-2/5 rounded-4xl"
                              >
                                <div className="w-[340px] h-[300px] bg-white rounded-4xl shadow-lg px-6 flex flex-col items-center py-10">
                                  <RiDeleteBin5Line
                                    size={80}
                                    className="text-[#EB4335]"
                                  />
                                  <h1 className="mt-4 text-lg text-wrap text-center w-48 font-light">
                                    Are you sure you want to delete this
                                    company?
                                  </h1>
                                  <div className="mt-4 space-x-6">
                                    <button
                                      className="btn px-6 border-[#272643] text-[#272643]"
                                      onClick={() => {
                                        document
                                          .getElementById("my_modal_3")
                                          .close(),
                                          setDeleteId();
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="btn px-10 hover:bg-[#272643] bg-[#6E6B8D] text-white"
                                      onClick={handleDelete}
                                    >
                                      Yes
                                    </button>
                                  </div>
                                </div>
                              </dialog>

                              {/* Update company details */}
                              {isUpdateDialogOpen && (
                                <div className="box-border md:top-38 top-75  w-[90vw] max-w-[100vw] absolute right-10 flex flex-col place-items-center  mt-1 px-14 rounded-4xl z-50 sm:w-[400px] md:w-[450px]  md:max-w-[500px] shadow-lg bg-white p-4 mb-4">
                                  <form
                                    className=" flex flex-col px-2  space-y-4 "
                                    onSubmit={onUpdate}
                                  >
                                    <h1 className=" mb-5 s leading-[44px]  text-[28px] text-center text-[#272643] heading-font font-bold mt-1 px-2">
                                      Update Company
                                    </h1>
                                    <div className="flex gap-4">
                                      {/* Company Name */}
                                      <div className="flex flex-col relative w-45">
                                        {/* Floating label as pill */}
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          Company Name
                                        </span>

                                        <div
                                          className={`flex items-center h-12 rounded-lg px-3 pl-10 bg-white text-sm
                                          ${
                                            error.companyName ||
                                            formErrors.companyName
                                              ? "border-1 border-[#EB4335]"
                                              : validString(companyName)
                                              ? "border-1 border-green-400"
                                              : "border-1 border-[#8D89AD]"
                                          }`}
                                        >
                                          <img
                                            src="\Office (2).svg"
                                            alt="company"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                                          />

                                          {/* Input */}
                                          <input
                                            type="text"
                                            value={companyName}
                                            onChange={(e) => {
                                              setCompanyName(e.target.value);
                                              validString(e.target.value)
                                                ? setError((prev) => ({
                                                    ...prev,
                                                    companyName: false,
                                                  }))
                                                : setError((prev) => ({
                                                    ...prev,
                                                    companyName: true,
                                                  }));
                                            }}
                                            placeholder="Company Name"
                                            className="w-full h-full bg-transparent focus:outline-none"
                                          />
                                        </div>

                                        {/* Error Message */}
                                        {(error.companyName ||
                                          formErrors.companyName ||
                                          companyName === "") && (
                                          <span className="text-xs text-[#EB4335] mt-1">
                                            Company Name is required.
                                          </span>
                                        )}
                                      </div>

                                      {/* Category */}
                                      <div className="flex flex-col relative w-45">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          Category
                                        </span>

                                        <div
                                          className={`flex items-center h-12 rounded-lg px-3 pl-10 bg-white text-sm
                                              ${
                                                formErrors.category
                                                  ? "border-1 border-[#EB4335]"
                                                  : category
                                                  ? "border-1 border-green-400"
                                                  : "border-1 border-[#8D89AD]"
                                              }`}
                                        >
                                          <select
                                            value={category}
                                            onChange={(e) =>
                                              setCategory(e.target.value)
                                            }
                                            className="w-full h-full bg-transparent outline-none"
                                          >
                                            <option value="">UID Type</option>
                                            {categoryList.map((uid) => (
                                              <option key={uid} value={uid}>
                                                {uid}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        {(formErrors.category ||
                                          category === "") && (
                                          <span className="text-xs text-[#EB4335] mt-1">
                                            Please select Category.
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex gap-4">
                                      {/* Email */}
                                      <div className="flex flex-col relative w-45">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          Email
                                        </span>

                                        <div
                                          className={`flex items-center h-12 rounded-lg px-3 pl-10 bg-white text-sm
                                          ${
                                            error.email || formErrors.email
                                              ? "border-1 border-[#EB4335]"
                                              : validEmail(email)
                                              ? "border-1 border-green-400"
                                              : "border-1 border-[#8D89AD]"
                                          }`}
                                        >
                                          <img
                                            src="\Email.svg"
                                            alt="email"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                                          />
                                          <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                              setEmail(e.target.value);
                                              validEmail(e.target.value)
                                                ? setError((prev) => ({
                                                    ...prev,
                                                    email: false,
                                                  }))
                                                : setError((prev) => ({
                                                    ...prev,
                                                    email: true,
                                                  }));
                                            }}
                                            placeholder="Email"
                                            className="w-full h-full bg-transparent focus:outline-none"
                                          />
                                        </div>
                                        {(error.email || formErrors.email) && (
                                          <span className="text-xs text-[#EB4335] mt-1">
                                            Enter a valid Email
                                          </span>
                                        )}
                                      </div>

                                      {/* Mobile */}
                                      <div className="flex flex-col relative w-45">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          Mobile No.
                                        </span>

                                        <div
                                          className={`flex items-center h-12 rounded-lg px-3 pl-10 bg-white text-sm
                                          ${
                                            error.mobileNumber ||
                                            formErrors.mobileNumber
                                              ? "border-1 border-[#EB4335]"
                                              : validphone(mobileNumber)
                                              ? "border-1 border-green-400"
                                              : "border-1 border-[#8D89AD]"
                                          }`}
                                        >
                                          <img
                                            src="\Phone (3).svg"
                                            alt="mobile"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                                          />
                                          <input
                                            type="text"
                                            maxLength={10}
                                            value={mobileNumber}
                                            onChange={(e) => {
                                              setMobileNumber(e.target.value);
                                              validphone(e.target.value)
                                                ? setError((prev) => ({
                                                    ...prev,
                                                    mobileNumber: false,
                                                  }))
                                                : setError((prev) => ({
                                                    ...prev,
                                                    mobileNumber: true,
                                                  }));
                                            }}
                                            placeholder="Mobile No."
                                            className="w-full h-full bg-transparent focus:outline-none"
                                          />
                                        </div>
                                        {(error.mobileNumber ||
                                          formErrors.mobileNumber ||
                                          mobileNumber === "") && (
                                          <span className="text-xs text-[#EB4335] mt-1">
                                            Enter a valid 10-digit mobile number
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex gap-4">
                                      {/* Contact Person One */}
                                      <div className="flex flex-col relative w-45">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          Contact Person One
                                        </span>
                                        <div className="flex items-center h-12 rounded-lg border-2 border-[#8D89AD] px-3 pl-10 bg-white text-sm">
                                          <img
                                            src="\Person.svg"
                                            alt="person"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Contact Person One"
                                            value={contactPersonOne}
                                            onChange={(e) =>
                                              setContactPersonOne(
                                                e.target.value
                                              )
                                            }
                                            className="w-full h-full bg-transparent focus:outline-none"
                                          />
                                        </div>
                                      </div>

                                      {/* Mobile No. One */}
                                      <div className="flex flex-col relative w-45">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          Mobile No. One
                                        </span>
                                        <div className="flex items-center h-12 rounded-lg border-2 border-[#8D89AD] px-3 pl-10 bg-white text-sm">
                                          <img
                                            src="\Phone (3).svg"
                                            alt="mobile"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Mobile No. One"
                                            value={mobileOne}
                                            onChange={(e) =>
                                              setMobileOne(e.target.value)
                                            }
                                            className="w-full h-full bg-transparent focus:outline-none"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-4">
                                      {/* Contact Person Two */}
                                      <div className="flex flex-col relative w-45">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          Contact Person Two
                                        </span>
                                        <div className="flex items-center h-12 rounded-lg border-2 border-[#8D89AD] px-3 pl-10 bg-white text-sm">
                                          <img
                                            src="\Person.svg"
                                            alt="person"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Contact Person Two"
                                            value={contactPersonTwo}
                                            onChange={(e) =>
                                              setContactPersonTwo(
                                                e.target.value
                                              )
                                            }
                                            className="w-full h-full bg-transparent focus:outline-none"
                                          />
                                        </div>
                                      </div>

                                      {/* Mobile No. Two */}
                                      <div className="flex flex-col relative w-45">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          Mobile No. Two
                                        </span>
                                        <div className="flex items-center h-12 rounded-lg border-2 border-[#8D89AD] px-3 pl-10 bg-white text-sm">
                                          <img
                                            src="\Phone (3).svg"
                                            alt="mobile"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Mobile No. Two"
                                            value={mobileTwo}
                                            onChange={(e) =>
                                              setMobileTwo(e.target.value)
                                            }
                                            className="w-full h-full bg-transparent focus:outline-none"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex gap-4">
                                      {/* GST */}
                                      <div className="flex flex-col relative w-45">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          GST
                                        </span>
                                        <div className="flex items-center h-12 rounded-lg border-2 border-[#8D89AD] px-3 pl-10 bg-white text-sm">
                                          <img
                                            src="\Binary Code.svg"
                                            alt="gst"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                                          />
                                          <input
                                            type="text"
                                            placeholder="GST"
                                            value={gstNumber}
                                            onChange={(e) =>
                                              setGstNumber(e.target.value)
                                            }
                                            className="w-full h-full bg-transparent focus:outline-none"
                                          />
                                        </div>
                                      </div>

                                      {/* Location */}
                                      <div className="flex flex-col relative w-45">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          Location
                                        </span>

                                        <div
                                          className={`flex items-center h-12 rounded-lg px-3 pl-10 bg-white text-sm
                                              ${
                                                error.location ||
                                                formErrors.location
                                                  ? "border-1 border-[#EB4335]"
                                                  : validString(location)
                                                  ? "border-1 border-green-400"
                                                  : "border-1 border-[#8D89AD]"
                                              }`}
                                        >
                                          <img
                                            src="\Office (2).svg"
                                            alt="state"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Location"
                                            value={location}
                                            onChange={(e) => {
                                              setLocation(e.target.value);
                                              validString(e.target.value)
                                                ? setError((prev) => ({
                                                    ...prev,
                                                    location: false,
                                                  }))
                                                : setError((prev) => ({
                                                    ...prev,
                                                    location: true,
                                                  }));
                                            }}
                                            className="w-full h-full bg-transparent focus:outline-none"
                                          />
                                        </div>

                                        {(error.location ||
                                          formErrors.location ||
                                          location === "") && (
                                          <span className="text-xs text-[#EB4335] mt-1">
                                            Location should not be empty.
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    {/* Address Line 1 */}
                                    <div className="flex flex-col relative w-94">
                                      <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                        Address Line 1
                                      </span>

                                      <div
                                        className={`flex items-center h-12 rounded-lg px-3 pl-10 bg-white text-sm
                                                      ${
                                                        error.addressLine1 ||
                                                        formErrors.addressLine1
                                                          ? "border-1 border-[#EB4335]"
                                                          : validString(
                                                              addressLine1
                                                            )
                                                          ? "border-1 border-green-400"
                                                          : "border-1 border-[#8D89AD]"
                                                      }`}
                                      >
                                        <img
                                          src="\addresline.svg"
                                          alt="address"
                                          className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                                        />
                                        <input
                                          type="text"
                                          placeholder="Address Line 1"
                                          value={addressLine1}
                                          onChange={(e) => {
                                            setAddressLine1(e.target.value);
                                            validString(e.target.value)
                                              ? setError((prev) => ({
                                                  ...prev,
                                                  addressLine1: false,
                                                }))
                                              : setError((prev) => ({
                                                  ...prev,
                                                  addressLine1: true,
                                                }));
                                          }}
                                          className="w-full h-full bg-transparent focus:outline-none"
                                        />
                                      </div>
                                      {(error.addressLine1 ||
                                        formErrors.addressLine1 ||
                                        addressLine1 === "") && (
                                        <span className="text-xs text-[#EB4335] mt-1">
                                          Address line 1 should not be empty.
                                        </span>
                                      )}
                                    </div>

                                    {/* Address Line 2 */}
                                    <div className="flex flex-col relative w-94">
                                      <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                        Address Line 2
                                      </span>

                                      <div className="flex items-center h-12 rounded-lg border-2 border-[#8D89AD] px-3 pl-10 bg-white text-sm">
                                        <img
                                          src="\addresline.svg"
                                          alt="address"
                                          className="absolute top-4 left-3 h-5 w-5 text-gray-400"
                                        />
                                        <input
                                          type="text"
                                          placeholder="Address Line 2"
                                          value={addressLine2}
                                          onChange={(e) => {
                                            setAddressLine2(e.target.value);
                                            validString(e.target.value)
                                              ? setError((prev) => ({
                                                  ...prev,
                                                  addressLine2: false,
                                                }))
                                              : setError((prev) => ({
                                                  ...prev,
                                                  addressLine2: true,
                                                }));
                                          }}
                                          className="w-full h-full bg-transparent focus:outline-none"
                                        />
                                      </div>
                                    </div>

                                    <div className="flex gap-2">
                                      {/* State u*/}
                                      <div className="flex flex-col relative w-30">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          State
                                        </span>
                                        <div
                                          className={`flex items-center h-12 rounded-lg px-3 pl-10 bg-white text-sm
                                                  ${
                                                    formErrors.state ||
                                                    error.state
                                                      ? "border-1 border-[#EB4335]"
                                                      : state
                                                      ? "border-1 border-green-400"
                                                      : "border-1 border-[#8D89AD]"
                                                  }`}
                                        >
                                          <img
                                            src="\state.svg"
                                            alt="state"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                                          />
                                          <select
                                            value={state}
                                            onChange={(e) => {
                                              const value = e.target.value;
                                              setState(value);

                                              if (value === "") {
                                                setError((prev) => ({
                                                  ...prev,
                                                  state: true,
                                                }));
                                              } else {
                                                setError((prev) => ({
                                                  ...prev,
                                                  state: false,
                                                }));
                                              }
                                            }}
                                            className="w-full h-full bg-transparent outline-none"
                                          >
                                            <option value="">State</option>
                                            {statesList.map((stateName) => (
                                              <option
                                                key={stateName}
                                                value={stateName}
                                              >
                                                {stateName}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        {(formErrors.state ||
                                          state === "" ||
                                          error.state) && (
                                          <span className="text-xs text-[#EB4335] mt-1">
                                            Please select a state.
                                          </span>
                                        )}
                                      </div>

                                      {/* Pincode 1 */}
                                      <div className="flex flex-col relative w-30">
                                        <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                          Pincode
                                        </span>

                                        <div
                                          className={`flex items-center h-12 rounded-lg px-3 pl-10 bg-white text-sm
                                                      ${
                                                        error.pin ||
                                                        formErrors.pin
                                                          ? "border-1 border-[#EB4335]"
                                                          : validPincode(pin)
                                                          ? "border-1 border-green-400"
                                                          : "border-1 border-[#8D89AD]"
                                                      }`}
                                        >
                                          <img
                                            src="\Postal.svg"
                                            alt="pincode"
                                            className="absolute top-4 left-3 h-5 w-5 text-gray-500"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Pincode"
                                            value={pin}
                                            onChange={(e) => {
                                              setPin(e.target.value);
                                              validPincode(e.target.value)
                                                ? setError((prev) => ({
                                                    ...prev,
                                                    pin: false,
                                                  }))
                                                : setError((prev) => ({
                                                    ...prev,
                                                    pin: true,
                                                  }));
                                            }}
                                            className="w-full h-full bg-transparent focus:outline-none"
                                          />
                                        </div>
                                        {(error.pin ||
                                          formErrors.pin ||
                                          pin === "") && (
                                          <span className="text-xs text-[#EB4335] mt-1">
                                            Enter a Valid 6 digit pincode.
                                          </span>
                                        )}
                                      </div>

                                      {/* Drop Logo */}

                                      <div className="flex flex-col relative w-30 mb-4">
                                        <div
                                          className="peer w-full h-12 px-3 border border-[#8D89AD] rounded-lg bg-white flex items-center justify-between cursor-pointer"
                                          onClick={handleCustomButtonClick}
                                          onDragOver={(e) => e.preventDefault()}
                                          onDrop={(e) => handleDrop(e)}
                                        >
                                          {image ? (
                                            <div className="relative w-full h-12 flex items-center justify-center">
                                              {/* Close Icon at Top-Right */}
                                              <button
                                                onClick={removeImage}
                                                className="absolute top-1 right-1"
                                              >
                                                <RxCross2
                                                  size={14}
                                                  className="text-gray-400 cursor-pointer"
                                                />
                                              </button>

                                              {/* Centered Image */}
                                              <img
                                                src={image}
                                                alt="Logo"
                                                className="w-10 h-10 rounded-sm"
                                              />
                                            </div>
                                          ) : (
                                            <div className="flex items-center gap-2 w-full">
                                              <img
                                                src="/Upload.svg"
                                                alt="upload"
                                                className="w-5 h-5 text-gray-500"
                                              />
                                              <span className="text-sm text-gray-500">
                                                Logo
                                              </span>
                                            </div>
                                          )}
                                          <input
                                            type="file"
                                            id="files"
                                            name="files"
                                            accept=".jpg, .jpeg, .png"
                                            className="hidden"
                                            multiple
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                          />
                                        </div>

                                        {/* Floating Label */}
                                        <span
                                          className={`
                                absolute left-4 top-[-0.4rem] z-10 px-2 text-white text-[10px] rounded-full bg-[#272643]
                                transition-all duration-200 ease-out
                                ${
                                  image || files.length > 0
                                    ? "opacity-100 scale-100 -translate-y-2"
                                    : "opacity-0 scale-95 -translate-y-1 peer-focus:opacity-100 peer-focus:scale-100 peer-focus:-translate-y-2"
                                }
                              `}
                                        >
                                          Logo
                                        </span>
                                      </div>
                                    </div>

                                    {/* Extra Notes */}
                                    <div className="flex flex-col relative w-94">
                                      <span className="absolute -top-2 left-4 bg-[#272643] text-white text-[10px] px-2 rounded-full z-10">
                                        Extra Notes
                                      </span>
                                      <div className="flex items-start rounded-lg border-2 border-[#8D89AD] px-3 pl-10 py-2 bg-white text-sm min-h-[96px]">
                                        <textarea
                                          placeholder="Extra Notes"
                                          value={extraNote}
                                          onChange={(e) =>
                                            setExtraNote(e.target.value)
                                          }
                                          className="w-full h-full bg-transparent resize-none focus:outline-none"
                                          rows={3}
                                        />
                                      </div>
                                    </div>

                                    <button
                                      type="submit"
                                      className={
                                        error.pin ||
                                        error.state ||
                                        error.mobileNumber ||
                                        error.companyName ||
                                        error.addressLine1 ||
                                        error.category ||
                                        error.location
                                          ? `btn rounded-lg error-linear-gradient bg-[#EB4335] text-white w-94 h-[40px]`
                                          : `btn rounded-lg  ${
                                              pin &&
                                              category &&
                                              mobileNumber &&
                                              addressLine1 &&
                                              state &&
                                              location &&
                                              companyName
                                                ? `bg-[#359F51] success-linear-gradient`
                                                : `bg-[#272643] btn-linear-gradient`
                                            } text-white w-94 h-[40px] mb-3`
                                      }
                                    >
                                      Update
                                    </button>
                                  </form>

                                  <form method="dialog">
                                    <button
                                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold m-4 cursor-pointer"
                                      onClick={() => {
                                        setError([]),
                                          setCompanyName(""),
                                          setContactPersonOne("");
                                        setCategory("");
                                        setMobileOne("");
                                        setContactPersonTwo("");
                                        setMobileTwo("");
                                        setExtraNote("");
                                        setAddressLine1("");
                                        setAddressLine2("");
                                        setEmail(""),
                                          setGstNumber(""),
                                          setLocation(""),
                                          setState(""),
                                          setPin(""),
                                          setImage(null),
                                          setFiles([]);
                                        setIsUpdateDialogOpen(false); // ⬅️ Hide the popup
                                      }}
                                    >
                                      &times;
                                    </button>
                                  </form>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {companyData.length > 0 && (
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
                      Math.trunc(companyData.length / 12) +
                      (companyData.length % 12 === 0 ? 0 : 1),
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
                    page < companyData.length / 12 ? `` : `btn-disabled`
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

import React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Grid,
  Button,
  Stack,
  CardMedia,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LanguageIcon from "@mui/icons-material/Language";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import StoreTwoToneIcon from "@mui/icons-material/StoreTwoTone";

import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorIcon from "@mui/icons-material/Error";

import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "./redux/userSlices/getOneUser";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ContactDetailsCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetails, loading, error } = useSelector(
    (state) => state.userData
  );

  useEffect(() => {
    dispatch(getOneUser(id));
  }, [dispatch, id]);

  const onBack = () => {
    navigate("/");
  };

  const onRetry = () => {
    dispatch(getOneUser(id));
  };

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("lastVisitedUser", JSON.stringify(userDetails));
    }
  }, [userDetails]);

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

  const loadingCard = () => (
    <div className="flex justify-center items-center my-4">
      <Button
        loading
        loadingPosition="start"
        disabled
        sx={{
          color: "white",
          borderColor: "white",
          textTransform: "none",
          "& .MuiCircularProgress-root": {
            color: "white", // spinner color
          },
          "&.Mui-disabled": {
            color: "white",
            borderColor: "white",
          },
        }}
      >
        Loading user Details...
      </Button>
    </div>
  );

  const successCard = () => (
    <Box
      sx={{ backgroundColor: "#fafafa", minHeight: "100vh", padding: "25px" }}
    >
      {/* Header */}
      <Box
        display="flex"
        p={2}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="text.secondary">
            Contact Details
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Complete information and company overview
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ borderRadius: 3, textTransform: "none" }}
        >
          Back to Dashboard
        </Button>
      </Box>

      <Box
        sx={{
          width: "95vw",
          minHeight: "80vh",
          backgroundColor: "#fafafa",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 3,
          justifyContent: "space-around",
          padding: 3,
        }}
      >
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3 }}>
            {/* Banner */}
            <Box
              sx={{
                backgroundColor: "#007B7F",
                height: 80,
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#007B7F",
                  width: 56,
                  height: 56,
                  position: "absolute",
                  bottom: -28,
                  left: 24,
                  fontSize: 24,
                  border: "4px solid white",
                  fontWeight: "bold",
                }}
              >
                {userDetails?.name?.charAt(0)}
              </Avatar>
            </Box>
            <CardContent sx={{ mt: 3 }}>
              <Typography variant="h5" fontWeight="bold">
                {userDetails?.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                @{userDetails?.username}
              </Typography>
              {/* Contact Info Email*/}
              <Box mt={4}>
                <Typography variant="h6" mb={1}>
                  Contact Information
                </Typography>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#C8F0F7", color: "#007B7F", mr: 2 }}>
                    <EmailIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {userDetails?.email}
                    </Typography>
                  </Box>
                </Card>
              </Box>
              {/* Contact Info  Phone*/}
              <Box mt={4}>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#C8F0F7", color: "#007B7F", mr: 2 }}>
                    <LocalPhoneIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {userDetails?.phone}
                    </Typography>
                  </Box>
                </Card>
              </Box>{" "}
              {/* Contact Info website*/}
              <Box mt={4}>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#C8F0F7", color: "#007B7F", mr: 2 }}>
                    <LanguageIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Website
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {userDetails?.website}
                    </Typography>
                  </Box>
                </Card>
              </Box>{" "}
              {/* Contact Info Address */}
              <Box mt={4}>
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#C8F0F7", color: "#007B7F", mr: 2 }}>
                    <HomeIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {userDetails?.address?.street},{" "}
                      {userDetails?.address?.suite},{" "}
                      {userDetails?.address?.city},{" "}
                      {userDetails?.address?.zipcode}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: {
              sm: "100%",
              md: "50%",
            },
          }}
        >
          <Card
            variant="outlined"
            sx={{
              width: "75%",
              borderRadius: 4,
              p: 3,
              boxShadow: 3,
              background: "linear-gradient(180deg, #ffffff 0%, #f1f9fa 100%)",
            }}
          >
            {/* Header Icon */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <StoreTwoToneIcon
                sx={{
                  bgcolor: "#E0F7FA",
                  borderRadius: "16px",
                  color: "#007B7F",
                  width: 100,
                  height: 100,
                  p: 2,
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="h6"
              fontWeight="bold"
              align="center"
              sx={{ mb: 2, color: "#004D4F" }}
            >
              Company Details
            </Typography>

            {/* Company Name */}
            <Box display="flex" alignItems="center" mb={1}>
              <BusinessIcon sx={{ color: "#007B7F", mr: 1 }} />
              <Typography variant="subtitle2" color="text.secondary">
                Company Name
              </Typography>
            </Box>
            <Typography fontWeight="bold" sx={{ mb: 2 }}>
              {userDetails?.company?.name || "N/A"}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Catch Phrase */}
            <Typography variant="subtitle2" color="text.secondary">
              Catch Phrase
            </Typography>
            <Typography sx={{ mb: 2, fontStyle: "italic" }}>
              {userDetails?.company?.catchPhrase || "N/A"}
            </Typography>

            {/* Business Strategy */}
            <Typography variant="subtitle2" color="text.secondary">
              Business Strategy
            </Typography>
            <Typography sx={{ mb: 2 }} fontWeight="bold">
              {userDetails?.company?.bs || "N/A"}
            </Typography>

            {/* Location */}
            <Typography variant="subtitle2" color="text.secondary">
              Location
            </Typography>
            <Typography>
              {userDetails?.address?.city}, {userDetails?.address?.zipcode}
            </Typography>

            <Stack spacing={2} direction="column" p={5}>
              <Button variant="contained">Message</Button>
              <Button variant="outlined">Schedule Call</Button>
            </Stack>
          </Card>
        </Grid>
      </Box>
    </Box>
  );

  const status = loading
    ? "loading"
    : error
    ? "error"
    : userDetails
    ? "success"
    : "empty";

  const statusUI = {
    loading: loadingCard(),
    error: errorCard(),
    success: successCard(),
  };

  return <div>{statusUI[status]}</div>;
};

export default ContactDetailsCard;

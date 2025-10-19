import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "./redux/userSlices/getOneUser";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserCard = () => {
  const theme = useTheme();

  const { id } = useParams();
  const dispatch = useDispatch();

  const { userDetails } = useSelector((state) => state.userData); // console.log the updated redux state

  useEffect(() => {
    dispatch(getOneUser(id)); // we make an API call here
  }, [dispatch]);

  if (!userDetails?.id) return <p>User not found</p>;

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="div"
        sx={{
          width: 151,
          height: 151,
          backgroundColor: "#00b0ff",
          border: "transparent",
          borderRadius: "12px",

          margin: "15px",
        }}
      />
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "white",
            height: "fit-content",
            width: "100vw",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {userDetails.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              @{userDetails.username}
            </Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "white",
            height: "fit-content",
            width: "100vw",
          }}
        >
          <CardContent
            sx={{ flex: "1 0 auto", bgcolor: "#00b0ff" }}
          ></CardContent>
        </Box>
      </div>
    </Card>
  );
};

export default UserCard;

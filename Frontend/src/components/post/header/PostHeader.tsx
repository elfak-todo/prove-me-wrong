import { Avatar, CardHeader, Typography } from "@mui/material";
import { useNavigate } from "react-router";

import milanImg from "../../../images/milan.jpg";
import Options from "../../options/Options";

function PostHeader() {
  const navigate = useNavigate();
  return (
    <CardHeader
      avatar={
        <Avatar
          src={milanImg}
          sx={{ width: 48, height: 48, cursor: "pointer" }}
          onClick={() => navigate("/profile")}
        />
      }
      action={<Options />}
      title={
        <Typography
          sx={{ mb: 0 }}
          variant="body1"
        >
          Milan Lukić
        </Typography>
      }
      subheader="25. Decembar 2022"
    />
  );
}

export default PostHeader;

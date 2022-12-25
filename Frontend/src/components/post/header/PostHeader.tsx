import { Avatar, CardHeader, Typography } from "@mui/material";

import milanImg from "../../../images/milan.jpg";
import Options from "../../options/Options";

function PostHeader() {
  return (
    <CardHeader
      avatar={<Avatar src={milanImg} sx={{ width: 48, height: 48 }} />}
      action={<Options />}
      title={
        <Typography mb={0} variant="body1">
          Milan Lukić
        </Typography>
      }
      subheader="25. Decembar 2022"
    />
  );
}

export default PostHeader;

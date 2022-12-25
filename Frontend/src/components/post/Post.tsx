import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";

import CommentSection from "../commentSection/CommentSection";
import PostFooter from "./footer/PostFooter";
import PostHeader from "./header/PostHeader";

function Post() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card sx={{ maxWidth: 700, marginTop: 5}} >
      <PostHeader />
      <CardContent>
        <Typography variant="body2">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <PostFooter isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <CommentSection isExpanded={isExpanded} />
    </Card>
  );
}

export default Post;

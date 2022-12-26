import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";

import CommentSection from "../commentSection/CommentSection";
import PostFooter from "./footer/PostFooter";
import PostHeader from "./header/PostHeader";

function Post() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card sx={{ maxWidth: 700, marginTop: 5 }}>
      <PostHeader />
      <CardContent>
        <Typography variant="body2">
          Programeryy će preživeti i web3 i chatGPT jer im se može. Ne učimo za
          džabe fagzz. Ne gubite nadu, poz.
        </Typography>
      </CardContent>
      <PostFooter isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <CommentSection isExpanded={isExpanded} />
    </Card>
  );
}

export default Post;

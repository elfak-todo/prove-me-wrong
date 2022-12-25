import { CardActions, IconButton } from "@mui/material";
import ExpandMore from "../../expandMore/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

interface PostFooterProps {
  isExpanded: boolean;
  setIsExpanded: any;
}

function PostFooter({ isExpanded, setIsExpanded }: PostFooterProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <CardActions disableSpacing>
      <>
        <IconButton
          color={isLiked ? "primary" : "default"}
          onClick={() => setIsLiked(!isLiked)}
        >
          <FavoriteIcon />
        </IconButton>
        123
      </>
      <>
        <IconButton>
          <ModeCommentIcon />
        </IconButton>
        54
      </>
      <ExpandMore
        expand={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <ExpandMoreIcon />
      </ExpandMore>
    </CardActions>
  );
}

export default PostFooter;

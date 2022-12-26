import { CardContent, Collapse } from "@mui/material";
import Comment from "../comment/Comment";
import CommentForm from "../commentForm/CommentForm";

interface CommentSectionProps {
  isExpanded: boolean;
}

function CommentSection({ isExpanded }: CommentSectionProps) {
  return (
    <Collapse in={isExpanded} collapsedSize={55}>
      <CardContent sx={{ padding: 1 }}>
        <CommentForm />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </CardContent>
    </Collapse>
  );
}

export default CommentSection;

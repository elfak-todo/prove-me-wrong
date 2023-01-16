import { CardContent, Collapse } from '@mui/material';
//import Comment from "../comment/Comment";
import CommentForm from '../commentForm/CommentForm';
import CommentList from '../commentList/CommentList';

interface CommentSectionProps {
  isExpanded: boolean;
}

function CommentSection({ isExpanded }: CommentSectionProps) {
  return (
    <Collapse in={isExpanded} collapsedSize={55}>
      <CardContent sx={{ padding: 1 }}>
        <CommentForm />
        <CommentList isExpanded={isExpanded} />
      </CardContent>
    </Collapse>
  );
}

export default CommentSection;

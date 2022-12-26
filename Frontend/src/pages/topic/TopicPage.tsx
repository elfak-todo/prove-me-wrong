import { Typography } from "@mui/material";
import Feed from "../../components/feed/Feed";
import "./TopicPage.css";

function TopicPage() {
  return (
    <div className="feed-div">
      <Typography variant="h6" color="primary.dark">
        <strong> ChatGPT genocid nad programerima? </strong>
      </Typography>
      <Feed />
    </div>
  );
}

export default TopicPage;

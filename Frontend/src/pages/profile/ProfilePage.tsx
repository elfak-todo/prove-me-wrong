import { Stack } from "@mui/material";
import { Container } from "@mui/system";
import FriendList from "../../components/friendList/FriendList";
import Profile from "../../components/profile/Profile";
// import PostFeed from "../../components/postFeed/PostFeed";

import "./ProfilePage.css";

function ProfilePage() {
  return (
    <Container>        
      <Stack direction="column" spacing={2} mt={2}>
        <Profile />
        <Stack direction="row" spacing={5}>
        <FriendList />
          {/* <PostFeed /> */}
        </Stack>
      </Stack>
    </Container>
  );
}

export default ProfilePage;

import { Stack } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FriendList from '../../components/friendList/FriendList';
import Profile from '../../components/profile/Profile';
import ProfileFeed from '../../components/profileFeed/ProfileFeed';
import UserProfileData from '../../models/user.profile.dto';
import { getProfileData } from '../../services/user.service';

import './ProfilePage.css';

function ProfilePage() {
  const userId: string | undefined = useParams().userId;
  const [profileData, setProfileData] = useState<UserProfileData>({
    user: null,
    topicCount: 0,
    postCount: 0,
    friends: false,
    sentRequest: false,
    receivedRequest: false,
    friendList: [],
  });

  useEffect(() => {
    if (!userId) return;

    getProfileData(userId)
      .then(({ data }) => setProfileData(data))
      .catch(({ error }) => console.log(error));
  }, [userId]);

  return (
    <Container>
      <Stack direction="column" spacing={2} mt={2}>
        <Profile profileData={profileData} setProfileData={setProfileData} />
        <Stack direction="row" spacing={5}>
          <FriendList friendList={profileData.friendList} />
          <ProfileFeed userId={userId} />
        </Stack>
      </Stack>
    </Container>
  );
}

export default ProfilePage;

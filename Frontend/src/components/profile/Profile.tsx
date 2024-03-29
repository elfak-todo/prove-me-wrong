import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TopicIcon from '@mui/icons-material/Topic';
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from '@mui/system';

import UserProfileData from '../../models/user.profile.dto';
import { stringAvatar } from '../avatar/UserAvatar';
import './Profile.css';
import UserContext from '../userManager/UserManager';
import { Dispatch, SetStateAction, useContext } from 'react';
import {
  respondToFriendRequest,
  sendFriendRequest,
} from '../../services/user.service';
import Interests from '../interests/Interests';

interface ProfileProps {
  profileData: UserProfileData;
  setProfileData: Dispatch<SetStateAction<UserProfileData>>;
}

function Profile({ profileData, setProfileData }: ProfileProps) {
  const { user } = useContext(UserContext);
  const { postCount, topicCount } = profileData;
  const profUser = profileData.user;

  const handleFriendRequest = () => {
    if (!profUser) return;
    if (profileData.friends) return;

    if (profileData.receivedRequest) {
      respondToFriendRequest(profUser.id, true)
        .then((res) => {
          setProfileData({
            ...profileData,
            receivedRequest: false,
            friends: true,
          });
        })
        .catch(({ error }) => console.log(error));
      return;
    }

    sendFriendRequest(profUser.id)
      .then((res) => setProfileData({ ...profileData, sentRequest: true }))
      .catch(({ error }) => console.log(error));
  };

  return (
    <Card sx={{ maxWidth: 1090 }}>
      <Stack direction="row" spacing={2}>
        <Avatar
          {...stringAvatar(`${profUser?.firstName} ${profUser?.lastName}`, 350)}
          variant="square"
        />
        <CardContent sx={{ width: '60%', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">{`${profUser?.firstName} ${profUser?.lastName}`}</Typography>
            {user?.id !== profUser?.id && (
              <Button
                variant={profileData.friends ? 'contained' : 'outlined'}
                size="small"
                startIcon={
                  profileData.friends ? <CheckIcon /> : <PersonAddIcon />
                }
                onClick={handleFriendRequest}
              >
                {profileData.sentRequest
                  ? 'Zahtev je poslat'
                  : profileData.receivedRequest
                  ? 'Prihvati zahtev'
                  : profileData.friends
                  ? 'Prijatelji'
                  : 'Pošalji zahtev'}
              </Button>
            )}
          </Box>
          <Typography gutterBottom variant="h6">
            {`${profUser?.username}`}
          </Typography>
          <Divider />
          <Stack direction="row" spacing={2} mt={2}>
            <Chip
              icon={<PeopleIcon />}
              label={`Prijatelji ${profileData.friendList.length}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<TopicIcon />}
              label={`Teme ${topicCount}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<ArticleIcon />}
              label={`Objave ${postCount}`}
              color="primary"
              variant="outlined"
            />
          </Stack>
          <Interests
            profileData={profileData}
            setProfileData={setProfileData}
          />
        </CardContent>
      </Stack>
    </Card>
  );
}

export default Profile;

import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TopicIcon from '@mui/icons-material/Topic';
import ArticleIcon from '@mui/icons-material/Article';

import UserProfileData from '../../models/user.profile.dto';
import { stringAvatar } from '../avatar/UserAvatar';
import './Profile.css';

interface ProfileProps {
  profileData: UserProfileData;
}

function Profile({ profileData }: ProfileProps) {
  const { user, postCount, topicCount } = profileData;

  const interests: string[] = ['Sports', 'Coding', 'Politics', 'TikTok'];

  return (
    <Card sx={{ maxWidth: 1090 }}>
      <Stack direction="row" spacing={2}>
        <Avatar
          {...stringAvatar(`${user?.firstName} ${user?.lastName}`, 350)}
          variant="square"
        />
        <CardContent sx={{ width: '60%', height: '100%' }}>
          <Typography variant="h4">{`${user?.firstName} ${user?.lastName}`}</Typography>
          <Typography gutterBottom variant="h6">
            {`${user?.username}`}
          </Typography>
          <Divider />
          <Stack direction="row" spacing={2} mt={2}>
            <Chip
              icon={<PeopleIcon />}
              label={`Friends 32`}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<TopicIcon />}
              label={`Topics ${topicCount}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<ArticleIcon />}
              label={`Posts ${postCount}`}
              color="primary"
              variant="outlined"
            />
          </Stack>
          <Typography mt={2} variant="subtitle1" color="text.secondary">
            Interests
          </Typography>
          <ul className="chips-div">
            {interests.map((data, index) => {
              return (
                <li key={index} style={{ marginRight: '5px' }}>
                  <Chip
                    label={data}
                    color="primary"
                    size="small"
                    sx={{ padding: 0, margin: 0 }}
                  />
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Stack>
    </Card>
  );
}

export default Profile;

import { Box, Button, Card, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import User from '../../models/user';
import UserAvatar from '../avatar/UserAvatar';
import UserContext from '../userManager/UserManager';
import { useContext } from 'react';
import { useParams } from 'react-router';

interface FriendProps {
  friend: User;
}

function Friend({ friend }: FriendProps) {
  const { user } = useContext(UserContext);
  const profileId = useParams().userId;

  return (
    <Card sx={{ marginTop: 1 }} variant="outlined">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1,
          m: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <UserAvatar
            id={friend.id}
            name={`${friend.firstName} ${friend.lastName}`}
            size={32}
          />
          <Typography mb={0} variant="body1">
            {`${friend.firstName} ${friend.lastName}`}
          </Typography>
        </Box>

        {user?.id !== profileId && <Button
          variant="outlined"
          size="small"
          startIcon={<PersonAddIcon />}
          disabled={user?.id === friend.id}
        >
          Pošalji zahtev
        </Button>}
      </Box>
    </Card>
  );
}

export default Friend;

import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import User from '../../models/user';
import { respondToFriendRequest } from '../../services/user.service';
import UserAvatar from '../avatar/UserAvatar';

interface FriendRequestProps {
  req: User;
  requests: User[];
  setRequests: Dispatch<SetStateAction<User[]>>;
}

function FriendRequest({ req, requests, setRequests }: FriendRequestProps) {
  const handleRespond = (accept: boolean) => {
    respondToFriendRequest(req.id, accept)
      .then((res) => setRequests(requests.filter((el) => el.id !== req.id)))
      .catch(({ error }) => console.log(error));
  };

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
            id={req.id}
            name={`${req.firstName} ${req.lastName}`}
            size={32}
          />
          <Typography mb={0} variant="body1">
            {`${req.firstName} ${req.lastName}`}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleRespond(true)}
          >
            Prihvati
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleRespond(false)}
          >
            Otkaži
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

export default FriendRequest;

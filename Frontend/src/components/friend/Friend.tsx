import { Box, Button, Card, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import User from '../../models/user';
import UserAvatar from '../avatar/UserAvatar';

interface FriendProps {
  user: User;
}

function Friend({ user }: FriendProps) {
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
          <UserAvatar name={`${user.firstName} ${user.lastName}`} />
          <Typography mb={0} variant="body1">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
        </Box>

        <Button variant="outlined" size="small" startIcon={<PersonAddIcon />}>
          Pošalji zahtev
        </Button>
      </Box>
    </Card>
  );
}

export default Friend;

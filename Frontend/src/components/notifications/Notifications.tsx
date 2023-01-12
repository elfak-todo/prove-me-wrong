import { Card, CardHeader, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { Dispatch, SetStateAction } from 'react';
import User from '../../models/user';
import FriendRequest from '../friendRequest/FriendRequest';

interface NotificationsProps {
  requests: User[];
  setRequests: Dispatch<SetStateAction<User[]>>;
}

function Notifications({ requests, setRequests }: NotificationsProps) {
  return (
    <Card sx={{ width: 500 }}>
      <CardHeader
        title={
          <Typography mb={0} variant="body1">
            Zahtevi za prijateljstvo
          </Typography>
        }
        subheader="Ljudi koji žele da postanu vaši prijatelji."
      />
      <CardContent>
        {requests.length ? (
          requests.map((req) => {
            return (
              <FriendRequest
                key={req.id}
                req={req}
                requests={requests}
                setRequests={setRequests}
              />
            );
          })
        ) : (
          <Typography variant="h6">
            Trenutno nemate zahteva za prikaz.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default Notifications;

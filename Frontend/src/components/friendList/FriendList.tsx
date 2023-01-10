import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import User from '../../models/user';
import Friend from '../friend/Friend';
import './FriendList.css';

interface FriendListProps {
  friendList: User[];
}

function FriendList({ friendList }: FriendListProps) {
  return (
    <Card elevation={2} sx={{ width: 350, mt: 5 }} className="fr-card">
      <CardHeader
        title={
          <Typography mb={0} variant="body1">
            Prijatelji
          </Typography>
        }
        subheader="Lista prijatelja"
      />
      <CardContent>
        {friendList?.map((el) => {
          return <Friend key={el.id} friend={el} />;
        })}
      </CardContent>
    </Card>
  );
}

export default FriendList;

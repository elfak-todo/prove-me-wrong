import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import Friend from "../friend/Friend";
import "./FriendList.css";

function FriendList() {
  return (
    <Card elevation={2} sx={{width: 350, mt: 5}} className="fr-card">
      <CardHeader
        title={
          <Typography mb={0} variant="body1">
            Prijatelji
          </Typography>
        }
        subheader="Lista prijatelja"
      />
      <CardContent>
              <Friend/>
      <Friend/>
      <Friend/>
      <Friend/>
      </CardContent>

    </Card>
  );
}

export default FriendList;

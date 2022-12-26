import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import milanImg from "../../images/milan.jpg";
import "./Profile.css";

function Profile() {
  const interests: string[] = ["Sports", "Coding", "Politics", "TikTok"];
  return (
    <Card sx={{ maxWidth: 1090 }}>
      <Stack direction="row" spacing={2}>
        <CardMedia sx={{ width: 350, height: 350 }} image={milanImg} />
        <CardContent sx={{ width: "60%", height: "100%" }}>
          <Typography variant="h4">Milan Lukić</Typography>
          <Typography gutterBottom variant="h6">
            Mixxzz
          </Typography>
          <Divider/>
          <Stack direction="row" spacing={2} mt={2}>
            <Typography variant="subtitle1" color="text.secondary">
              Friends 35
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Posts 20
            </Typography>
          </Stack>
          <Typography mt={2} variant="subtitle1">
            Interests:
          </Typography>
          <ul className="chips-div">
            {interests.map((data, index) => {
              return (
                <li key={index} style={{ marginRight: "5px" }}>
                  <Chip
                    label={data}
                    color="primary"
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

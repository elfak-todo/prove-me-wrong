import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import ExpandMore from "../expandMore/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Friend from "../friend/Friend";

import "./Topic.css";

function Topic() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  return (
    <Card
      sx={{ maxWidth: 800, minWidth: 600, mt: 3, bgcolor: "primary.light" }}
    >
      <CardHeader
        title={
          <Typography variant="h6" color="white">
            <strong> ChatGPT genocid nad programerima?</strong>
          </Typography>
        }
        subheader="Diskusija započeta 26. Decembar 2022."
        action={
          <>
            <Button variant="contained" onClick={() => navigate("/topic")}>
              Istraži
            </Button>
            <ExpandMore
              expand={isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </>
        }
      />
      <Collapse in={isExpanded}>
        <CardContent>
          <Typography variant="body1" color="white">
            Veštačka inteligencija je alat koji u velikoj meri utiče na
            savremenu ljudsku svakodnevicu i olakšava nam veliki broj radnji
            koje obavljamo, ali veštačka inteligencija, u isto vreme, jeste i
            pojam koji neretko ima loš prizvuk.
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions>
        <div className="footer-div">
          <Typography variant="body1" color="white">
            Temu započeo
          </Typography>
          <Friend />
        </div>
      </CardActions>
    </Card>
  );
}

export default Topic;

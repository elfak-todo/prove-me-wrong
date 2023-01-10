import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ExpandMore from '../expandMore/ExpandMore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Topic.css';
import { dateSrp } from '../../dateParser';
import TopicFeedData from '../../models/topic.feed.dto';
import { Box } from '@mui/system';
import UserAvatar from '../avatar/UserAvatar';

interface TopicProps {
  feedEl: TopicFeedData;
}

function Topic({ feedEl }: TopicProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const { topic, tags, author } = feedEl;

  return (
    <Card
      sx={{ maxWidth: 800, minWidth: 700, mt: 5, bgcolor: 'primary.light' }}
    >
      <CardHeader
        title={
          <>
            <Typography variant="h6" color="white">
              <strong> {topic.title}</strong>
            </Typography>
            {tags?.map((el) => {
              return (
                <Chip
                  key={el?.id}
                  label={el?.name}
                  sx={{ marginRight: 1 }}
                  size="small"
                  color="primary"
                />
              );
            })}
          </>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {`Diskusija započeta: ${
              topic.datePublished && dateSrp(topic.datePublished)
            }`}
          </Typography>
        }
        action={
          <>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate(`/topic/${topic.id}`)}
            >
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
            {topic.description}
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <UserAvatar
              id={author.id}
              name={`${author.firstName} ${author.lastName}`}
              size={32}
            />
            <Typography mb={0} variant="body1" color="white">
              {`${author.firstName} ${author.lastName} je započeo temu`}
            </Typography>
          </Box>
      </CardActions>
    </Card>
  );
}

export default Topic;

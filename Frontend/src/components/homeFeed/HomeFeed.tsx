import {
  Autocomplete,
  Box,
  Checkbox,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Tag from '../../models/tag';
import TopicFeedData from '../../models/topic.feed.dto';
import { getTags } from '../../services/tag.service';
import {
  getTopics,
  getTopicsByTag,
  getTopicsByUserInterests,
} from '../../services/topic.service';
import TopicFeed from '../topicFeed/TopicFeed';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import './HomeFeed.css';

function HomeFeed() {
  const [feed, setFeed] = useState<TopicFeedData[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [byInterests, setByInterests] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  useEffect(() => {
    if (byInterests && !selectedTag) {
      getTopicsByUserInterests().then(({ data }) => setFeed(data));
      return;
    }

    if (selectedTag) {
      getTopicsByTag(selectedTag.id).then(({ data }) => setFeed(data));
      return;
    }

    getTopics().then(({ data }) => setFeed(data));
  }, [byInterests, selectedTag]);

  useEffect(() => {
    getTags().then(({ data }) => setTags(data));
  }, []);

  return (
    <>
      <TopicFeed feed={feed} setFeed={setFeed} />
      <Paper className="filter-main" elevation={2}>
        <Typography variant="h6">Filtriraj teme</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
          <Checkbox
            sx={{ p: 0, mr: 1 }}
            checked={byInterests}
            onChange={(e, val) => setByInterests(val)}
            disabled={selectedTag ? true : false}
          />
          <Typography variant="body2">Po mojim interesovanjima</Typography>
          <Tooltip title="Svoja interesovanja možete podesiti na profilu. Interesovanja služe radi sužavanja prikaza tema. Ovim dobijate samo teme koje vas interesuju.">
            <ContactSupportIcon color="primary" />
          </Tooltip>
        </Box>
        <Autocomplete
          disablePortal
          size="small"
          sx={{ zIndex: 10 }}
          options={tags}
          getOptionLabel={(q) => q.name}
          renderInput={(params) => (
            <TextField {...params} label="Odaberite tag" />
          )}
          onChange={(e, val) => setSelectedTag(val)}
        />
      </Paper>
    </>
  );
}

export default HomeFeed;

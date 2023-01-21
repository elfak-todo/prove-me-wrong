import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Chat from '../../components/chat/Chat';
import PostFeed from '../../components/postFeed/PostFeed';
import Search from '../../components/search/Search';
import PostFeedData from '../../models/post.feed.dto';
import { ITopic } from '../../models/topic';
import { getPosts } from '../../services/post.service';

import './TopicPage.css';

function TopicPage() {
  const [feed, setFeed] = useState<PostFeedData[]>([]);
  const { state } = useLocation();
  const topic: ITopic = state;

  useEffect(() => {
    if (!topic.id) return;

    getPosts(topic.id)
      .then(({ data }) => setFeed(data))
      .catch(({ error }) => console.log(error));
  }, [topic]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}
      >
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" color="primary">
                <strong> {topic.title}</strong>
              </Typography>
              <Typography variant="body1" color="primary">
                {topic.description}
              </Typography>
            </Box>
          </Box>
          <PostFeed feed={feed} setFeed={setFeed} />
        </div>
        <Chat />
      </Box>
      <Search />
    </>
  );
}

export default TopicPage;

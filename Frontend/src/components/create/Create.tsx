import { Dialog, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

import TopicFeedData from '../../models/topic.feed.dto';
import PostFeedData from '../../models/post.feed.dto';

interface CreateProps {
  Form: any;
  feed: TopicFeedData[] | PostFeedData[];
  setFeed: any;
}

function Create({ Form, feed, setFeed }: CreateProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Fab
        sx={{
          position: 'fixed',
          bottom: 10,
          right: 10,
        }}
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <Form feed={feed} setFeed={setFeed} setIsOpen={setIsOpen} />
      </Dialog>
    </>
  );
}

export default Create;

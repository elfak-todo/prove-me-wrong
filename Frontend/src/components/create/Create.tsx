import { Dialog, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router';
import { Dispatch, SetStateAction, useState } from 'react';

import PostForm from '../postForm/PostForm';
import TopicForm from '../topicForm/TopicForm';
import TopicFeedData from '../../models/topic.feed.dto';

interface CreateProps {
  feed: TopicFeedData[];
  setFeed: Dispatch<SetStateAction<TopicFeedData[]>>;
}

function Create({ feed, setFeed }: CreateProps) {
  const { pathname } = useLocation();
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
        {pathname === '/topic' ? (
          <PostForm setIsOpen={setIsOpen} />
        ) : pathname === '/home' ? (
          <TopicForm setIsOpen={setIsOpen} feed={feed} setFeed={setFeed} />
        ) : null}
      </Dialog>
    </>
  );
}

export default Create;

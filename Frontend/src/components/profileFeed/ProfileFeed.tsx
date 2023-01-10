import { Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import PostFeedData from '../../models/post.feed.dto';
import TopicFeedData from '../../models/topic.feed.dto';
import { getUserPosts } from '../../services/post.service';
import { getUserTopics } from '../../services/topic.service';
import PostFeed from '../postFeed/PostFeed';
import TopicFeed from '../topicFeed/TopicFeed';

import './ProfileFeed.css';

interface ProfileFeedProps {
  userId: string | undefined;
}

function ProfileFeed({ userId }: ProfileFeedProps) {
  const [tab, setTab] = useState<number>(1);
  const [topics, setTopics] = useState<TopicFeedData[]>([]);
  const [posts, setPosts] = useState<PostFeedData[]>([]);

  useEffect(() => {
    if (!userId) return;

    getUserPosts(userId)
      .then(({ data }) => setPosts(data))
      .catch(({ error }) => console.log(error));

    getUserTopics(userId)
      .then(({ data }) => setTopics(data))
      .catch(({ error }) => console.log(error));
  }, [userId]);

  return (
    <div className="profile-feed-div">
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab value={1} label="Topics" />
        <Tab value={2} label="Posts" />
      </Tabs>
      {tab === 1 && <TopicFeed feed={topics} setFeed={setTopics} />}
      {tab === 2 && <PostFeed feed={posts} setFeed={setPosts} />}
    </div>
  );
}

export default ProfileFeed;

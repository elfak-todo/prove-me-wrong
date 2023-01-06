import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Create from '../../components/create/Create';
import PostFeed from '../../components/postFeed/PostFeed';
import PostForm from '../../components/postForm/PostForm';
import PostFeedData from '../../models/post.feed.dto';
import { getPosts } from '../../services/post.service';

import './TopicPage.css';

function TopicPage() {
  const topicId: string | undefined = useParams().topicId;
  const [feed, setFeed] = useState<PostFeedData[]>([]);

  useEffect(() => {
    if (!topicId) return;

    getPosts(topicId)
      .then(({ data }) => setFeed(data))
      .catch(({ error }) => console.log(error));
  }, [topicId]);

  return (
    <>
      <div className="feed-div">
        <PostFeed feed={feed} setFeed={setFeed} />
      </div>
      <Create Form={PostForm} feed={feed} setFeed={setFeed} />
    </>
  );
}

export default TopicPage;

import { Dispatch, SetStateAction } from 'react';
import PostFeedData from '../../models/post.feed.dto';
import Post from '../post/Post';

import './Feed.css';

interface PostFeedProps {
  feed: PostFeedData[];
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function PostFeed({ feed, setFeed }: PostFeedProps) {
  return (
    <div className="feed-div-comp">
      {feed.map((el) => (
        <Post key={el.post.id} feedEl={el} feed={feed} setFeed={setFeed} />
      ))}
    </div>
  );
}

export default PostFeed;

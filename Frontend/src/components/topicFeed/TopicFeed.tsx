import { Dispatch, SetStateAction } from 'react';
import TopicFeedData from '../../models/topic.feed.dto';
import Create from '../create/Create';
import Topic from '../topic/Topic';
import TopicForm from '../topicForm/TopicForm';

import './TopicFeed.css';

interface TopicFeedProps {
  feed: TopicFeedData[];
  setFeed: Dispatch<SetStateAction<TopicFeedData[]>>;
}
function TopicFeed({ feed, setFeed }: TopicFeedProps) {
  return (
    <>
      <div className="topics-div">
        {feed?.map((el) => (
          <Topic key={el.topic.id} feedEl={el} />
        ))}
      </div>
      <Create Form={TopicForm} feed={feed} setFeed={setFeed} />
    </>
  );
}

export default TopicFeed;

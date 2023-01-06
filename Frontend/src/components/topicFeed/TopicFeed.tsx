import { useEffect, useState } from 'react';
import TopicFeedData from '../../models/topic.feed.dto';
import { getTopics } from '../../services/topic.service';
import Create from '../create/Create';
import Topic from '../topic/Topic';

import './TopicFeed.css';

function TopicFeed() {
  const [feed, setFeed] = useState<TopicFeedData[]>([]);

  useEffect(() => {
    getTopics().then(({ data }) => setFeed(data));
  }, []);

  return (
    <>
      <div className="topics-div">
        {feed.map((el) => (
          <Topic key={el.topic.id} feedEl={el} />
        ))}
      </div>
      <Create feed={feed} setFeed={setFeed} />
    </>
  );
}

export default TopicFeed;

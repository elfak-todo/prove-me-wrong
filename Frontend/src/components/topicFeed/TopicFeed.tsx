import { useEffect, useState } from 'react';
import { ITopic } from '../../models/topic';
import { getTopics } from '../../services/topic.service';
import Create from '../create/Create';
import Topic from '../topic/Topic';

import './TopicFeed.css';

function TopicFeed() {
  const [topics, setTopics] = useState<ITopic[]>([]);

  useEffect(() => {
    getTopics().then(({ data }) => setTopics(data));
  }, []);

  return (
    <>
      <div className="topics-div">
        {topics.map((topic) => (
          <Topic key={topic.id} topic={topic} />
        ))}
      </div>
      <Create feed={topics} setFeed={setTopics} />
    </>
  );
}

export default TopicFeed;

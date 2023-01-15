import { useEffect, useState } from 'react';
import Search from '../../components/search/Search';
import TopicFeed from '../../components/topicFeed/TopicFeed';
import TopicFeedData from '../../models/topic.feed.dto';
import { getTopics } from '../../services/topic.service';

import './HomePage.css';

function HomePage() {
  const [feed, setFeed] = useState<TopicFeedData[]>([]);

  useEffect(() => {
    getTopics().then(({ data }) => setFeed(data));
  }, []);

  return (
    <>
      <TopicFeed feed={feed} setFeed={setFeed} />
      <Search />
    </>
  );
}

export default HomePage;

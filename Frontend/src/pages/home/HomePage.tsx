import Feed from "../../components/feed/Feed";
import Search from "../../components/search/Search";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="feed-div">
        <Feed />
      </div>
      <Search />
    </>
  );
}

export default HomePage;

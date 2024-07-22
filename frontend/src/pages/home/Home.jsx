import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import { apiUrl, getError } from "../../utils";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    console.log(search);
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/posts` + search);
        setPosts(data);
      } catch (err) {
        alert(getError(err));
      }
    };
    fetchPosts();
  }, [search]);
  console.log(posts);
  return (
    <>
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}

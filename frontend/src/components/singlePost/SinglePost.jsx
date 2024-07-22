import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import { apiUrl, getError } from "../../utils";
import { BsPencilFill, BsTrash2 } from "react-icons/bs";

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${apiUrl}/api/posts/${postId}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/posts/${post._id}`, {
        data: { username: user.author.username },
      });
      alert("Deleted successfully.");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${apiUrl}/api/posts/${post._id}`, {
        username: user.author.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
      alert(getError(err));
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={post.photo} alt="postImg" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post?.author === user._id && (
              <div className="singlePostEdit">
                <BsPencilFill
                  className="singlePostIcon"
                  onClick={() => setUpdateMode(true)}
                />
                <BsTrash2 className="singlePostIcon" onClick={handleDelete} />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${user.username}`} className="link">
              <b> {user.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

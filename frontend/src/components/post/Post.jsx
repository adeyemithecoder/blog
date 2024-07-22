import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  console.log(post);
  return (
    <div className='post'>
      {post?.photo && <img className='postImg' src={post.photo} alt='' />}
      <div className='postInfo'>
        <div className='postCats'>
          {post && post?.categories.map((c) => (
            <span key={c._id} className='postCat'>
              {c}
            </span>
          ))}
        </div>
        <Link to={`/post/${post?._id}`} className='link'>
          <span className='postTitle'>{post?.title}</span>
        </Link>
        <hr />
        <div className='aboutAuthor'>
          <div className='authorImage'>
            <img
              src={post.author.profilePic || "./img/noAvatar.png"}
              alt='img'
            />
          </div>
          <div className='authorName'>
            <h3>{post.author.username}</h3>
            <h4 className='postDate'>
              {new Date(post.createdAt).toDateString()}
            </h4>
          </div>
        </div>
      </div>
      <p className='postDesc'>{post.desc}</p>
    </div>
  );
}

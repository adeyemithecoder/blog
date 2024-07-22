import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { apiUrl } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]); // Changed to array
  const { user } = useContext(Context);
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      author: user._id,
      title,
      desc,
      photo: image[0],
      categories, // Updated to send the array of categories
    };
    try {
      const res = await axios.post(`${apiUrl}/api/posts`, newPost);
      navigate(`/post/${res.data._id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const AllCats = [
    "lifestyle",
    "music",
    "travel",
    "technology",
    "food",
    "fitness",
    "fashion",
    "education",
  ];
  return (
    <div className="write">
      <div className="userPost">
        <img src={image && image[0]} alt="" />
      </div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <UploadWidget
            uwConfig={{
              multiple: false,
              cloudName: "drh9xi3cb",
              uploadPreset: "blogapp",
              folder: "posts",
            }}
            setImage={setImage}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="categoryContainer">
          <h3>Select Categories:</h3>
          <div>
            {" "}
            {AllCats.map((category) => (
              <div key={category}>
                <p>
                  <input
                    type="checkbox"
                    id={category}
                    value={category}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor={category}>{category}</label>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

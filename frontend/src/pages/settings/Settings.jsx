import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState([]);

  const { user, dispatch } = useContext(Context);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className='settings'>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsUpdateTitle'>Update Your Account</span>
          <span className='settingsDeleteTitle'>Delete Account</span>
        </div>

        <form className='settingsForm' onSubmit={handleSubmit}>
          <div className='settingsP'>
            <label>Profile Picture</label>
            <img
              src={
                (image && image[0]) || user.profilePic || "./img/noAvatar.png"
              }
              alt=''
            />
            <UploadWidget
              uwConfig={{
                multiple: false,
                cloudName: "drh9xi3cb",
                uploadPreset: "blogapp",
                folder: "profilePic",
              }}
              setImage={setImage}
            />
          </div>
          <label>Username</label>
          <input
            type='text'
            value={username}
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            value={email}
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='settingsSubmit' type='submit'>
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { apiUrl, getError } from "../../utils";
import {
  FaFacebookSquare,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/posts/cats`);
        setCats(data);
      } catch (err) {
        alert(getError(err));
      }
    };
    getCats();
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>ABOUT ME</span>
        <img
          src='https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg'
          alt=''
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          necessitatibus nostrum illum reprehenderit.
        </p>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList'>
          {cats?.map((c) => (
            <Link key={c._id} to={`/?cat=${c}`} className='link'>
              <li className='sidebarListItem'>{c}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>FOLLOW US</span>
        <div className='sidebarSocial'>
          <FaFacebookSquare fontSize={20} />
          <FaTwitter fontSize={20} />
          <FaPinterest fontSize={20} />
          <FaInstagram fontSize={20} />
        </div>
      </div>
    </div>
  );
}

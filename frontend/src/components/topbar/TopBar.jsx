import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import { FaSquareFacebook, FaSquareTwitter } from "react-icons/fa6";
import { BsInstagram, BsPinterest } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className='top'>
      <div className='topLeft'>
        <FaSquareFacebook className='topIcon' />
        <FaSquareTwitter className='topIcon' />
        <BsPinterest className='topIcon' />
        <BsInstagram className='topIcon' />
      </div>
      <div className='topCenter'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link className='link' to='/'>
              HOME
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/'>
              ABOUT
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/'>
              CONTACT
            </Link>
          </li>
          <li className='topListItem'>
            <Link className='link' to='/write'>
              WRITE
            </Link>
          </li>
          <li className='topListItem' onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className='topRight'>
        {user ? (
          <Link className='profileContainer' to='/settings'>
            <img
              className='topImg'
              src={user.profilePic || "./img/noAvatar.png"}
              alt='profile'
            />
          </Link>
        ) : (
          <ul className='topList'>
            <li className='topListItem'>
              <Link className='link' to='/login'>
                LOGIN
              </Link>
            </li>
            <li className='topListItem'>
              <Link className='link' to='/register'>
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <IoSearch className='topSearchIcon' />
      </div>
    </div>
  );
}

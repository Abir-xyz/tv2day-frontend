import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { CiHome } from 'react-icons/ci';
import { MdMovie } from 'react-icons/md';
import { MdOutlineLiveTv } from 'react-icons/md';
import { FaFolderOpen } from 'react-icons/fa6';
import { FaBarsStaggered } from 'react-icons/fa6';
import LoginSys from './LoginSys';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import 'animate.css';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [isNav, setIsNav] = useState();
  const [animate, setAnimate] = useState(false);

  const handleShowLinks = () => {
    setIsNav((prev) => !prev);
    setAnimate(true);
  };

  useEffect(() => {
    if (isNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isNav]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsNav(false);
        setAnimate(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Wrapper className='section'>
      <div className='navbar-container'>
        <div className='wrapper'>
          <Link to='/' className='brand'>
            {isAuthenticated ? (
              <h1 className='animate__animated animate__bounceIn'>
                Hi, {user.name}{' '}
              </h1>
            ) : (
              <h1 className='animate__animated animate__bounceIn'>
                Tv2day
              </h1>
            )}
          </Link>
        </div>
        <div className='wrapper link-wrapper'>
          <div
            className={`links ${isNav ? 'show-links' : ''} ${
              animate ? 'animate-slide' : ''
            }`}
          >
            <NavLink to='/' className='link'>
              <span className='icon'>
                <CiHome />
              </span>
              <span>Home</span>
            </NavLink>
            <NavLink to='/allmovies' className='link'>
              <span className='icon'>
                <MdMovie />
              </span>
              <span>Movies</span>
            </NavLink>
            <NavLink to='/allseries' className='link'>
              <span className='icon'>
                <MdOutlineLiveTv />
              </span>
              <span>Series</span>
            </NavLink>
            <NavLink to='/watchlist' className='link'>
              <span className='icon'>
                <FaFolderOpen />
              </span>
              <span>WatchList</span>
            </NavLink>
          </div>
        </div>
        <div className='wrapper'>
          <div className='global-btns'>
            <Link to='/search' className='search-wrapper'>
              <div className='search-btn'>
                <span className='icon'>
                  <CiSearch />
                </span>
                Search
              </div>
            </Link>
            <div className='nav-bars' onClick={handleShowLinks}>
              <span>
                <FaBarsStaggered />
              </span>
            </div>

            <div className='acc-wrapper'>
              <div
                className={`acc-btn ${isNav ? 'show-links' : ''} ${
                  animate ? 'animate-slide' : ''
                } `}
                onClick={handleShowLinks}
              >
                <LoginSys />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .navbar-container {
    max-width: 90vw;
    margin: 0 auto;
  }
  .brand h1 {
    font-size: 1.7rem;
    color: #fff;
    font-family: 'Lobster', sans-serif;
    font-weight: 400;
    letter-spacing: 1px;
  }

  .brand {
    text-decoration: none;
    color: var(--headings);
  }
  .links {
    padding: 5px 0;
    border-radius: 10rem;
    background: rgba(85, 85, 85, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .search-wrapper {
    text-decoration: none !important;
  }
  .link {
    text-decoration: none;
    color: #ffffffce;
    font-size: 1rem;
    margin: 0 1rem;
    transition: all 0.1s ease-in-out;
    display: flex;
    flex-direction: row !important;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2px;
    text-align: center;
    /* padding: 6px 12px; */
    .icon {
      font-size: 1.1rem;
      margin-top: 5px;
    }
  }

  .link:hover {
    background-color: #9092ff;
    padding: 6px 12px;
    border-radius: 10rem;
  }

  .active {
    background-color: #9092ff;
    padding: 6px 12px;
    border-radius: 10rem;
  }

  .search-wrapper {
    margin-right: 1rem;
  }
  .search-btn {
    color: #fff;
    font-size: 1rem;
    .icon {
      font-size: 1.4rem;
      margin-top: 5px;
      margin-right: 3px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
    padding: 0px 15px;
    border-radius: 10rem;
    background: rgba(85, 85, 85, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.185);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.1s ease-in-out;
  }
  .search-btn:hover {
    box-shadow: rgba(255, 255, 255, 0.062) 0px 2px 8px;
  }

  .acc-btn button {
    font-size: 1rem;
    color: #fff;
    padding: 4px 15px;
    border-radius: 10rem;
    border: none;
    background-color: #7678ed;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }

  .acc-btn button:hover {
    background-color: #9092ff;
  }

  .global-btns {
    display: flex;
    align-items: center;
  }

  .nav-bars {
    display: none;
    color: #fff;
    font-size: 1.3rem;
    cursor: pointer;
  }

  @media screen and (max-width: 1000px) {
    .brand h1 {
      font-size: 1.3rem;
    }
    .link {
      font-size: 0.9rem;
      .icon {
        font-size: 1rem;
        margin-top: 3px;
      }
    }
    .active {
      padding: 2px 8px;
    }
    .link:hover {
      padding: 2px 8px;
    }
    .search-btn {
      font-size: 0.9rem;
      .icon {
        font-size: 1.2rem;
      }
    }
    .acc-btn button {
      font-size: 0.9rem;
      padding: 2px 8px;
      .icon {
        font-size: 1.2rem;
      }
    }
  }

  @media screen and (max-width: 900px) {
    .links {
      position: fixed;
      z-index: 10;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      max-width: 90vw;
      margin-left: auto;
      margin-right: auto;
      padding: 6px 16px;
      background: rgba(85, 85, 85, 0.2);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid rgba(0, 0, 0, 0.3);
    }
    .link {
      margin: 0 !important;
      color: #ffffffce;
    }
    .active {
      color: var(--txtClr) !important;
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
    }
  }

  @media screen and (max-width: 768px) {
    .links {
      position: absolute;
      top: 15%;
      left: 0%;
      right: 0;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      min-width: 100%;
      border-radius: 0;
      min-height: 100vh;
      z-index: 10001 !important;
      /* display: none; */
      background-color: #000814;
      /* padding-top: 3.66rem; */
      padding: 3.66rem 1.5rem; /* add horizontal padding */
      border-top-right-radius: 26px !important;
      border-top-left-radius: 26px !important;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
      transform: translateX(-100vw);
      transition: none;
      .link {
        margin: 0.8rem 0 !important;
        font-size: 1.1rem !important;
        width: 100%;
        padding: 8px 12px;
        display: flex;
        justify-content: flex-start !important;
      }
      .icon {
        font-size: 1.3rem;
        margin-right: 5px;
      }
    }
    .show-links {
      display: flex !important;
      transform: translateX(0) !important;
    }
    .animate-slide {
      transition: transform 0.3s ease-in-out;
    }
    .acc-wrapper {
      position: absolute;
      /* top: 0%; */
      left: 0;
      right: 0%;
      bottom: 5%;
      z-index: 10002;
      width: 100%;
      padding-top: 2.2rem;
      width: 90%;
      margin: 0 auto;
      .acc-btn {
        width: 100%;
        /* display: none; */
        transform: translateX(-100vw);
      }
      .acc-btn section {
        width: 100% !important;
      }
      .acc-btn button {
        font-size: 1.1rem;
        width: 100%;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .acc-btn svg {
        font-size: 1.4rem;
      }
    }
    .nav-bars {
      display: block;
      margin-top: 7px;
    }
  }

  @media screen and (min-width: 768px) {
    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 40px;
    }
    .links {
      display: flex !important;
    }
  }
`;

export default Navbar;

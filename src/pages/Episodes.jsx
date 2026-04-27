import { useParams } from 'react-router';
import { styled } from 'styled-components';
import { VideoPlayerEp, Navbar, EpList } from '../components/index';
import { useEffect, useState } from 'react';
import axios from 'axios';

const rootURL = `https://api.themoviedb.org/3`;
const key = import.meta.env.VITE_API_KEY;

const Episodes = () => {
  const { id, number } = useParams();
  const [epNum, setEpNum] = useState('');

  return (
    <Wrapper className='section'>
      <main className='main'>
        <Navbar />
        <div className='video-player-wrapper'>
          <VideoPlayerEp id={id} number={number} episode={epNum} />
        </div>
        <div className='episodes-wrapper'>
          <EpList id={id} number={number} setEpNum={setEpNum} />
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    min-height: 100vh;
    background-color: #001523 !important;
  }
  .video-player-wrapper {
    margin-top: 40px !important;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
    border-radius: 10px !important;
  }
  .brand h1 {
    color: #fff !important;
  }

  .links .link {
    color: #ebebeb;
    padding-top: 6px;
    padding-bottom: 6px;
  }
  .active-link {
    background-color: #ebebeb;
    color: #000 !important;
  }
  .links {
    background: rgba(85, 85, 85, 0.33);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.1px);
    -webkit-backdrop-filter: blur(7.1px);
    border: 1px solid rgba(85, 85, 85, 0.3);
  }

  @media screen and (min-width: 800px) {
    .video-player-wrapper {
      max-width: 60vw;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 800px) {
    iframe {
      border-radius: 0 !important;
      border-top-right-radius: 10px !important;
      border-top-left-radius: 10px !important;
    }
  }
`;

export default Episodes;

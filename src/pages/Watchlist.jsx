import styled from 'styled-components';
import { Navbar } from '../components/index';
import { useDataContext } from '../context api/DataContext';
import { Link } from 'react-router';
import { RiStarSFill } from 'react-icons/ri';

const Watchlist = () => {
  const { wListItems, deleteAll } = useDataContext();

  const moviePosterURL = `https://image.tmdb.org/t/p/w500`;

  return (
    <Wrapper className='section'>
      <main className='main'>
        <div className='navbar'>
          <Navbar />
        </div>
        {wListItems.length > 0 && (
          <div className='delete-all-wrapper'>
            <div>
              <h1>My Watchlist</h1>
            </div>
            <div className='delete-btn'>
              <button onClick={deleteAll}>Remove All</button>
            </div>
          </div>
        )}

        <div className='content-container'>
          {wListItems &&
            wListItems.map((movie) => {
              const type = movie.title ? 'movie' : 'tv';
              const displayName = movie.title || movie.name;
              const {
                poster_path,
                release_date,
                vote_average,
                id,
                first_air_date,
              } = movie;

              return (
                <Link to={`/${type}/${id}`} className='link' key={id}>
                  <div className='movie-info-wrapper'>
                    <div className='wrapper'>
                      <div className='img-container'>
                        <img
                          src={`${moviePosterURL}${poster_path}`}
                          alt='movie-poster'
                        />
                        <div className='flow-container'>
                          <p className='date'>
                            {release_date
                              ? new Date(movie.release_date)
                                  .getFullYear()
                                  .toString()
                              : new Date(first_air_date)
                                  .getFullYear()
                                  .toString()}
                          </p>
                          <p className='stars'>
                            <span>
                              <RiStarSFill />
                            </span>
                            <span className='rating'>
                              {vote_average.toFixed(1)}
                            </span>
                          </p>
                        </div>
                        <div className='info-container'>
                          <p className='title'>{displayName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    min-height: 100vh;
    max-width: 90vw;
    margin: 0 auto;
    margin-bottom: 4rem !important;
  }
  .content-container {
    margin-top: 4rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .link {
    margin: 0 1rem;
  }

  .movie-info-wrapper {
    display: flex;
    justify-content: center;
  }

  .wrapper {
    overflow: hidden;
    display: inline-block;
    border-radius: 5px;
  }

  .wrapper:hover img {
    scale: 1.1;
  }

  .img-container img {
    display: block;
    position: relative;
    height: 400px;
    border-radius: 5px;
    -webkit-mask-image: linear-gradient(to bottom, black, transparent);
    mask-image: linear-gradient(to bottom, black, transparent);
    transition: all 0.3s ease-in-out;
  }

  .info-container {
    position: absolute;
    bottom: 5%;
    left: 2%;
  }

  .title {
    font-size: 1rem;
    font-weight: 400;
    max-width: 260px;
    text-align: center;
    color: var(--primaryClr);
  }
  .date,
  .stars {
    font-size: 1rem;
  }
  .date {
    background-color: #00000085;
    border-radius: 10rem;
    padding: 0px 3px;
    color: #ffffff;
  }
  .img-container {
    position: relative;
    margin: 10px 0;
  }
  .flow-container {
    position: absolute;
    top: 1%;
    left: 0;
    display: flex;
    justify-content: space-between;
    width: 265px;
    padding: 0 5px;
  }
  .stars {
    color: #ffa600;
    background-color: #03030375;
    border-radius: 10rem;
    padding: 0px 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    .rating {
      margin-bottom: 2px;
      margin-left: 2px;
    }
  }

  .page-info {
    color: #818181;
    text-align: center;
    text-transform: capitalize;
    margin: 2rem 0;
  }

  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .btn {
      cursor: pointer;
      font-size: 1.5rem;
    }
  }

  .delete-all-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 3rem 1rem;
    h1 {
      color: #ffffff;
      font-weight: 600;
      font-size: 1.2rem;
    }
    .delete-btn button {
      background: transparent;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 50px;
      font-size: 1rem;
      padding: 6px 12px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
    .delete-btn button:hover {
      background: #7a1313;
      border-color: #7a1313;
    }
  }

  .show {
    display: block;
  }
  .hide {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .main {
      max-width: 95vw !important;
      margin: 0 auto !important;
    }
    .img-container img {
      height: 200px !important;
    }
  }
`;

export default Watchlist;

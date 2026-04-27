import styled from 'styled-components';
import { Navbar } from '../components';
import { useDataContext } from '../context api/DataContext';
import { useState } from 'react';
import { Link } from 'react-router';
import MovieCat from './MovieCat';
import TvCat from './TvCat';

const Category = () => {
  const { movieCategory, tvCategory, isLoading } = useDataContext();
  const [tab, setTab] = useState('movies');
  const [movieCatId, setMovieCatId] = useState(28);
  const [tvCatId, setTvCatId] = useState(10759);

  return (
    <Wrapper className='section'>
      <main className='main'>
        <div className='navbar-container'>
          <Navbar />
        </div>
        <div className='content-btn-container'>
          <div className='tab-wrapper'>
            <button
              onClick={() => setTab('movies')}
              className={tab === 'movies' ? 'active' : ''}
            >
              Movies
            </button>
            <button
              onClick={() => setTab('tv')}
              className={tab === 'tv' ? 'active' : ''}
            >
              Series
            </button>
          </div>
          <div className='content-wrapper'>
            {tab === 'movies' && (
              <div className='movie-category-wrapper'>
                {movieCategory &&
                  movieCategory.genres.map((movie) => {
                    return (
                      <button
                        key={movie.id}
                        className={`box ${movieCatId === movie.id ? 'active' : ''}`}
                        onClick={() => setMovieCatId(movie.id)}
                      >
                        <p>{movie.name}</p>
                      </button>
                    );
                  })}
              </div>
            )}
            {tab === 'tv' && (
              <div className='tv-category-wrapper'>
                {tvCategory &&
                  tvCategory.genres.map((tv) => {
                    return (
                      <button
                        key={tv.id}
                        className={`box ${tvCatId === tv.id ? 'active' : ''}`}
                        onClick={() => setTvCatId(tv.id)}
                      >
                        <p>{tv.name}</p>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div className='main-content'>
          {tab === 'movies' && <MovieCat genreId={movieCatId} />}
          {tab === 'tv' && <TvCat genreId={tvCatId} />}
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

  .content-btn-container {
    margin-top: 5rem !important;
    max-width: 80vw;
    margin: 0 auto;
  }

  .content-container {
    padding: 1.5rem;
  }

  /* ── toggle ── */
  .tab-wrapper {
    display: inline-flex;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 999px;
    padding: 4px;
    border: 0.5px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 1.75rem;
  }

  .tab-wrapper button {
    padding: 8px 32px;
    border-radius: 999px;
    font-size: 14px;
    cursor: pointer;
    color: #8890a4;
    background: transparent;
    border: none;
    font-weight: 400;
    transition: all 0.2s;
    user-select: none;
  }

  .tab-wrapper button.active {
    background: #7c3aed;
    color: #fff;
    font-weight: 500;
  }

  .tab-wrapper button:not(.active):hover {
    color: #c0c8dd;
  }

  /* ── genre grid ── */
  .movie-category-wrapper,
  .tv-category-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  /* ── chip ── */
  .box {
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
    color: #8890a4;
    background: rgba(255, 255, 255, 0.04);
    border: 0.5px solid rgba(255, 255, 255, 0.08);
    transition: all 0.2s;
    user-select: none;
    font-family: inherit;
  }

  .box:hover {
    color: #fff;
    border-color: rgba(124, 58, 237, 0.5);
  }

  .active {
    color: #fff;
    border-color: rgba(124, 58, 237, 0.5);
  }

  .box p {
    margin: 0;
    font-size: 13px;
    color: inherit;
  }
  a {
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    .content-btn-container {
      margin-top: 2rem !important;
    }
    .main {
      max-width: 100vw !important;
      margin: 0 auto !important;
    }
    .content-container {
      padding: 0 !important;
    }
    .btn-container {
      margin-bottom: 2rem !important;
    }
  }
`;

export default Category;

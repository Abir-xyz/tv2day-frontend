import styled from 'styled-components';
import { CiHeart } from 'react-icons/ci';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import { useDataContext } from '../context api/DataContext';
import { useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

const Genre = ({ data }) => {
  const { genres, number_of_seasons } = data;
  const { handleAddToWatchlist, wListItems, mongodbApi, handleDelete } =
    useDataContext();
  const { id } = useParams();
  const { user } = useAuth0();
  const type = number_of_seasons ? 'tv' : 'movie';

  // const isInWatchlist = wListItems.some((item) => item.id === Number(id));
  const isInWatchlist = mongodbApi.some((item) => item.itemId === id);

  return (
    <Wrapper className='section'>
      <main>
        <div className='container'>
          {genres ? (
            genres.slice(0, 4).map((item) => {
              return (
                <div className='item-wrapper' key={item.id}>
                  <p>{item.name}</p>
                </div>
              );
            })
          ) : (
            <p>No category to show:(</p>
          )}
        </div>
        <div className='watchList-wrapper'>
          <button
            className='heart-btn'
            onClick={() => handleAddToWatchlist(user.email, id, type)}
          >
            {isInWatchlist ? '❤️' : '🤍'}
          </button>
          {/* {isInWatchlist && (
            <button className='del-btn'>
              <IoHeartDislikeOutline />
            </button>
          )} */}

          {/* {isInWatchlist && (
            <button
              className='del-btn'
              onClick={() => {
                const itemToDelete = mongodbApi.find(
                  (item) => item.itemId === id,
                );
                if (itemToDelete) handleDelete(itemToDelete._id);
              }}
            >
              <IoHeartDislikeOutline />
            </button>
          )} */}

          {isInWatchlist && (
            <button
              className='del-btn'
              onClick={() => {
                const itemToDelete = mongodbApi.find(
                  (item) => item.itemId === id,
                );
                if (itemToDelete) handleDelete(itemToDelete._id);
              }}
            >
              <IoHeartDislikeOutline />
            </button>
          )}
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    /* color: #ebebeb; */
    color: #ffd68f;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(39, 39, 39, 0.171);
    backdrop-filter: blur(9.1px);
    -webkit-backdrop-filter: blur(9.1px);
    border: 1px solid rgba(105, 105, 105, 0.25);
    box-shadow: rgba(17, 17, 17, 0.2) 0px 2px 8px 0px;
    padding: 10px;
    border-radius: 1rem;
    margin: 0 10px;
    margin-top: 1rem;
    flex: 0 0 80%;
  }

  main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    background: #ebebeb;
    color: #000;
    border: 1px solid #ebebeb;
    font-size: 1.1rem;
    padding: 10px 14px;
    border-radius: 10rem;
    flex: 0 0 10%;
    margin: 0 10px;
    margin-top: 1rem;
    cursor: pointer;
  }

  @media screen and (min-width: 800px) {
    main {
      max-width: 60vw;
      margin: 0 auto;
      margin-top: 1rem;
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      flex-direction: column;
      align-items: flex-start;
      gap: 7px;
    }
  }
`;

export default Genre;

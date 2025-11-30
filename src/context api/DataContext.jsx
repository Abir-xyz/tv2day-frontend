import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const DataContext = createContext();

const rootURL = `https://api.themoviedb.org/3`;
const key = import.meta.env.VITE_API_KEY;
const watchListApi = axios.create({
  baseURL: 'http://localhost:5000/api/watchlist',
});

export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState('');
  const [trendingSeries, setTrendingSeries] = useState('');
  const [topMovies, setTopMovies] = useState('');
  const [topSeries, setTopSeries] = useState('');
  const [results, setResults] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [allMovies, setAllMovies] = useState('');
  const [totalPages, setTotalPages] = useState(null);
  const [allSeries, setAllSeries] = useState('');
  const [userWatchList, setUserWatchList] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [wListItems, setWListItems] = useState('');
  const { user } = useAuth0();

  const userWatchListApi = `http://localhost:5000/api/watchlist/${user?.email}`;

  // get trendingMovies
  const getTrendingMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios(
        `${rootURL}/trending/movie/day?api_key=${key}`
      );
      const data = await response.data;
      setTrendingMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get trendingSeries
  const getTrendingSeries = async () => {
    setIsLoading(true);
    try {
      const response = await axios(`${rootURL}/trending/tv/day?api_key=${key}`);
      const data = await response.data;
      setTrendingSeries(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get top movies
  const getTopMovies = async () => {
    setIsLoading(true);
    try {
      const response = await axios(`${rootURL}/movie/top_rated?api_key=${key}`);
      const data = await response.data;
      setTopMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get top series
  const getTopSeries = async () => {
    setIsLoading(true);
    try {
      const response = await axios(`${rootURL}/tv/top_rated?api_key=${key}`);
      const data = await response.data;
      setTopSeries(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get results
  const getSearchedValue = async (value) => {
    try {
      const response = await axios(
        `${rootURL}/search/multi?api_key=${key}&query=${value}`
      );
      const data = response.data;
      setResults(data);
      setHasSearched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const res = await fetch(userWatchListApi);
      const data = await res.json();
      const watchlistItems = data.map((item) => ({
        id: item.itemId,
        type: item.type,
      }));
      setWatchlist(watchlistItems);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) fetchWatchlist();
  }, [user]);

  const getUserWatchList = async (value) => {
    try {
      const response = await axios(
        `${rootURL}/search/multi?api_key=${key}&query=${value}`
      );
      const data = response.data;
      setUserWatchList(data);
    } catch (error) {
      console.log(error);
    }
  };

  // get all movies
  const getAllMovies = async (pageNum) => {
    setIsLoading(true);
    try {
      const response = await axios(`${rootURL}/movie/now_playing`, {
        params: {
          api_key: `${key}`,
          page: pageNum,
        },
      });
      setAllMovies(response.data.results);
      setTotalPages(response.data.total_pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // get all series
  const getAllSeries = async (pageNum) => {
    setIsLoading(true);
    try {
      const response = await axios(`${rootURL}/tv/top_rated`, {
        params: {
          api_key: `${key}`,
          page: pageNum,
        },
      });
      setAllSeries(response.data.results);
      setTotalPages(response.data.total_pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // btn to add to watchlist
  const addToWatchList = async (userId, itemId, type) => {
    try {
      const res = await watchListApi.post('/', { userId, itemId, type });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWatchlist = async (userId, itemId, type) => {
    await addToWatchList(userId, itemId, type);

    // update local state so UI updates immediately
    // setWatchlist((prev) => [...prev, { id: itemId, type }]);
    fetchWatchlist();
  };

  // fetch watchlist items to watchlist page
  const fetchWatchlistItem = async ({ id, type }) => {
    try {
      const res = await axios(`${rootURL}/${type}/${id}?api_key=${key}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const watchListResult = async () => {
    setIsLoading(true);
    try {
      if (!watchlist || watchlist.length === 0) return;

      const listItems = await Promise.all(
        watchlist.map((item) => fetchWatchlistItem(item))
      );
      setWListItems(listItems);
      setIsLoading(false);
      console.log('Watchlist data:', listItems);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAll = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/watchlist/all/${user.email}`
      );
      setWListItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (watchlist.length > 0) {
      watchListResult();
    }
  }, [watchlist]);

  useEffect(() => {
    getTrendingMovies();
    getTrendingSeries();
    getTopMovies();
    getTopSeries();
    // addToWatchList();
    getUserWatchList();
  }, []);

  return (
    <DataContext.Provider
      value={{
        trendingMovies,
        trendingSeries,
        topMovies,
        topSeries,
        getSearchedValue,
        results,
        hasSearched,
        setHasSearched,
        getAllMovies,
        allMovies,
        totalPages,
        setTotalPages,
        isLoading,
        getAllSeries,
        allSeries,
        addToWatchList,
        setUserWatchList,
        userWatchList,
        watchlist,
        wListItems,
        handleAddToWatchlist,
        deleteAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};

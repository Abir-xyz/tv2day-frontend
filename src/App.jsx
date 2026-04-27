import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Login,
  Home,
  PrivateRoute,
  Desc,
  DescTv,
  Episodes,
  Contact,
  Error,
  Search,
  AllMovies,
  AllSeries,
  Warning,
  Watchlist,
  Category,
} from './pages/index';
import { Footer } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/watchlist'
          element={
            <PrivateRoute>
              <Watchlist />
            </PrivateRoute>
          }
        />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/movie/:id' element={<Desc />} />
        <Route path='/tv/:id' element={<DescTv />} />
        <Route path='/tv/:id/season/:number' element={<Episodes />} />
        {/* <Route path='/contact' element={<Contact />} /> */}
        <Route path='/search' element={<Search />} />
        <Route path='/allmovies' element={<AllMovies />} />
        <Route path='/allseries' element={<AllSeries />} />
        <Route path='/category' element={<Category />} />
        <Route path='/warning' element={<Warning />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

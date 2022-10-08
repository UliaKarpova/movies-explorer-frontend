import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext';

import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import * as apiAuth from '../../utils/apiAuth'; 
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import api from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isUserRegistred, setIsUserRegistred] = useState(false);
  const [movies, setMovies] = useState([]);
  const [findedMovies, setFindedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (loggedIn) {
        Promise.all([
        mainApi.getUserInfo(),
        mainApi.getSavedMovies()])
        .then(([info, movies]) => {
            setCurrentUser(info);
            setSavedMovies(movies);
            console.log(info);
        }).catch((err) => console.log(err));
    }
}, [loggedIn, history])
  
  function handleRegisterSubmit(data) {
    apiAuth.register(data)
    .then((res) => {
        if (res) {
            setIsUserRegistred(true);
            console.log(isUserRegistred);
            history.push('/signin');
        } else {
            setIsUserRegistred(false);
        }
    }).catch((err) => console.log(err));
}

  function handleLoginSubmit(data) {
    apiAuth.auth(data)
    .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        console.log(res);
        history.push('/movies');
    }).catch((err) => console.log(err));
}


  function findMovies(value) {
    setMovies([]);
    api.getMovies()
    .then((res) => {
      setMovies(res);
      const results = movies.filter(function (item) {
        return item.nameRU.toLowerCase().includes(value.toLowerCase()) || item.nameEN.toLowerCase().includes(value.toLowerCase());
      });
      setFindedMovies(results);
    }).catch((err) => console.log(err));    
  }

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>

      <Switch>
        <ProtectedRoute path='/movies' loggedIn={loggedIn}>
          <Movies movies={findedMovies} findMovies={findMovies} />
        </ProtectedRoute>

        <ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
          <SavedMovies />
        </ProtectedRoute>

        <ProtectedRoute path='/profile' loggedIn={loggedIn}>
          <Profile />
        </ProtectedRoute>
        
        <Route exact path='/'>
          <Main />
        </Route>
      
        <Route path='/signup'>
          <Register onSubmit={handleRegisterSubmit} />
        </Route>

        <Route path='/signin'>
          <Login onSubmit={handleLoginSubmit} />
        </Route>

        <Route>
          {loggedIn ? (
            <Redirect to="/movies" />
          ) : (
            <Redirect to="/signin" />
          )}
        </Route>

      </Switch>
      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;

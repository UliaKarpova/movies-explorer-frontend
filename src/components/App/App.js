import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

import * as authApi from '../../utils/AuthApi'; 
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedSignRoute from '../ProtectedRoute/ProtectedSignRoute';
import api from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function App() {
	const history = useHistory();
	const [currentUser, setCurrentUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);

	const [preloaderStarts, setPreloaderStarts] = useState(false);
	/* const [isUserRegistred, setIsUserRegistred] = useState(false); */
	const [isMovieShort, setIsMovieShort] = useState(false);
	const [findingValue, setFindingValue] = useState('');
	const [findedMovies, setFindedMovies] = useState([]);
	const [isSavedMovieShort, setIsSavedMovieShort] = useState(false);

	const [savedMovies, setSavedMovies] = useState([]);

  	useEffect(() => {
		if (loggedIn) {
		const token = localStorage.getItem('token');
			mainApi.getSavedMovies(token)
				.then((movies) => {
					if (movies) {
						console.log(movies.movies);
					setSavedMovies(movies.movies);
					console.log(savedMovies);
				}
				console.log(savedMovies);
				}).catch((err) => console.log(err));
		}
		const movies = JSON.parse(localStorage.getItem('findedMovies'));
		setFindedMovies(movies);
		const toggle = localStorage.getItem('short');
		setIsMovieShort(Boolean(toggle));
		const value = localStorage.getItem('findingValue');
		setFindingValue(value);	
	}, [loggedIn, history]) 
  

	useEffect(() => {
		tokenCheck();
	}, [])

	function handleCheckboxClick() {
		setIsMovieShort(!isMovieShort);
	}

	function handleSavedMovieCheckboxClick() {
		setIsSavedMovieShort(!isSavedMovieShort);
	}

	function saveMovie(movie) {
		if (savedMovies.some((item) => item.movieId === movie.id)) {
			return;
		} else {
			mainApi.saveMovie(movie)
			.then((newMovie) => {
				console.log(newMovie);
				setSavedMovies([newMovie.movie, ...savedMovies]);
			}).catch((err) => console.log(err))
		}
	}

	function removeSavedMovie(movie) {
		mainApi.deleteMovie(movie._id)
		.then((res) => {
			console.log(res);
			const newList = savedMovies.filter((item) => {
				return !(item._id === res.movie._id);
			})
			setSavedMovies(newList);
		}).catch((err) => console.log(err));
	}


	function handleSavedOrRemoveMovie(movie) {
		console.log(movie);
		if (movie.isSaved) {
			removeSavedMovie(movie);
		} else {
			saveMovie(movie);
		}
	}

	function tokenCheck() {
		const jwt = localStorage.getItem('token');

		if (jwt) {
			authApi.getUserInfo(jwt)
				.then((res) => {
				if (res) {
					setCurrentUser({
						name: res.name,
						id: res._id,
						email: res.email,
						});
					setLoggedIn(true);
					history.push('/movies');
				}
				}).catch((err) => console.log(err));
		};
	}

	function handleRegisterSubmit(data) {
		authApi.register(data)
			.then((res) => {
				if (res) {
					history.push('/signin');
				}
			}).catch((err) => console.log(err));
	}

	function handleLoginSubmit(data) {
		authApi.auth(data)
			.then((res) => {
				if (res.token) {
					setLoggedIn(true);
					setCurrentUser(data);
					history.push('/movies');
				}
			}).catch((err) => console.log(err));
	}

	function logout() {
		setLoggedIn(false);
		setCurrentUser({});
		setSavedMovies([]);
		setFindedMovies([]);
		setFindingValue('');
		/*setIsMovieShort(false);
		localStorage.removeItem('short');
		localStorage.removeItem('findingValue');
		localStorage.removeItem('findedMovies');*/
		localStorage.removeItem('token');
		/* setIsUserRegistred(false); */
	}

	function findMovies(value) {
		setFindedMovies([]);
		setPreloaderStarts(true);
		setFindingValue(value);
		console.log(isMovieShort);
		localStorage.setItem('short', isMovieShort);
		localStorage.setItem('findingValue', value);
		api.getMovies()
			.then((res) => {
				const results = findByValue(value, res);
				const filtredMovies = moviesFilter(results);
				if (isMovieShort) {
					console.log(isMovieShort);
					const shortMovies = filtredMovies.filter(function (item) {
						return item.duration <= 40;
					})
					console.log(shortMovies);
					setFindedMovies(shortMovies);
				} else {
					setFindedMovies(filtredMovies);
				}
				setPreloaderStarts(false);
				localStorage.setItem('findedMovies', JSON.stringify(findedMovies));
			}).catch((err) => console.log(err));    
	}


	function findSavedMovies(value) {
        const results = findByValue(value, savedMovies);
		setSavedMovies(results);
	}

		function moviesFilter(data) {
			data.forEach((item) => {
				if (savedMovies.some((movie) => movie.movieId === item.id)) {
					item.isSaved = true;
					return item;
				} else {
					item.isSaved = false;
					return item;
				}
			})
			return data;
		}

		function findByValue(value, data) {
			const results = data.filter(function (item) {
				return item.nameRU.toLowerCase().includes(value.toLowerCase()) || item.nameEN.toLowerCase().includes(value.toLowerCase());
			});
			return results;
		}
console.log(savedMovies);

  	return (
		<div className='App'>
			<CurrentUserContext.Provider value={currentUser}>
			<Switch>
				<ProtectedRoute path='/movies' loggedIn={loggedIn}>
					<Movies isMovieShort={isMovieShort} 
					clickOnIcon={handleSavedOrRemoveMovie} 
					onClick={handleCheckboxClick} 
					movies={findedMovies} 
					findMovies={findMovies}
					defaultValue={findingValue}
					preloaderStarts={preloaderStarts} />
				</ProtectedRoute>

				<ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
					<SavedMovies 
					isMovieShort={isSavedMovieShort} 
					clickOnIcon={removeSavedMovie} 
					onClick={handleSavedMovieCheckboxClick} 
					movies={savedMovies} 
					findMovies={findSavedMovies}
					preloaderStarts={preloaderStarts} />
				</ProtectedRoute>

				<ProtectedRoute path='/profile' loggedIn={loggedIn}>
					<Profile logout={logout} />
				</ProtectedRoute>
				
				<Route exact path='/'>
					<Main loggedIn={loggedIn} />
				</Route>
			
				<ProtectedSignRoute path='/signup'>
					<Register onSubmit={handleRegisterSubmit} />
				</ProtectedSignRoute>

				<ProtectedSignRoute path='/signin'>
					<Login onSubmit={handleLoginSubmit} />
				</ProtectedSignRoute>

				<Route>
					<NotFound />
				</Route>
			</Switch>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;

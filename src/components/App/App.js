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

import api from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import * as authApi from '../../utils/AuthApi'; 

import { noSavedMovies, searchError, searchErrorMovieNotFound, searchNoValues } from '../../utils/messages_errors';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedSignRoute from '../ProtectedRoute/ProtectedSignRoute';

function App() {
	const history = useHistory();
	const [currentUser, setCurrentUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);

	const [preloaderStarts, setPreloaderStarts] = useState(false);

	const [allMovies, setAllMovies] = useState([]);

	const [isMovieShort, setIsMovieShort] = useState(false);
	const [findingValue, setFindingValue] = useState('');
	const [findedMovies, setFindedMovies] = useState([]);

	const [savedMovies, setSavedMovies] = useState([]);
	const [isSavedMovieShort, setIsSavedMovieShort] = useState(false);
	const [findedSavedMovies, setFindedSavedMovies] = useState([]);

	const [moviesAmount, setMoviesAmount] = useState();
	const [addMoviesAmount, setAddMoviesAmount] = useState();

	const [errorMessage, setErrorMessage] = useState('');
	const [apiError, setApiError] = useState('');

  	useEffect(() => {
		if (loggedIn) {
			const token = localStorage.getItem('token');

            Promise.all([
				authApi.getUserInfo(token),
				mainApi.getSavedMovies(token)])
					.then(([user, userMovies]) => {
						setCurrentUser({
							name: user.name,
							id: user._id,
							email: user.email,
							});
						const movies = userMovies.movies.filter((item) => item.owner === user._id);
						setSavedMovies(movies);
					}).catch((err) => setApiError(err.message));

			const movies = JSON.parse(localStorage.getItem('findedMovies'));
			setFindedMovies(movies);
			const toggle = JSON.parse(localStorage.getItem('short'));
			setIsMovieShort(Boolean(toggle));
			const value = localStorage.getItem('findingValue');
			setFindingValue(value);
			history.push('/movies');
		}
		}, [loggedIn, history])
		
	useEffect(() => {
		tokenCheck();
	}, [])
	
	useEffect(() => {
		window.addEventListener('resize', listenerCallback);
		return () => {
			window.removeEventListener('resize', listenerCallback);
		}
	}, [])

	useEffect(() => {
		resizedEnded();
	}, [])

	let resizeDisplay;

	function listenerCallback() {
		clearTimeout(resizeDisplay);
		resizeDisplay = setTimeout(resizedEnded, 500);
	};

	function resizedEnded() {
		const width = window.innerWidth;
		if (width > 900) {
			setMoviesAmount(12);
			setAddMoviesAmount(3);
		} else if (width > 550) {
			setMoviesAmount(8);
			setAddMoviesAmount(2);
		} else {
			setMoviesAmount(5);
			setAddMoviesAmount(2);
		}
	}

	function tokenCheck() {
		const jwt = localStorage.getItem('token');
		if (jwt) {
			setLoggedIn(true);
		};
	}

	function handleRegisterSubmit(data, resetForm) {
		setPreloaderStarts(true);
		authApi.register(data)
			.then((res) => {
				if (res) {
					handleLoginSubmit(data, resetForm);
				}
			}).catch((err) => {
				setPreloaderStarts(false);
				setApiError(err)
			});
	}

	function handleLoginSubmit(data, resetForm) {
		setPreloaderStarts(true);
		const { email, password } = data;
		authApi.auth({ email, password })
			.then((res) => {
				if (res.token) {
					localStorage.setItem('token', res.token);
					setLoggedIn(true);
					setApiError('');
					resetForm();
					setPreloaderStarts(false);
				}
			}).catch((err) => {
				setPreloaderStarts(false);
				setApiError(err);
			});
	}

	function logout() {
		setLoggedIn(false);
		setCurrentUser({});
		setSavedMovies([]);
		setFindedMovies([]);
		setFindingValue('');
		setIsMovieShort(false);
		setFindedSavedMovies([]);
		setApiError('');
		setErrorMessage('');
		localStorage.removeItem('short');
		localStorage.removeItem('findingValue');
		localStorage.removeItem('findedMovies');
		localStorage.removeItem('token');
	}

	function changeUserInfo(data) {
		const jwt = localStorage.getItem('token');
		setPreloaderStarts(true);
		const newInfo = { 
			name: data.name || currentUser.name,
			email: data.email || currentUser.email,
		}

		authApi.patchtUserInfo(jwt, newInfo)
			.then((res) => {
				setCurrentUser(res);
				setPreloaderStarts(false);
			}).catch((err) => {
				setPreloaderStarts(false);
				setApiError(err);
			});
	}

	function handleCheckboxClick() {
		setIsMovieShort(!isMovieShort);
	}

	function handleSavedMovieCheckboxClick() {
		setIsSavedMovieShort(!isSavedMovieShort);
	}

	function saveMovie(newMovie, buttonToggle) {
		mainApi.saveMovie(newMovie)
		.then((res) => {
			setSavedMovies([res.movie, ...savedMovies]);
			buttonToggle();
		}).catch((err) => setApiError(err.message))
	}

	function deleteMovie (movie, buttonToggle) {
		mainApi.deleteMovie(movie._id)
		.then((res) => {
			const newList = savedMovies.filter((item) => {
				return !(item._id === movie._id);
			})
			setSavedMovies(newList);
			buttonToggle();
		}).catch((err) => setApiError(err.message));
	}

	function removeSavedMovie(movie, buttonToggle) {
		if (!movie._id) {
			const movieForDelete = savedMovies.find((item) => item.movieId === movie.id);
			deleteMovie(movieForDelete, buttonToggle);
		} else {
			deleteMovie(movie, buttonToggle);
		}	
	}

	function getMovies(value) {
		api.getMovies()
			.then((res) => {
				setErrorMessage('');
				setAllMovies(res);
				getFindedMovies(value, res);
			}).catch((err) => setErrorMessage(searchError));
	}

	function getFindedMovies(value, movies) {
		const result = findByValue(value, movies);
		if (!result) {
			setFindedMovies([]);
			setPreloaderStarts(false);
			return setErrorMessage(searchErrorMovieNotFound);
		} else {
			if (isMovieShort) {
				const shortMovies = checkIsMovieShort(result);
				if (shortMovies.length === 0) {
					setFindedMovies([]);
					setPreloaderStarts(false);
					return setErrorMessage(searchErrorMovieNotFound);
				} else {
				setFindedMovies(shortMovies);
				localStorage.setItem('findedMovies', JSON.stringify(shortMovies));
				}
			} else {
				setFindedMovies(result);
				localStorage.setItem('findedMovies', JSON.stringify(result));
			}
			setPreloaderStarts(false);
		}
	}

	function findMovies(value) {
		setErrorMessage('');
		if (!value) {
			setFindedMovies([]);
			return setErrorMessage(searchNoValues);
		} else {
			localStorage.setItem('short', JSON.stringify(isMovieShort));
			localStorage.setItem('findingValue', value);
			setPreloaderStarts(true);

			if (allMovies.length === 0) {
				getMovies(value);
			} else {
				getFindedMovies(value, allMovies);
			}
		}	
	}

	function findSavedMovies(value) {
		setErrorMessage('');
		setFindedSavedMovies([]);
		if (!value) {
			setFindedSavedMovies([]);
			return setErrorMessage(searchNoValues);
		} else {
			if (savedMovies.length === 0) {
				return setErrorMessage(noSavedMovies);
			} else {
				setPreloaderStarts(true);
				const results = findByValue(value, savedMovies);
				if (!results) {
					setFindedSavedMovies([]);
					setPreloaderStarts(false);
					return setErrorMessage(searchErrorMovieNotFound);
				} else {
					if (isSavedMovieShort) {
						const shortMovies = checkIsMovieShort(results);
						setFindedSavedMovies(shortMovies);
					} else {
						setFindedSavedMovies(results)
					}
				}
			}
		}
		setPreloaderStarts(false);
	}

	function findByValue(value, data) {
	   const results = data.filter(function (item) {
			return item.nameRU.toLowerCase().includes(value.toLowerCase()) || item.nameEN.toLowerCase().includes(value.toLowerCase());
		});
 		if (results.length === 0) {
			setErrorMessage(searchErrorMovieNotFound);
			return;
		} else {
			return results;
		}
	}

	function checkIsMovieShort(movies) {
		const shortMovies = movies.filter(function (item) {
			return item.duration <= 40;
		})
		return shortMovies;
	}

	function removeErrorMessage() {
		setErrorMessage('');
	}

	function resetApiError() {
		setApiError('');
	}

  	return (
		<div className='App'>
			<CurrentUserContext.Provider value={currentUser}>
			<Switch>
				<ProtectedRoute path='/movies' 
				loggedIn={loggedIn}>
					<Movies isMovieShort={isMovieShort}
					savedMovies={savedMovies}
					searchError={errorMessage}
					moviesAmount={moviesAmount}
					addMoviesAmount={addMoviesAmount}
					saveMovie={saveMovie}
					removeSavedMovie={removeSavedMovie}
					onClick={handleCheckboxClick} 
					onChange={removeErrorMessage}
					movies={findedMovies} 
					findMovies={findMovies}
					defaultValue={findingValue}
					preloaderStarts={preloaderStarts} />
				</ProtectedRoute>

				<ProtectedRoute path='/saved-movies' 
				loggedIn={loggedIn}>
					<SavedMovies searchError={errorMessage}
					findedSavedMovies={findedSavedMovies}
					defaultValue=''
					isMovieShort={isSavedMovieShort} 
					removeSavedMovie={removeSavedMovie} 
					onClick={handleSavedMovieCheckboxClick}
					onChange={removeErrorMessage}
					movies={savedMovies} 
					findMovies={findSavedMovies}
					preloaderStarts={preloaderStarts} />
				</ProtectedRoute>

				<ProtectedRoute path='/profile' 
				loggedIn={loggedIn}>
					<Profile logout={logout}
					resetApiError={resetApiError}
					apiError={apiError}
					preloaderStarts={preloaderStarts}
					changeUserInfo={changeUserInfo} />
				</ProtectedRoute>
				
				<Route exact path='/'>
					<Main loggedIn={loggedIn} />
				</Route>
			
				<ProtectedSignRoute path='/signup'>
					<Register onSubmit={handleRegisterSubmit}
					resetApiError={resetApiError}
					apiError={apiError}
					preloaderStarts={preloaderStarts} />
				</ProtectedSignRoute>

				<ProtectedSignRoute path='/signin'>
					<Login onSubmit={handleLoginSubmit}
					resetApiError={resetApiError}
					apiError={apiError}
					preloaderStarts={preloaderStarts} />

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

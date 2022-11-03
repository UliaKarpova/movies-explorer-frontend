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
			getSavedMovies(token);
			const movies = JSON.parse(localStorage.getItem('findedMovies'));
			setFindedMovies(movies);
			const toggle = JSON.parse(localStorage.getItem('short'));
			setIsMovieShort(Boolean(toggle));
			const value = localStorage.getItem('findingValue');
			setFindingValue(value);
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
		console.log(width);
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

	function resetApiError() {
		setApiError('');
	}

	function getSavedMovies(userToken) {
		mainApi.getSavedMovies(userToken)
			.then((movies) => {
				if (movies) {
					setSavedMovies(movies.movies);
				}
			}).catch((err) => setApiError(err.message));
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

	function removeSavedMovie(movie, buttonToggle) {
		mainApi.deleteMovie(movie._id)
			.then((res) => {
				const newList = savedMovies.filter((item) => {
					return !(item._id === movie._id);
				})
				setSavedMovies(newList);

				if (buttonToggle) {
					buttonToggle();
				} else {
					const newFindedMovies = findedMovies.map((item) => {
						if (item.id === movie.movieId) {
							item.isSaved = false;
							return item;
						} else {
							return item;
						}
					})
					setFindedMovies(newFindedMovies);				
					localStorage.setItem('findedMovies', JSON.stringify(findedMovies));
				}
			}).catch((err) => setApiError(err.message));
	}

	function handleSavedOrRemoveMovie(movie, newMovie, buttonToggle) {
		if (movie.isSaved) {
			const movieForDelete = savedMovies.find((item) => item.movieId === movie.id);
			removeSavedMovie(movieForDelete, buttonToggle);
		} else {
			saveMovie(newMovie, buttonToggle);
		}
	}

	function getUserInfo(token) {
		authApi.getUserInfo(token)
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
			}).catch((err) => setApiError(err));
	}

	function tokenCheck() {
		const jwt = localStorage.getItem('token');
		if (jwt) {
			getUserInfo(jwt);
		};
	}

	function handleRegisterSubmit(data, resetForm) {
		setPreloaderStarts(true);
		authApi.register(data)
			.then((res) => {
				if (res) {
					handleLoginSubmit(res.data, resetForm);
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
					getUserInfo(res.token);
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
			const filtredMovies = moviesFilter(result);
			if (isMovieShort) {
				const shortMovies = checkIsMovieShort(filtredMovies);
				setFindedMovies(shortMovies);
				localStorage.setItem('findedMovies', JSON.stringify(shortMovies));
			} else {
				setFindedMovies(filtredMovies);
				localStorage.setItem('findedMovies', JSON.stringify(filtredMovies));
			}
			setPreloaderStarts(false);
		}
	}

	function checkIsMovieShort(movies) {
		const shortMovies = movies.filter(function (item) {
			return item.duration <= 40;
		})
		return shortMovies;
	}

	function removeDefaultValue() {
		setFindingValue('');
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
 		if (results.length === 0) {
			setErrorMessage(searchErrorMovieNotFound);
			return;
		} else {
			return results;
		}
	}

  	return (
		<div className='App'>
			<CurrentUserContext.Provider value={currentUser}>
			<Switch>
				<ProtectedRoute path='/movies' 
				loggedIn={loggedIn}>
					<Movies isMovieShort={isMovieShort}
					removeDefaultValue={removeDefaultValue}
					searchError={errorMessage}
					moviesAmount={moviesAmount}
					addMoviesAmount={addMoviesAmount}
					clickOnIcon={handleSavedOrRemoveMovie} 
					onClick={handleCheckboxClick} 
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
					clickOnIcon={removeSavedMovie} 
					onClick={handleSavedMovieCheckboxClick} 
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

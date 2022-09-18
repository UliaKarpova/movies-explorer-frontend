import './App.css';
import { Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  return (
    <div className="page">
      <CurrentUserContext.Provider>
        <Switch>
          <Route exact path="/">
            {/* <AboutProgect /> */}
          </Route>
          <Route path="/movies">
            {/* <Movies /> */}
          </Route>
          <Route path="/saved-movies">
            {/* <SavedMovies /> */}
          </Route>
          <Route path="/profile">
            {/* <Profile /> */}
          </Route>
          <Route path="/signup">
            {/* <Register /> */}
          </Route>
          <Route path="/signin">
            {/* <Login /> */}
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

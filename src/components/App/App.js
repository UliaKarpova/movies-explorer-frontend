import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className='App'>
      <Route exact path='/'>
        <Main />
      </Route>
      <Route path='/movies'>
        <Movies />
      </Route>
    </div>
  );
}

export default App;

import React from 'react';
import './styles/app.scss';

import HomeView from './components/Views/HomeView';
import Nav from './components/Nav/Nav';
import TopBar from './components/TopBar/TopBar';

function App() {
  return (
    <div className="App container-fluid">

      <div className="row">
        <div className="col topbar">
          <TopBar />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-1 nav">
          <Nav />
        </div>
        <div className="col-sm-8 views">
          <HomeView />
        </div>
      </div>

    </div>
  );
}

export default App;

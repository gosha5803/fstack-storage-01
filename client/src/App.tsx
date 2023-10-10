import { ChangeEvent, useState } from 'react';
import './App.css';
import AppRouter from './Components/AppRouter';
import NavBar from './Components/NavBar';

function App() {

  return (
    <div className="App">
      <NavBar/>
      <AppRouter/>
    </div>
  );
}

export default App;

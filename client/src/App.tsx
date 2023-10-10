import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import AppRouter from './Components/AppRouter';
import NavBar from './Components/NavBar';
import { registerApi } from './api/authApi';

function App() {
  registerApi.useCheckRegisterQuery()

  return (
    <div className="App">
      <NavBar/>
      <AppRouter/>
    </div>
  );
}

export default App;

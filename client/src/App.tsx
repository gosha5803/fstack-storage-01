import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import AppRouter from './Components/AppRouter';
import NavBar from './Components/NavBar';
import { registerApi } from './api/authApi';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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

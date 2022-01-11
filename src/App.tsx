import React from 'react';
import logo from './logo.svg';
import './App.css';
import Comments from './components/Comments/Comments';
import ContextProvider from './context/useData';

function App() {
  return (
    <ContextProvider>
      <Comments />
    </ContextProvider>
  );
}

export default App;

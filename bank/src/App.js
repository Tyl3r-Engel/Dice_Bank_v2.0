import React from 'react';
import LoginPage from './components/loginPage/LoginPage';
//import Box from '@mui/material/Box';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPage />
        {/* <Box sx={{background : 'black', height: '3em'}} /> */}
      </header>
    </div>
  );
}

export default App;

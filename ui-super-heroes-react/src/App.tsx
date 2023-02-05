import React from 'react';
import logo from './logo.svg';
import { Fight } from './features/fight/Fight';
import './App.css';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { amber, deepPurple, red } from '@mui/material/colors';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: deepPurple[700]
      },
      secondary: {
        main: amber[500]
      },
      warning: {
        main: red[800]
      }
    }
  })
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Fight/>
      </div>
    </ThemeProvider>
  );
}

export default App;

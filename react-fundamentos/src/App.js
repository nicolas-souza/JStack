import React, { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/global';
import Layout from './components/Layout';

import themes from './styles/themes'



function App() {

  const ls = JSON.parse(localStorage.getItem('key'));

  const [theme, setTheme] = useState(ls);

  const currentTheme = useMemo(() => {
    return themes[theme] || themes.dark
  }, [theme]);
  
  function handleToggleTheme(){
    setTheme(prevState => prevState == 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    //função a ser executada durante o efeito
    localStorage.setItem('key', JSON.stringify(theme));
   
  }, [theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Layout 
              onToggleTheme = {handleToggleTheme}
              selectedTheme = {theme}
        />
      
    </ThemeProvider>
  );
};

export default App;

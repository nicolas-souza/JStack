import React, {useEffect} from 'react';

import Header from '../Header';
import Footer from '../Footer';

import Routes from '../../Routes';

export default function Layout({ onToggleTheme, selectedTheme }) {

  return (
    <>
      <Header 
        onToggleTheme = {onToggleTheme}
        selectedTheme = {selectedTheme}
      />
      <Routes></Routes>
      <Footer 
        onToggleTheme = {onToggleTheme}
        selectedTheme = {selectedTheme}  
      />
    </>
  );
}

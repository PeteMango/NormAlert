import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { Hello } from './components/Hello';
import { ChatGPT } from './components/ChatGPT';
import { Nav } from './components/Nav';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './components/SignIn';
import { SignOut } from './components/SignOut';
import { MedicalForm } from './components/MedicalForm';
import { Button } from './components/Button';
import { Optional } from './components/Optional';
import { Final } from './components/Final';
import { Sidebar } from './components/Sidebar';

export default function App({ isSignedIn, contractId, wallet }) {

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    return <SignIn onClick={() => wallet.signIn()}/>;
  }
  return (
    <>
      <Nav />
      <SignOut accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Hello />} />
          <Route path="first-aid" element={<ChatGPT /> } />
          <Route path="medical-history" element={<MedicalForm />} />
          <Route path="button" element={<Button />} />
          <Route path="optional" element={<Optional />} />
          <Route path="final" element={<Final />} />
          <Route path="sidebar" element={<Sidebar />} />
        </Routes>
      </Router>
    </>
  );
}
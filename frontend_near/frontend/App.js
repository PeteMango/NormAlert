import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';
import { Hello } from './components/Hello';
import { ChatGPT } from './components/ChatGPT';
import { Nav } from './components/Nav';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './components/SignIn';

export default function App({ isSignedIn, contractId, wallet }) {
  // const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  // const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  // React.useEffect(() => {
  //   getGreeting()
  //     .then(setValueFromBlockchain)
  //     .catch(alert)
  //     .finally(() => {
  //       setUiPleaseWait(false);
  //     });
  //   }
  // , []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    // return <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()}/>;
    return <SignIn onClick={() => wallet.signIn()}/>;
  }

  // function changeGreeting(e) {
  //   e.preventDefault();
  //   setUiPleaseWait(true);
  //   const { greetingInput } = e.target.elements;
    
  //   // use the wallet to send the greeting to the contract
  //   wallet.callMethod({ method: 'set_greeting', args: { message: greetingInput.value }, contractId })
  //     .then(async () => {return getGreeting();})
  //     .then(setValueFromBlockchain)
  //     .finally(() => {
  //       setUiPleaseWait(false);
  //     });
  // }

  // function getGreeting(){
  //   // use the wallet to query the contract's greeting
  //   return wallet.viewMethod({ method: 'get_greeting', contractId })
  // }

  return (
    <>
      <Nav />
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Hello />} />
          <Route path="aid" element={<ChatGPT /> } />
        </Routes>
      </Router>
      {/* <main className={uiPleaseWait ? 'please-wait' : ''}>
        <h1>
          The contract says: <span className="greeting">{valueFromBlockchain}</span>
        </h1>
        <form onSubmit={changeGreeting} className="change">
          <label>Change greeting:</label>
          <div>
            <input
              autoComplete="off"
              defaultValue={valueFromBlockchain}
              id="greetingInput"
            />
            <button>
              <span>Save</span>
              <div className="loader"></div>
            </button>
          </div>
        </form>
        <EducationalText/>
      </main> */}
    </>
  );
}
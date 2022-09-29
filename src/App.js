//IMPORTS
import React, { useEffect, useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

//CONSTANTS

const App = () => {
  //useSTATE
// //   useState is a hook to track data that belongs to the function component. 
// When state changes, the function component responds by re-rendering. 
// In this case, the data is users' wallet addresses.
  const [walletAddress, setWalletAddress] = useState(null);
  
  //TOASTS

  //ACTIONS
//  Here we’re checking the window object in our DOM to see if the Phantom Wallet extension has injected the solana object. If we do have an solana object, we can also check to see if it's a Phantom Wallet.

  const checkIfWalletIsConnected = async () => {
    try {
        const { solana } = window;

        if (solana) {
            if (solana.isPhantom) {
                console.log('Phantom wallet found!');

                const response = await solana.connect({ onlyIfTrusted: true });
                console.log(
                    'Connected with Public Key:',
                    response.publicKey.toString()
                );
                setWalletAddress(response.publicKey.toString());
            }
        } else {
            alert('To sign in, download a Phantom Wallet 👻 at https://phantom.app'
            );
        }
    } catch (error) {
        console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
        const response = await solana.connect();
        console.log(
            'Connected with Public Key:', 
        response.publicKey.toString()
        );
        setWalletAddress(response.publicKey.toString());
    }
  }; 

  const renderNotConnectedContainer = () => (
    // conditional rendering depending on the state of the dApp
    <div className="container">
    <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
       >
        SIGN IN      
      </button>
      <p className="header">Scene Portal</p>
      <p className="sub-header">Your favorite scenes, on the blockchain</p>
      <div className="moon" />
      <div className="kiki" />
    </div>
  );

  //useEFFECTS
useEffect(() => {
    const onLoad = async () => {
        await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
}, []);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <Toaster
          toastOptions={{
            className: "",
            duration: 3000,
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          }}
        />
        <div className="header-container">
            {!walletAddress && renderNotConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

export default App;

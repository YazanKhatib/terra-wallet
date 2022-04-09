import {
  // NetworkInfo,
  WalletProvider,
  // WalletStatus,
  getChainOptions,
} from '@terra-money/wallet-provider';
import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// getChainOptions(): Promise<{ defaultNetwork, walletConnectChainIds }>
getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById('root')
  );
});

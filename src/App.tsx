import * as React from 'react';
import { ConnectSample } from './components/ConnectSample';
import { CW20TokensSample } from './components/CW20TokensSample';
import { NetworkSample } from './components/NetworkSample';
import { QuerySample } from './components/QuerySample';
import { SignBytesSample } from './components/SignBytesSample';
import { SignSample } from './components/SignSample';
import { TxSample } from './components/TxSample';
import { useWallet, useConnectedWallet, useLCDClient } from '@terra-money/wallet-provider';

const App = () => {
  const { wallets } = useWallet();
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();

  const [bank, setBank] = React.useState<null | string>();

  React.useEffect(() => {
    if (connectedWallet) {
      lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
        setBank(coins.toString());
      });
    } else {
      setBank(null);
    }
  }, [connectedWallet, lcd]);

  return (
    <>
      <header>
        <nav className='w-100 flex h-[100px] items-center justify-center bg-black p-2'>
          <div className='mx-0 lg:mx-20'>
            {wallets[0] && (
              <button className='flex flex-col items-center rounded-full border border-[#4BDB4B] py-1 px-4 text-[#4BDB4B] lg:flex-row lg:px-2'>
                <div className='flex'>
                  <img src='/wallet.png' width='20' height={20} alt='wallet' />
                  <p className='ml-2'>{wallets[0]?.terraAddress}</p>
                </div>
                <p> {bank && <pre>|{bank}</pre>}</p>
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className='m-4 flex flex-col gap-10 lg:m-20'>
        <ConnectSample />
        {/* <QuerySample /> */}
        <TxSample />
        {/* <SignSample />
        <SignBytesSample />
        <CW20TokensSample />
        <NetworkSample /> */}
      </main>
    </>
  );
};
export default App;

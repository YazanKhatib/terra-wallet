import { useWallet, WalletStatus } from '@terra-money/wallet-provider';
import React from 'react';

export function ConnectSample() {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    availableConnections,
    supportFeatures,
    connect,
    install,
    disconnect,
  } = useWallet();

  return (
    <div>
      <h1 className='mb-4 text-4xl font-bold'>Connect Sample</h1>
      <section className='flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-xl'>
        <p className='text-lg'>
          <span className='font-bold'>Status:</span>
          {status}
        </p>
        <p className='text-lg'>
          <span className='font-bold'>Chain ID:</span>
          {network.chainID}
        </p>
        <p className='text-lg'>
          <span className='font-bold'>lcd:</span>
          {network.lcd}
        </p>
        <p className='text-lg'>
          <span className='font-bold'>Name:</span>
          {network.name}
        </p>
        <pre>
          {JSON.stringify(
            {
              status,
              network,
              wallets,
              supportFeatures: Array.from(supportFeatures),
              availableConnectTypes,
              availableInstallTypes,
            },
            null,
            2
          )}
        </pre>
      </section>

      <footer>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            {availableInstallTypes.map((connectType) => (
              <button
                className='mt-6 rounded-full bg-black py-2 px-4 font-semibold text-white'
                key={'install-' + connectType}
                onClick={() => install(connectType)}>
                Install {connectType}
              </button>
            ))}
            {availableConnectTypes.map((connectType) => (
              <button
                className='mt-6 mr-2 rounded-full bg-black py-2 px-4 font-semibold text-white'
                key={'connect-' + connectType}
                onClick={() => connect(connectType)}>
                Connect {connectType}
              </button>
            ))}
            <br />
            {availableConnections.map(({ type, name, icon, identifier = '' }) => (
              <button
                className='mt-6 flex items-center rounded-full bg-black py-2 px-4 font-semibold text-white'
                key={'connection-' + type + identifier}
                onClick={() => connect(type, identifier)}>
                <img
                  className='mr-2'
                  src={icon}
                  alt={name}
                  style={{ width: '1em', height: '1em' }}
                />
                {name} [{identifier}]
              </button>
            ))}
          </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <button
            className='mt-6 rounded-full bg-gray-400 py-2 px-4 font-semibold text-white'
            onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </footer>
    </div>
  );
}

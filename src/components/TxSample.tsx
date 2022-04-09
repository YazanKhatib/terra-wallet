import { Fee, MsgSend } from '@terra-money/terra.js';
import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxResult,
  TxUnspecifiedError,
  useConnectedWallet,
  UserDenied,
} from '@terra-money/wallet-provider';
import React, { useCallback, useState } from 'react';

// const TEST_TO_ADDRESS = 'terra12hnhh5vtyg5juqnzm43970nh4fw42pt27nw9g9';
const TEST_TO_ADDRESS = 'terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal';

export function TxSample() {
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);

  const connectedWallet = useConnectedWallet();

  const proceed = useCallback(() => {
    if (!connectedWallet) {
      return;
    }

    if (connectedWallet.network.chainID.startsWith('columbus')) {
      alert(`Please only execute this example on Testnet`);
      return;
    }

    setTxResult(null);
    setTxError(null);

    connectedWallet
      .post({
        fee: new Fee(1000000, '200000uusd'),
        msgs: [
          new MsgSend(connectedWallet.walletAddress, TEST_TO_ADDRESS, {
            uusd: 1000000,
          }),
        ],
      })
      .then((nextTxResult: TxResult) => {
        console.log(nextTxResult);
        setTxResult(nextTxResult);
      })
      .catch((error: unknown) => {
        if (error instanceof UserDenied) {
          setTxError('User Denied');
        } else if (error instanceof CreateTxFailed) {
          setTxError('Create Tx Failed: ' + error.message);
        } else if (error instanceof TxFailed) {
          setTxError('Tx Failed: ' + error.message);
        } else if (error instanceof Timeout) {
          setTxError('Timeout');
        } else if (error instanceof TxUnspecifiedError) {
          setTxError('Unspecified Error: ' + error.message);
        } else {
          setTxError('Unknown Error: ' + (error instanceof Error ? error.message : String(error)));
        }
      });
  }, [connectedWallet]);

  return (
    <div>
      <h1 className='mb-4 text-4xl font-bold'>Tx Sample</h1>

      {connectedWallet?.availablePost && !txResult && !txError && (
        <button
          className='mt-6 rounded-full bg-gray-400 py-2 px-4 font-semibold text-white'
          onClick={proceed}>
          Send 1USD to {TEST_TO_ADDRESS}
        </button>
      )}

      {txResult && (
        <>
          <pre className='mb-4 flex w-full flex-col justify-between overflow-hidden overflow-x-scroll rounded-2xl bg-white p-6 shadow-xl'>
            <div className='flex justify-between'>
              <p className='text-lg'>
                <span className='font-bold'>Tx Hash:</span>
                {txResult.result.txhash}
              </p>
            </div>
            {JSON.stringify(txResult, null, 2)}
          </pre>

          {connectedWallet && txResult && (
            <div>
              <a
                href={`https://finder.terra.money/${connectedWallet.network.chainID}/tx/${txResult.result.txhash}`}
                target='_blank'
                rel='noreferrer'>
                Open Tx Result in Terra Finder
              </a>
            </div>
          )}
        </>
      )}

      {txError && <pre>{txError}</pre>}

      {(!!txResult || !!txError) && (
        <button
          className='mt-6 rounded-full bg-black py-2 px-4 font-semibold text-white'
          onClick={() => {
            setTxResult(null);
            setTxError(null);
          }}>
          Clear result
        </button>
      )}

      {!connectedWallet && <p>Wallet not connected!</p>}

      {connectedWallet && !connectedWallet.availablePost && (
        <p>This connection does not support post()</p>
      )}
    </div>
  );
}

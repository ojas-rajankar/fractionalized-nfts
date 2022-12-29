import React, { useContext } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import GlobalContext from '../../GlobalContext';
import styled from 'styled-components';

const Button = styled.button`
    background: white;
    padding: 0.7rem;
    border: none;
    outline: none;
    border-radius: 15px;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
`

const CustomConnectButton = () => {

    const user = useContext(GlobalContext)

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                const ready = mounted;
                const connected =
                    ready &&
                    account &&
                    chain
                return (
                    <div                    >
                        {(() => {

                            if (connected) {
                                user.setWallet(account.address)
                            } else {
                                user.setWallet('')
                            }


                            if (!connected) {
                                return (
                                    <Button onClick={openConnectModal} type="button">
                                        Connect Wallet
                                    </Button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <Button onClick={openChainModal} type="button">
                                        Wrong network
                                    </Button>
                                );
                            }

                            return (
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <Button onClick={openAccountModal} type="button">
                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ''}
                                    </Button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default CustomConnectButton
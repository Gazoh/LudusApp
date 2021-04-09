import { useCallback, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { provider } from 'web3-core'
import { Balances } from "../types/Balances";

import BigNumber from "bignumber.js";
import useContract from "./useContract";
import Web3 from 'web3'

const useBalances = (name: Balances) => {
    const { account } = useWallet();
    const { ethereum }: { ethereum: provider } = useWallet()
    const contractHelper = useContract();
    const web3 = new Web3(ethereum);

    // Big Number CONFIG
    BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });

    // Genesis ID'S
    const ludusGenesis001ID = 181087
    const ludusGenesis002ID = 181123
    const ludusGenesis003ID = 181077

    const [amount, setAmount]: any = useState('0')

    /* 
    * @returns Getting the balances of Ludus, LP and LP Staking
    */
    const getBalances = useCallback(() => {
        if (account !== null) {
            // Ludus Balance
            if (name === Balances.LUDUS) {
                const balLudus = contractHelper.Ludus.Contract.methods.balanceOf(account).call();
                balLudus.then((b: any) => {
                    let a = web3.utils.fromWei(b, 'ether');
                    let bn = new BigNumber(a).toPrecision(3);
                    setAmount(bn)
                })
            }
            // Ludus Staking Balance
            if (name === Balances.LUDUS_STAKING) {
                const balLudusStaking = contractHelper.LudusStaking.Contract.methods.balanceOf(account).call();
                balLudusStaking.then((b: any) => {
                    let a = web3.utils.fromWei(b, 'ether');
                    let bn = new BigNumber(a).toPrecision(5);
                    setAmount(bn)
                })
            }
            // LP Staking Balance
            if (name === Balances.LP_STAKING) {
                const balLPStaking = contractHelper.LPStaking.Contract.methods.balanceOf(account).call();
                balLPStaking.then((b: any) => {
                    let a = web3.utils.fromWei(b, 'ether');
                    let bn = new BigNumber(a).toPrecision(3);
                    setAmount(bn)
                })
            }

            // LP Balance
            if (name === Balances.LP) {
                const balLP = contractHelper.UniswapV2.Contract.methods.balanceOf(account).call();
                balLP.then((b: any) => {
                    let a = web3.utils.fromWei(b, 'ether');
                    let bn = new BigNumber(a).toPrecision(3);
                    setAmount(bn)
                })
            }

            // NFT G001 Staking Balance
            if (name === Balances.NFT_G001) {
                const G001StakingBal = contractHelper.NFTStaking.Contract.methods.balanceOf(account, ludusGenesis001ID).call();
                G001StakingBal.then((b: any) => {
                    let a = web3.utils.fromWei(b, 'wei');
                    setAmount(a)
                })
            }

            // NFT G002 Staking Balance
            if (name === Balances.NFT_G002) {
                const G002StakingBal = contractHelper.NFTStaking.Contract.methods.balanceOf(account, ludusGenesis002ID).call();
                G002StakingBal.then((b: any) => {
                    let a = web3.utils.fromWei(b, 'wei');
                    setAmount(a)
                })
            }

            // NFT G003 Staking Balance
            if (name === Balances.NFT_G003) {
                const G003StakingBal = contractHelper.NFTStaking.Contract.methods.balanceOf(account, ludusGenesis003ID).call();
                G003StakingBal.then((b: any) => {
                    let a = web3.utils.fromWei(b, 'wei');
                    setAmount(a)
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account]);

    useEffect(() => {
        getBalances()
    }, [getBalances])

    return amount
}

export default useBalances
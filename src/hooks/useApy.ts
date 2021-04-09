import BigNumber from "bignumber.js";
import { useCallback, useState } from "react";
import { useWallet } from "use-wallet";
import { Contract } from 'web3-eth-contract'

const useApyCalculation = (contract: Contract, NFT?: boolean, NFTMultiplier?: number) => {
    const { account } = useWallet();
    const [amount, setAmount]: any = useState('0')

    // Big Number CONFIG
    BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });

    /* 
    * @returns APY for whatever contract you want to use.
    */
    const calcAPY = useCallback(() => {
        if (account !== null) {
            const rewardRate = contract.methods.rewardRate().call();
            const totalValue = contract.methods.totalValue().call();
            rewardRate.then((RT: any) => {
                totalValue.then((TV: any) => {
                    const calc = ((31556926 * RT) / TV);
                    const APY = new BigNumber(calc);
                    setAmount(parseFloat(APY.toPrecision(6)));
                })
            })
        }
        return amount;
    }, [account, contract, amount])

    /* 
   * @returns NFT APY
   */
    const calcNFTApy = useCallback(() => {
        if (account !== null) {
            const rewardRate = contract.methods.rewardRate().call();
            const totalValueStacked = contract.methods.totalValueStacked().call();
            rewardRate.then((RT: any) => {
                totalValueStacked.then((TVS: any) => {
                    const calc = ((RT * NFTMultiplier) / TVS)
                    const APY = new BigNumber(calc).times(31556926).dividedBy(1e18);
                    setAmount(parseFloat(APY.toPrecision(9)));
                })
            })
        }
        return amount;
    }, [account, contract, amount, NFTMultiplier])

    return !NFT ? calcAPY() : calcNFTApy();
}

export default useApyCalculation
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { getAllowanceNFT } from '../utils/erc20'

const useAllowanceNFT = (contract: Contract, contractAddress: string) => {
    const [allowance, setAllowance] = useState(false)
    const { account }: { account: string; ethereum: provider } = useWallet()

    const fetchAllowance = useCallback(async () => {
        const allowance = await getAllowanceNFT(contract, contractAddress, account)
        setAllowance(allowance)
    }, [account, contract, contractAddress])

    useEffect(() => {
        if (account && contract && contractAddress) {
            fetchAllowance()
        }
        let refreshInterval = setInterval(fetchAllowance, 10000)
        return () => clearInterval(refreshInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, contract, contractAddress, allowance])

    return allowance
}

export default useAllowanceNFT

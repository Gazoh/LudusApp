import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowanceLP } from '../utils/erc20'

const useAllowance = (contract: Contract, contractAddress: string) => {
    const [allowance, setAllowance] = useState(new BigNumber(0))
    const { account }: { account: string; ethereum: provider } = useWallet()

    const fetchAllowance = useCallback(async () => {
        const allowance = await getAllowanceLP(contract, contractAddress, account)
        setAllowance(new BigNumber(allowance))

    }, [account, contract, contractAddress])

    useEffect(() => {
        if (account && contract && contractAddress) {
            fetchAllowance()
        }
        let refreshInterval = setInterval(fetchAllowance, 10000)
        return () => clearInterval(refreshInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, contract, contractAddress])

    return allowance
}

export default useAllowance

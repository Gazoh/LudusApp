import { useMemo } from 'react'
import { useWallet } from 'use-wallet'
import { getContractOf } from '../utils/erc20'
import { provider } from 'web3-core'

import NFTStakingABI from '../assets/abi/NFTStakingABI.json';
import RaribleABI from '../assets/abi/RaribleABI.json';
import LPStakingABI from '../assets/abi/LPStakingABI.json';
import LudusABI from '../assets/abi/LudusABI.json';
import LudusStakingABI from '../assets/abi/LudusStakingABI.json';
import UniswapV2ABI from '../assets/abi/UniswapV2ABI.json';

const useContract = () => {
    // WEB 3
    const { ethereum }: { ethereum: provider } = useWallet()

    // Main Net
    const LudusStakingContractAddress = '0x055c2E794c6e1308B7a1B4c7b80aAf5Ed757c2F6'
    const LudusContractAddress = '0x03fDcAdc09559262F40F5EA61C720278264eB1da'
    const LPStakingContractAddress = '0x9494b87a5bc8D7Be31f88821E5081Dc5aB029EB2'
    const NFTStakingContractAddress = '0x420Ccf524D8b6Ad1144Ea48df212559a836A5261'
    const RaribleContractAddress = '0xd07dc4262BCDbf85190C01c996b4C06a461d2430'
    const UniswapV2ContractAddress = '0x9eaa644489a728f7923da985df1dbecf9a2ebe17'

    // Contracts
    const LudusStakingContract = useMemo(() => { return getContractOf(LudusStakingABI, ethereum as provider, LudusStakingContractAddress) }, [ethereum])
    const LudusContract = useMemo(() => { return getContractOf(LudusABI, ethereum as provider, LudusContractAddress) }, [ethereum])
    const LPStakingContract = useMemo(() => { return getContractOf(LPStakingABI, ethereum as provider, LPStakingContractAddress) }, [ethereum])
    const NFTStakingContract = useMemo(() => { return getContractOf(NFTStakingABI, ethereum as provider, NFTStakingContractAddress) }, [ethereum])
    const RaribleContract = useMemo(() => { return getContractOf(RaribleABI, ethereum as provider, RaribleContractAddress) }, [ethereum])
    const UniswapV2Contract = useMemo(() => { return getContractOf(UniswapV2ABI, ethereum as provider, UniswapV2ContractAddress) }, [ethereum])

    const handleContracts = useMemo(() => {
        return {
            LudusStaking: {
                Contract: LudusStakingContract,
                Address: LudusStakingContractAddress
            },
            Ludus: {
                Contract: LudusContract,
                Address: LudusContractAddress
            },
            LPStaking: {
                Contract: LPStakingContract,
                Address: LPStakingContractAddress
            },
            NFTStaking: {
                Contract: NFTStakingContract,
                Address: NFTStakingContractAddress
            },
            Rarible: {
                Contract: RaribleContract,
                Address: RaribleContractAddress
            },
            UniswapV2: {
                Contract: UniswapV2Contract,
                Address: UniswapV2ContractAddress
            },
        }
    }, [LudusStakingContract, LudusContract, LPStakingContract, NFTStakingContract, RaribleContract, UniswapV2Contract])

    return handleContracts;
}

export default useContract
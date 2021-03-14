import React, { useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../../helpers/icon'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getContractOf } from '../../utils/erc20'

import NFTStakingABI from '../../assets/abi/test/NFTStakingABI.json';
import NFTMockABI from '../../assets/abi/test/NFTMockABI.json';
import LPStakingABI from '../../assets/abi/test/LPStakingABI.json';
import LudusABI from '../../assets/abi/test/LudusABI.json';
import LudusStakingABI from '../../assets/abi/test/LudusStakingABI.json';

import LudusGenesis001 from '../../assets/img/ludusGenesis001.png'
import LudusGenesis002 from '../../assets/img/ludusGenesis002.png'
import LudusGenesis003 from '../../assets/img/ludusGenesis003.png'
import CustomButton from '../../components/CustomButton/CustomButton'
import { sendTransaction } from '../../utils/utils'

const StakingContent: React.FC = () => {
    const { account, ethereum } = useWallet()

    const LudusStakingContractAddress = '0xDb2f554A333D189ed59eA36020a83F7d6De14328'
    const LudusContractAddress = '0xFe44FF05D7C06E792D6eF4762B2441e82Bc602a5'
    const LPStakingContractAddress = '0x94A44de106112A761B69dFBEB1ac6cfdD1B80304'
    const NFTStakingContractAddress = '0x47330D2fe6F75899597C14d615003Ef561B01B14'
    const NFTMockContracttAddress = '0x07bf260a44CEADfad215cc8e20c5b0398D25b1FA'

    const LudusStakingContract = useMemo(() => { return getContractOf(LudusStakingABI, ethereum as provider, LudusStakingContractAddress) }, [account])
    const LudusContract = useMemo(() => { return getContractOf(LudusABI, ethereum as provider, LudusContractAddress) }, [account])
    const LPStakingContract = useMemo(() => { return getContractOf(LPStakingABI, ethereum as provider, LPStakingContractAddress) }, [account])
    const NFTStakingContract = useMemo(() => { return getContractOf(NFTStakingABI, ethereum as provider, NFTStakingContractAddress) }, [account])
    const NFTMockContract = useMemo(() => { return getContractOf(NFTMockABI, ethereum as provider, NFTMockContracttAddress) }, [account])

    const ludusGenesis001ID = 181087
    const ludusGenesis002ID = 181123
    const ludusGenesis003ID = 181077

    const [ludusGenesis001, setLudusGenesis001] = useState(0)
    const [ludusGenesis002, setLudusGenesis002] = useState(0)
    const [ludusGenesis003, setLudusGenesis003] = useState(0)

    const [ludusBalance, setLudusBalance] = useState(0)
    const [lpBalance, setLpBalance] = useState(0)

    useEffect(() => {
        // setting Ludus & LP Balance
        if (account !== null) {
            const balLudus = LudusContract.methods.balanceOf(account).call();
            balLudus.then((b: any) => setLudusBalance(b))
            const balLP = LPStakingContract.methods.balanceOf(account).call();
            balLP.then((b: any) => setLpBalance(b))

        }
    }, [account])

    // NFT Staking

    const approveNFTStaking = async () => {
        const encodedABI = NFTMockContract.methods.setApprovalForAll(NFTStakingContractAddress, true).encodeABI();
        const hx = await sendTransaction(ethereum, account, NFTMockContracttAddress, encodedABI);
        console.log('hx', hx)
        console.log('NFTMockContract', NFTMockContract)
    }

    const stakeNFT = () => {
        const stakeMethode = NFTStakingContract.methods.stake('181087', 1).call();
        stakeMethode.then((staked: any) => console.log('staked', staked))
        console.log('NFTStakingContract', NFTStakingContract)
    }

    // Single Asset Staking

    const approveSingleAsset = async () => {
        // TODO approve amount must be a input for user 
        const encodedABI = LudusContract.methods.approve(account, 10000000000).encodeABI();
        const hx = await sendTransaction(ethereum, account, LudusContractAddress, encodedABI);
        console.log('hx', hx)
    }

    const stakeSingleAsset = () => {
        const stake = LudusStakingContract.methods.stake(10000000000).call();
        stake.then((s: any) => console.log('s', s))
        console.log('LudusStakingContract', LudusStakingContract)
    }

    // LP Staking

    const approveLPStaking = async () => {
        // TODO approve amount must be a input for user 
        const encodedABI = LudusContract.methods.approve(account, 10000000000).encodeABI();
        const hx = await sendTransaction(ethereum, account, LudusContractAddress, encodedABI);
        console.log('hx', hx)
    }

    const stakeLP = () => {
        const stake = LPStakingContract.methods.stake(10000000000).call();
        stake.then((s: any) => console.log('s', s))
        console.log('LPStakingContract', LPStakingContract)
    }

    return (
        <div className='farms-content-wrap'>
            <div className='farms-content'>
                <div className='card-wrap'>
                    <div className='card-title'>NFT Staking</div>
                    <div className='card-content'>
                        <div className='card-content-row'>
                            <img src={LudusGenesis001} alt="LudusGenesis001" />
                            <div className='card-content-row-title'>Ludus Genesis 001</div>
                            <div className={`input-selection ${!account ? 'disabled' : ''}`}>
                                <CustomButton className='nbdr-btn input-selection-icon left' onClick={() => (ludusGenesis001 === 0 || !account) ? null : setLudusGenesis001(ludusGenesis001 - 1)}><FontAwesomeIcon icon={icons.minus} /></CustomButton>
                                <div className='input-selection-number'>{ludusGenesis001}</div>
                                <CustomButton className='nbdr-btn input-selection-icon right' onClick={() => (!account) ? null : setLudusGenesis001(ludusGenesis001 + 1)}><FontAwesomeIcon icon={icons.plus} /></CustomButton>
                            </div>
                        </div>
                        <div className='card-content-row'>
                            <img src={LudusGenesis002} alt="LudusGenesis002" />
                            <div className='card-content-row-title'>Ludus Genesis 002</div>
                            <div className={`input-selection ${!account ? 'disabled' : ''}`}>
                                <CustomButton className='nbdr-btn input-selection-icon left' onClick={() => (ludusGenesis002 === 0 || !account) ? null : setLudusGenesis002(ludusGenesis002 - 1)}><FontAwesomeIcon icon={icons.minus} /></CustomButton>
                                <div className='input-selection-number'>{ludusGenesis002}</div>
                                <CustomButton className='nbdr-btn input-selection-icon right' onClick={() => (!account) ? null : setLudusGenesis002(ludusGenesis002 + 1)}><FontAwesomeIcon icon={icons.plus} /></CustomButton>
                            </div>
                        </div>
                        <div className='card-content-row'>
                            <img src={LudusGenesis003} alt="LudusGenesis003" />
                            <div className='card-content-row-title'>Ludus Genesis 003</div>
                            <div className={`input-selection ${!account ? 'disabled' : ''}`}>
                                <CustomButton className='nbdr-btn input-selection-icon left' onClick={() => (ludusGenesis003 === 0 || !account) ? null : setLudusGenesis003(ludusGenesis003 - 1)}><FontAwesomeIcon icon={icons.minus} /></CustomButton>
                                <div className='input-selection-number'>{ludusGenesis003}</div>
                                <CustomButton className='nbdr-btn input-selection-icon right' onClick={() => (!account) ? null : setLudusGenesis003(ludusGenesis003 + 1)}><FontAwesomeIcon icon={icons.plus} /></CustomButton>
                            </div>
                        </div>
                    </div>
                    <div className='card-content-btm'>
                        <CustomButton className='button' disabled={!account} onClick={approveNFTStaking}>Approve</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account} onClick={stakeNFT}>Stake</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account}>Claim</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account}>Unstake</CustomButton>
                    </div>
                </div>
                <div className='card-wrap-column'>
                    <div className='card-wrap'>
                        <div className='card-title'>Single asset staking</div>
                        <div className='card-content'>
                            <div className='card-content-text'>Your Ludus balans</div>
                            <div className='card-content-number'>{ludusBalance}</div>
                        </div>
                        <div className='card-content-btm'>
                            <CustomButton className='button' disabled={!account} onClick={approveSingleAsset}>Approve</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account} onClick={stakeSingleAsset}>Stake</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account}>Claim</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account}>Unstake</CustomButton>
                        </div>
                    </div>
                    <div className='card-wrap'>
                        <div className='card-title'>LP Staking</div>
                        <div className='card-content'>
                            <div className='card-content-text'>Your LP Balans</div>
                            <div className='card-content-number'>{lpBalance}</div>
                        </div>
                        <div className='card-content-btm'>
                            <CustomButton className='button' disabled={!account} onClick={approveLPStaking}>Approve</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account} onClick={stakeLP}>Stake</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account}>Claim</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account}>Unstake</CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StakingContent

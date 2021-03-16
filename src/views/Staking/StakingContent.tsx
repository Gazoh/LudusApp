import React, { useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../../helpers/icon'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getContractOf } from '../../utils/erc20'
import { sendTransaction } from '../../utils/utils'
import { toast, ToastOptions } from 'react-toastify';
import { countNumbers } from '../../helpers/AnimationHelper';
import { useSpring, animated } from 'react-spring'

import NFTStakingABI from '../../assets/abi/NFTStakingABI.json';
import RaribleABI from '../../assets/abi/RaribleABI.json';
import LPStakingABI from '../../assets/abi/LPStakingABI.json';
import LudusABI from '../../assets/abi/LudusABI.json';
import LudusStakingABI from '../../assets/abi/LudusStakingABI.json';
import UniswapV2ABI from '../../assets/abi/UniswapV2ABI.json';

import LudusGenesis001 from '../../assets/img/ludusGenesis001.png'
import LudusGenesis002 from '../../assets/img/ludusGenesis002.png'
import LudusGenesis003 from '../../assets/img/ludusGenesis003.png'

import CustomButton from '../../components/CustomButton/CustomButton'
import BigNumber from 'bignumber.js'

const StakingContent: React.FC = () => {
    const { account, ethereum } = useWallet()

    // Main Net
    const LudusStakingContractAddress = '0x055c2E794c6e1308B7a1B4c7b80aAf5Ed757c2F6'
    const LudusContractAddress = '0x03fDcAdc09559262F40F5EA61C720278264eB1da'
    const LPStakingContractAddress = '0x9494b87a5bc8D7Be31f88821E5081Dc5aB029EB2'
    const NFTStakingContractAddress = '0x420Ccf524D8b6Ad1144Ea48df212559a836A5261'
    const RaribleTokenContractAddress = '0xd07dc4262BCDbf85190C01c996b4C06a461d2430'
    const UniswapV2ContractAddress = '0x9eaa644489a728f7923da985df1dbecf9a2ebe17'

    const LudusStakingContract = useMemo(() => { return getContractOf(LudusStakingABI, ethereum as provider, LudusStakingContractAddress) }, [account])
    const LudusContract = useMemo(() => { return getContractOf(LudusABI, ethereum as provider, LudusContractAddress) }, [account])
    const LPStakingContract = useMemo(() => { return getContractOf(LPStakingABI, ethereum as provider, LPStakingContractAddress) }, [account])
    const NFTStakingContract = useMemo(() => { return getContractOf(NFTStakingABI, ethereum as provider, NFTStakingContractAddress) }, [account])
    const RaribleContract = useMemo(() => { return getContractOf(RaribleABI, ethereum as provider, RaribleTokenContractAddress) }, [account])
    const UniswapV2Contract = useMemo(() => { return getContractOf(UniswapV2ABI, ethereum as provider, UniswapV2ContractAddress) }, [account])

    const ludusGenesis001ID = 181087
    const ludusGenesis002ID = 181123
    const ludusGenesis003ID = 181077

    const [ludusGenesis001, setLudusGenesis001] = useState(0)
    const [ludusGenesis002, setLudusGenesis002] = useState(0)
    const [ludusGenesis003, setLudusGenesis003] = useState(0)
    const [stakeSingleAssetValue, setStakeSingleAssetValue] = useState(0)
    const [stakeLPValue, setStakeLPValue] = useState(0)


    const [ludusBalance, setLudusBalance] = useState(0)
    const [lpBalance, setLPBalance] = useState(0)

    const ludusBalanceSpring = useSpring(countNumbers(2000, 0, ludusBalance, 0))
    const LPBalanceSpring = useSpring(countNumbers(2000, 0, lpBalance, 0))

    let toastOptionsError: ToastOptions = { type: 'error' }
    let toastOptionsSuccess: ToastOptions = { type: 'success' }

    useEffect(() => {
        // setting Ludus & LP Balance
        if (account !== null) {
            const balLudus = LudusContract.methods.balanceOf(account).call();
            balLudus.then((b: any) => setLudusBalance(parseFloat(b)))
            const balLP = LPStakingContract.methods.balanceOf(account).call();
            balLP.then((b: any) => setLPBalance(parseFloat(b)))

        }
    }, [account, ludusGenesis001, ludusGenesis002, ludusGenesis003, ludusBalance, lpBalance])

    /* 
    * @returns Approves NFT Staking
    */
    const approveNFTStaking = async () => {
        const encodedABI = RaribleContract.methods.setApprovalForAll(NFTStakingContractAddress, true).encodeABI();
        await sendTransaction(ethereum, account, RaribleTokenContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled approve for NFT', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Approve succeeded for NFT', toastOptionsSuccess)
            });
    }

    /* 
    * @returns Stakes your NFT amount
    */
    const stakeNFT = () => {
        if (ludusGenesis001 > 0) {
            const encodedABI = NFTStakingContract.methods.stake(ludusGenesis001ID, ludusGenesis001).encodeABI();
            sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI, '0x0',
                (err: any) => { // onError
                    if (err.code === 4001) {
                        toast('Cancelled stake for NFT', toastOptionsError)
                    } else {
                        toast(err.message, toastOptionsError)
                    }
                },
                () => { // onSuccess
                    toast('Stake succeeded for NFT', toastOptionsSuccess)
                });
        }
        if (ludusGenesis002 > 0) {
            const encodedABI = NFTStakingContract.methods.stake(ludusGenesis002ID, ludusGenesis002).encodeABI();
            sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI, '0x0',
                (err: any) => { // onError
                    if (err.code === 4001) {
                        toast('Cancelled stake for NFT', toastOptionsError)
                    } else {
                        toast(err.message, toastOptionsError)
                    }
                },
                () => { // onSuccess
                    toast('Stake succeeded for NFT', toastOptionsSuccess)
                });
        }
        if (ludusGenesis003 > 0) {
            const encodedABI = NFTStakingContract.methods.stake(ludusGenesis003ID, ludusGenesis003).encodeABI();
            sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI, '0x0',
                (err: any) => { // onError
                    if (err.code === 4001) {
                        toast('Cancelled stake', toastOptionsError)
                    } else {
                        toast(err.message, toastOptionsError)
                    }
                },
                () => { // onSuccess
                    toast('Stake succeeded', toastOptionsSuccess)
                });
        }
    }

    /* 
    * @returns Claims NFT
    */
    const claimNFT = () => {
        const encodedABI = NFTStakingContract.methods.claim().encodeABI();
        sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled claim for NFT', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Claiming succeeded for NFT', toastOptionsSuccess)
            });
    }

    /* 
    * @returns Unstakes all the NFT's
    * @TODO Check current stakes and send transactions to those one's and not to all NFT's
    */
    const unstakeNFT = () => {
        const encodedABI1 = NFTStakingContract.methods.exit(ludusGenesis001ID).encodeABI();
        const encodedABI2 = NFTStakingContract.methods.exit(ludusGenesis002ID).encodeABI();
        const encodedABI3 = NFTStakingContract.methods.exit(ludusGenesis003ID).encodeABI();
        sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI1, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled unstaking for NFT', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Unstaking succeeded for NFT', toastOptionsSuccess)
            });
        sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI2, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled unstaking for NFT', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Unstaking succeeded for NFT', toastOptionsSuccess)
            });
        sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI3, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled unstaking for NFT', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Unstaking succeeded for NFT', toastOptionsSuccess)
            });
    }

    /* 
    * @returns Single asset Approve
    */
    const approveSingleAsset = async () => {
        let amount = new BigNumber(stakeSingleAssetValue).times(1e18).toString(10);
        const encodedABI = LudusContract.methods.approve(account, amount).encodeABI();
        await sendTransaction(ethereum, account, LudusContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled staking for single asset', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Staking succeeded for single asset', toastOptionsSuccess)
            });
    }

    /* 
    * @returns Single Asset Stake
    */
    const stakeSingleAsset = async () => {
        let amount = new BigNumber(stakeSingleAssetValue).times(1e18).toString(10);
        console.log('amount', amount)
        console.log('stakeSingleAssetValue', stakeSingleAssetValue)
        const encodedABI = LudusStakingContract.methods.stake(amount).encodeABI();
        await sendTransaction(ethereum, account, LudusStakingContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled staking for single asset', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Staking succeeded for single asset', toastOptionsSuccess)
            });
    }

    /* 
    * @returns Claims Single asset
    */
    const claimSingleAsset = async () => {
        const encodedABI = LudusStakingContract.methods.claim().encodeABI();
        await sendTransaction(ethereum, account, LudusStakingContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled claim for single asset', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Claiming succeeded for single asset', toastOptionsSuccess)
            });
    }

    /* 
    * @returns Unstakes the Single asset
    */
    const unstakeSingleAsset = async () => {
        const encodedABI = LudusStakingContract.methods.exit().encodeABI();
        await sendTransaction(ethereum, account, LudusStakingContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled claim for single asset', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Claiming succeeded for single asset', toastOptionsSuccess)
            });
    }

    /* 
    * @returns LP Approve
    * @TODO Amount of approve needs to be dynamic
    */
    const approveLPStaking = async () => {
        let amount = new BigNumber(stakeLPValue).times(1e18).toString(10);
        const encodedABI = UniswapV2Contract.methods.approve(account, amount).encodeABI();
        await sendTransaction(ethereum, account, LPStakingContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled approve for LP', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Approve succeeded for LP', toastOptionsSuccess)
            });
    }

    /* 
    * @returns LP Stake
    * @TODO Where do i get the staking amount from?
    */
    const stakeLP = async () => {
        let amount = new BigNumber(stakeLPValue).times(1e18).toString(10);
        const encodedABI = LPStakingContract.methods.stake(amount).encodeABI();
        await sendTransaction(ethereum, account, LPStakingContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled staking for LP', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Staking succeeded for LP', toastOptionsSuccess)
            });
    }

    /* 
    * @returns LP Claim
    */
    const claimLP = async () => {
        const encodedABI = LPStakingContract.methods.claim().encodeABI();
        await sendTransaction(ethereum, account, LPStakingContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled claim for LP', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Claiming succeeded for LP', toastOptionsSuccess)
            });
    }

    /* 
    * @returns LP Unstake
    */
    const unstakeLP = async () => {
        const encodedABI = LPStakingContract.methods.exit().encodeABI();
        await sendTransaction(ethereum, account, LPStakingContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled unstaking for LP', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Unstaking succeeded for LP', toastOptionsSuccess)
            });
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
                        <CustomButton className='b-btn main' disabled={(!account) || (ludusGenesis001 <= 0) && (ludusGenesis002 <= 0) && (ludusGenesis003 <= 0)} onClick={stakeNFT}>Stake</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account} onClick={claimNFT}>Claim</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account} onClick={unstakeNFT}>Unstake</CustomButton>
                    </div>
                </div>
                <div className='card-wrap-column'>
                    <div className='card-wrap'>
                        <div className='card-title'>Single asset staking</div>
                        <div className='card-content'>
                            <div className='card-content-text'>Your Ludus balans</div>
                            <div className='card-content-holder'>
                                <animated.div className='card-content-number'>
                                    {ludusBalanceSpring.number.interpolate((val: any) => {
                                        const value = val.toFixed(2);
                                        return value;
                                    })}
                                </animated.div>
                                <div className={`input-selection ${!account ? 'disabled' : ''}`}>
                                    <CustomButton className='nbdr-btn input-selection-icon left' onClick={() => (stakeSingleAssetValue === 0 || !account) ? null : setStakeSingleAssetValue(stakeSingleAssetValue - 1)}><FontAwesomeIcon icon={icons.minus} /></CustomButton>
                                    <div className='input-selection-number'>{stakeSingleAssetValue}</div>
                                    <CustomButton className='nbdr-btn input-selection-icon right' onClick={() => (!account) ? null : setStakeSingleAssetValue(stakeSingleAssetValue + 1)}><FontAwesomeIcon icon={icons.plus} /></CustomButton>
                                </div>
                                <CustomButton className='b-btn main input-selection-icon standAlone' disabled={!account} onClick={() => setStakeSingleAssetValue(ludusBalance)}>MAX</CustomButton>
                            </div>
                        </div>
                        <div className='card-content-btm'>
                            <CustomButton className='button' disabled={!account} onClick={approveSingleAsset}>Approve</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account} onClick={stakeSingleAsset}>Stake</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account} onClick={claimSingleAsset}>Claim</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account} onClick={unstakeSingleAsset}>Unstake</CustomButton>
                        </div>
                    </div>
                    <div className='card-wrap'>
                        <div className='card-title'>LP Staking</div>
                        <div className='card-content'>
                            <div className='card-content-text'>Your LP Balans</div>
                            <div className='card-content-holder'>
                                <animated.div className='card-content-number'>
                                    {LPBalanceSpring.number.interpolate((val: any) => {
                                        const value = val.toFixed(2);
                                        return value;
                                    })}
                                </animated.div>
                                <div className={`input-selection ${!account ? 'disabled' : ''}`}>
                                    <CustomButton className='nbdr-btn input-selection-icon left' onClick={() => (stakeLPValue === 0 || !account) ? null : setStakeLPValue(stakeLPValue - 1)}><FontAwesomeIcon icon={icons.minus} /></CustomButton>
                                    <div className='input-selection-number'>{stakeLPValue}</div>
                                    <CustomButton className='nbdr-btn input-selection-icon right' onClick={() => (!account) ? null : setStakeSingleAssetValue(stakeSingleAssetValue + 1)}><FontAwesomeIcon icon={icons.plus} /></CustomButton>
                                </div>
                                <CustomButton className='b-btn main input-selection-icon standAlone' disabled={!account} onClick={() => setStakeLPValue(lpBalance)}>MAX</CustomButton>
                            </div>
                        </div>
                        <div className='card-content-btm'>
                            <CustomButton className='button' disabled={!account} onClick={approveLPStaking}>Approve</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account} onClick={stakeLP}>Stake</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account} onClick={claimLP}>Claim</CustomButton>
                            <CustomButton className='b-btn main' disabled={!account} onClick={unstakeLP}>Unstake</CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StakingContent

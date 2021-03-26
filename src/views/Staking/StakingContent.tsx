import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../../helpers/icon'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getContractOf } from '../../utils/erc20'
import { sendTransaction } from '../../utils/utils'
import { toast, ToastOptions } from 'react-toastify';
import { Contract } from 'web3-eth-contract'

import Web3 from 'web3'
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
import UnstakeModal from '../../components/UnstakeModal/UnstakeModal'
import useAllowanceCheck from '../../hooks/useAllowanceCheck'
import useAllowanceNFT from '../../hooks/useAllowanceNFT'
import DisclaimerModal from '../../components/DisclaimerModal/DisclaimerModal'

const StakingContent: React.FC = () => {
    // Big Number CONFIG
    BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });

    // WEB 3
    const { ethereum }: { ethereum: provider } = useWallet()
    const { account } = useWallet()

    // Allowance check (not working yet)
    // @TODO FIX

    // const allowanceLP = useAllowanceCheck(UniswapV2Contract, UniswapV2ContractAddress)
    // const allowanceSingleAsset = useAllowanceCheck(LudusContract, LudusContractAddress)
    // const allowanceNFT = useAllowanceNFT(RaribleContract, RaribleTokenContractAddress)


    // Main Net
    const LudusStakingContractAddress = '0x055c2E794c6e1308B7a1B4c7b80aAf5Ed757c2F6'
    const LudusContractAddress = '0x03fDcAdc09559262F40F5EA61C720278264eB1da'
    const LPStakingContractAddress = '0x9494b87a5bc8D7Be31f88821E5081Dc5aB029EB2'
    const NFTStakingContractAddress = '0x420Ccf524D8b6Ad1144Ea48df212559a836A5261'
    const RaribleTokenContractAddress = '0xd07dc4262BCDbf85190C01c996b4C06a461d2430'
    const UniswapV2ContractAddress = '0x9eaa644489a728f7923da985df1dbecf9a2ebe17'

    // Contracts
    const LudusStakingContract = useMemo(() => { return getContractOf(LudusStakingABI, ethereum as provider, LudusStakingContractAddress) }, [ethereum])
    const LudusContract = useMemo(() => { return getContractOf(LudusABI, ethereum as provider, LudusContractAddress) }, [ethereum])
    const LPStakingContract = useMemo(() => { return getContractOf(LPStakingABI, ethereum as provider, LPStakingContractAddress) }, [ethereum])
    const NFTStakingContract = useMemo(() => { return getContractOf(NFTStakingABI, ethereum as provider, NFTStakingContractAddress) }, [ethereum])
    const RaribleContract = useMemo(() => { return getContractOf(RaribleABI, ethereum as provider, RaribleTokenContractAddress) }, [ethereum])
    const UniswapV2Contract = useMemo(() => { return getContractOf(UniswapV2ABI, ethereum as provider, UniswapV2ContractAddress) }, [ethereum])

    // Genesis ID'S
    const ludusGenesis001ID = 181087
    const ludusGenesis002ID = 181123
    const ludusGenesis003ID = 181077

    // Genesis Values
    const [ludusGenesis001, setLudusGenesis001] = useState(0)
    const [ludusGenesis002, setLudusGenesis002] = useState(0)
    const [ludusGenesis003, setLudusGenesis003] = useState(0)

    // LP & Single Asset values
    const [stakeSingleAssetValue, setStakeSingleAssetValue] = useState('0')
    const [stakeLPValue, setStakeLPValue] = useState('0')

    // Current account balance
    const [ludusBalance, setLudusBalance]: any = useState('0')
    const [ludusStakingBalance, setLudusStakingBalance]: any = useState('0')
    const [lpStakingBalance, setLPStakingBalance] = useState('0')
    const [lpBalance, setLPBalance] = useState('0')
    const [NFTG001StakingBalance, setNFTG001StakingBalance] = useState('0')
    const [NFTG002StakingBalance, setNFTG002StakingBalance] = useState('0')
    const [NFTG003StakingBalance, setNFTG003StakingBalance] = useState('0')

    // Modal States
    const [openUnstakeModal, setOpenUnstakeModal] = useState(false)
    const [openDisclaimerModal, setOpenDisclaimerModal] = useState(false)

    // APY Values for NFT
    const [G001APY, setG001APY] = useState('0')
    const [G002APY, setG002APY] = useState('0')
    const [G003APY, setG003APY] = useState('0')

    // APY Values for LP & Single asset
    const [LPAPY, setLPAPY] = useState('0')
    const [singleAssetAPY, setSingleAssetAPY] = useState('0')

    let toastOptionsError: ToastOptions = { type: 'error' }
    let toastOptionsSuccess: ToastOptions = { type: 'success' }

    const web3 = new Web3(ethereum);
    let interval: NodeJS.Timeout;

    useEffect(() => {
        getBalances();
        disclaimerState();
        handleAPYCalls(10000);
        setBalances(10000);

        // unmount action
        return () => clearTimeout(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, ludusGenesis001, ludusGenesis002, ludusGenesis003, ludusBalance, lpStakingBalance, ethereum, stakeLPValue, stakeSingleAssetValue])

    /* 
   * @returns All the APY's in a callback
   */
    const handleAPYCalls = (intervalNumber: number) => {
        if (G001APY === '0' || G002APY === '0' || G003APY === '0' || LPAPY === '0' || singleAssetAPY === '0') {
            calcNFTApy(1, (val: any) => setG003APY(val));
            calcNFTApy(4, (val: any) => setG002APY(val));
            calcNFTApy(400, (val: any) => setG001APY(val));
            calcAPY(LPStakingContract, (val: any) => setLPAPY(val))
            calcAPY(LudusStakingContract, (val: any) => setSingleAssetAPY(val))
        } else {
            interval = setInterval(() => {
                calcNFTApy(1, (val: any) => setG003APY(val));
                calcNFTApy(4, (val: any) => setG002APY(val));
                calcNFTApy(400, (val: any) => setG001APY(val));
                calcAPY(LPStakingContract, (val: any) => setLPAPY(val))
                calcAPY(LudusStakingContract, (val: any) => setSingleAssetAPY(val))
                console.log('hi')
            }, intervalNumber)
        }
    }

    /* 
    * @returns if disclaimer can be showed or not.
    */
    const disclaimerState = () => {
        const hasSeenDisclaimer = localStorage.getItem('disclaimer-seen');
        if (hasSeenDisclaimer === null) {
            setOpenDisclaimerModal(true)
        }
    }

    /* 
    * @returns APY for whatever contract you want to use.
    */
    const calcAPY = (contract: Contract, set: Function) => {
        if (account !== null) {
            const rewardRate = contract.methods.rewardRate().call();
            const totalValue = contract.methods.totalValue().call();
            rewardRate.then((RT: any) => {
                totalValue.then((TV: any) => {
                    const calc = ((31556926 * RT) / TV);
                    const APY = new BigNumber(calc);
                    set(parseFloat(APY.toPrecision(6)))
                })
            })
        }
    }

    /* 
    * @returns NFT APY
    */
    const calcNFTApy = (multiplier: number, set: Function) => {
        if (account !== null) {
            const rewardRate = NFTStakingContract.methods.rewardRate().call();
            const totalValueStacked = NFTStakingContract.methods.totalValueStacked().call();
            rewardRate.then((RT: any) => {
                totalValueStacked.then((TVS: any) => {
                    const calc = ((RT * multiplier) / TVS)
                    const APY = new BigNumber(calc).times(31556926).dividedBy(1e18);
                    set(parseFloat(APY.toPrecision(9)))
                })
            })
        }
    }

    /* 
    * @returns Setting the Balances of Ludus, LP and LP Staking
    */
    const setBalances = (intervalNumber: number) => {
        if (account !== null) {
            if (ludusBalance === '0' || ludusStakingBalance === '0' || lpStakingBalance === '0' || lpBalance === '0') {
                getBalances();
            } else {
                interval = setInterval(() => getBalances(), intervalNumber)
            }
        }
    }

    /* 
    * @returns Getting the balances of Ludus, LP and LP Staking
    */
    const getBalances = () => {
        let addr = account
        if (account !== null) {
            // Ludus Balance
            const balLudus = LudusContract.methods.balanceOf(addr).call();
            balLudus.then((b: any) => {
                let a = web3.utils.fromWei(b, 'ether');
                let bn = new BigNumber(a).toPrecision(3);
                setLudusBalance(bn)
            })

            // Ludus Staking Balance
            const balLudusStaking = LudusStakingContract.methods.balanceOf(addr).call();
            balLudusStaking.then((b: any) => {
                let a = web3.utils.fromWei(b, 'ether');
                let bn = new BigNumber(a).toPrecision(3);
                setLudusStakingBalance(bn)
            })

            // LP Staking Balance
            const balLPStaking = LPStakingContract.methods.balanceOf(addr).call();
            balLPStaking.then((b: any) => {
                let a = web3.utils.fromWei(b, 'ether');
                let bn = new BigNumber(a).toPrecision(3);
                setLPStakingBalance(bn)
            })

            // LP Balance
            const balLP = UniswapV2Contract.methods.balanceOf(addr).call();
            balLP.then((b: any) => {
                let a = web3.utils.fromWei(b, 'ether');
                let bn = new BigNumber(a).toPrecision(3);
                setLPBalance(bn)
            })

            // NFT G001 Staking Balance
            const G001StakingBal = NFTStakingContract.methods.balanceOf(addr, ludusGenesis001ID).call();
            G001StakingBal.then((b: any) => {
                let a = web3.utils.fromWei(b, 'wei');
                setNFTG001StakingBalance(a)
            })

            // NFT G002 Staking Balance
            const G002StakingBal = NFTStakingContract.methods.balanceOf(addr, ludusGenesis002ID).call();
            G002StakingBal.then((b: any) => {
                let a = web3.utils.fromWei(b, 'wei');
                setNFTG002StakingBalance(a)
            })

            // NFT G003 Staking Balance
            const G003StakingBal = NFTStakingContract.methods.balanceOf(addr, ludusGenesis003ID).call();
            G003StakingBal.then((b: any) => {
                let a = web3.utils.fromWei(b, 'wei');
                setNFTG003StakingBalance(a)
            })
        }
    }


    /* 
    * @returns Approves NFT Staking
    */
    const approveNFTStaking = async () => {
        if (ludusGenesis001 === 0 && ludusGenesis002 === 0 && ludusGenesis003 === 0) {
            return toast("Can't approve amount of 0", toastOptionsError)
        }
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
    const claimNFT = async () => {
        const encodedABI = NFTStakingContract.methods.claim().encodeABI();
        await sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI, '0x0',
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
    */
    const unstakeNFT = async (id: number) => {
        if (id === 1) {
            const encodedABI1 = NFTStakingContract.methods.exit(ludusGenesis001ID).encodeABI();
            await sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI1, '0x0',
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
        if (id === 2) {
            const encodedABI2 = NFTStakingContract.methods.exit(ludusGenesis002ID).encodeABI();
            await sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI2, '0x0',
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
        if (id === 3) {
            const encodedABI3 = NFTStakingContract.methods.exit(ludusGenesis003ID).encodeABI();
            await sendTransaction(ethereum, account, NFTStakingContractAddress, encodedABI3, '0x0',
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
    }

    /* 
    * @returns Single asset Approve
    */
    const approveSingleAsset = async () => {
        const amount = new BigNumber(stakeSingleAssetValue).times(1e18).toString(10);
        const encodedABI = LudusContract.methods.approve(LudusStakingContractAddress, amount).encodeABI();
        await sendTransaction(ethereum, account, LudusContractAddress, encodedABI, '0x0',
            (err: any) => { // onError
                if (err.code === 4001) {
                    toast('Cancelled approving for single asset', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Approving succeeded for single asset', toastOptionsSuccess)
            });
    }

    /* 
    * @returns Single Asset Stake
    */
    const stakeSingleAsset = async () => {
        const amount = new BigNumber(stakeSingleAssetValue).times(1e18).toString(10);
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
                    toast('Cancelled unstake for single asset', toastOptionsError)
                } else {
                    toast(err.message, toastOptionsError)
                }
            },
            () => { // onSuccess
                toast('Unstake succeeded for single asset', toastOptionsSuccess)
            });
    }

    /* 
    * @returns LP Approve
    */
    const approveLPStaking = () => {
        let amount = new BigNumber(stakeLPValue).times(1e18).toString(10);
        UniswapV2Contract.methods.approve(LPStakingContractAddress, amount).send({ from: account })
            .on('transactionHash',
                () => {
                    toast('Approve succeeded for LP', toastOptionsSuccess)
                })
            .on('error',
                (err: any) => {
                    if (err.code === 4001) {
                        toast('Cancelled approve for LP', toastOptionsError)
                    } else {
                        toast(err.message, toastOptionsError)
                    }
                });
    }

    /* 
    * @returns LP Stake
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

    const onMinusClick = (val: string, onAmount: Function) => {
        if (parseFloat(val) <= 0 || !account) {
            return;
        } else {
            let float = parseFloat(val);
            let calc = (float - 1);
            onAmount(calc.toString())
        }
    }

    const onPlusClick = (val: string, balance: string, onAmount: Function) => {
        let float = parseFloat(val);
        if (parseFloat(balance) === float) {
            toast(`Max value: ${balance}`, toastOptionsError)
        } else {
            let calc = (float + 1);
            onAmount(calc.toString())
        }
    }

    return (
        <>
            {openUnstakeModal &&
                <>
                    <div className='backdrop-unstake'></div>
                    <UnstakeModal onClose={() => setOpenUnstakeModal(false)} onStake001={() => unstakeNFT(1)} onStake002={() => unstakeNFT(2)} onStake003={() => unstakeNFT(3)} />
                </>
            }
            {openDisclaimerModal &&
                <div className='disclaimer-container'>
                    <div className='backdrop-unstake'></div>
                    <DisclaimerModal onClose={() => {
                        setOpenDisclaimerModal(false);
                        localStorage.setItem('disclaimer-seen', 'true')
                    }} />
                </div>
            }
            <div className='farms-content-wrap'>
                <div className='farms-content'>
                    <div className='card-wrap'>
                        <div className='card-title'>NFT Staking</div>
                        <div className='card-content'>
                            <div className='card-content-number apy mobile'>
                                APY {G001APY}%
                            </div>
                            <div className='card-content-row'>
                                <img src={LudusGenesis001} alt="LudusGenesis001" />
                                <div className={`apy-title card-content-row-title ${!account ? 'disabled' : ''}`}>
                                    <div className={`card-content-text apy ${!account ? 'disabled' : ''}`}>
                                        Ludus Genesis 001
                                        <div className='card-content-number apy'>
                                            APY {G001APY}%
                                        </div>
                                    </div>
                                    <div className={`card-content-text ${!account ? 'disabled' : ''}`}>
                                        Staked
                                        <div className='card-content-number'>
                                            {NFTG001StakingBalance}
                                        </div>
                                    </div>
                                </div>
                                <div className={`input-selection ${!account ? 'disabled' : ''}`}>
                                    <CustomButton className='nbdr-btn input-selection-icon left' onClick={() => (ludusGenesis001 === 0 || !account) ? null : setLudusGenesis001(ludusGenesis001 - 1)}><FontAwesomeIcon icon={icons.minus} /></CustomButton>
                                    <div className='input-selection-number'>{ludusGenesis001}</div>
                                    <CustomButton className='nbdr-btn input-selection-icon right' onClick={() => (!account) ? null : setLudusGenesis001(ludusGenesis001 + 1)}><FontAwesomeIcon icon={icons.plus} /></CustomButton>
                                </div>
                            </div>
                            <div className='card-content-number apy mobile'>
                                APY {G002APY}%
                            </div>
                            <div className='card-content-row'>
                                <img src={LudusGenesis002} alt="LudusGenesis002" />
                                <div className={`apy-title card-content-row-title ${!account ? 'disabled' : ''}`}>
                                    <div className={`card-content-text apy ${!account ? 'disabled' : ''}`}>
                                        Ludus Genesis 002
                                        <div className='card-content-number apy'>
                                            APY {G002APY}%
                                        </div>
                                    </div>
                                    <div className={`card-content-text ${!account ? 'disabled' : ''}`}>
                                        Staked
                                        <div className='card-content-number'>
                                            {NFTG002StakingBalance}
                                        </div>
                                    </div>
                                </div>
                                <div className={`input-selection ${!account ? 'disabled' : ''}`}>
                                    <CustomButton className='nbdr-btn input-selection-icon left' onClick={() => (ludusGenesis002 === 0 || !account) ? null : setLudusGenesis002(ludusGenesis002 - 1)}><FontAwesomeIcon icon={icons.minus} /></CustomButton>
                                    <div className='input-selection-number'>{ludusGenesis002}</div>
                                    <CustomButton className='nbdr-btn input-selection-icon right' onClick={() => (!account) ? null : setLudusGenesis002(ludusGenesis002 + 1)}><FontAwesomeIcon icon={icons.plus} /></CustomButton>
                                </div>
                            </div>
                            <div className='card-content-number apy mobile'>
                                APY {G003APY}%
                            </div>
                            <div className='card-content-row'>
                                <img src={LudusGenesis003} alt="LudusGenesis003" />
                                <div className={`apy-title card-content-row-title ${!account ? 'disabled' : ''}`}>
                                    <div className={`card-content-text apy ${!account ? 'disabled' : ''}`}>
                                        Ludus Genesis 003
                                        <div className='card-content-number apy'>
                                            APY {G003APY}%
                                        </div>
                                    </div>
                                    <div className={`card-content-text ${!account ? 'disabled' : ''}`}>
                                        Staked
                                        <div className='card-content-number'>
                                            {NFTG003StakingBalance}
                                        </div>
                                    </div>
                                </div>
                                <div className={`input-selection ${!account ? 'disabled' : ''}`}>
                                    <CustomButton className='nbdr-btn input-selection-icon left' onClick={() => (ludusGenesis003 === 0 || !account) ? null : setLudusGenesis003(ludusGenesis003 - 1)}><FontAwesomeIcon icon={icons.minus} /></CustomButton>
                                    <div className='input-selection-number'>{ludusGenesis003}</div>
                                    <CustomButton className='nbdr-btn input-selection-icon right' onClick={() => (!account) ? null : setLudusGenesis003(ludusGenesis003 + 1)}><FontAwesomeIcon icon={icons.plus} /></CustomButton>
                                </div>
                            </div>
                        </div>
                        <div className='card-content-btm'>
                            <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={() => approveNFTStaking()}>Approve</CustomButton>
                            <CustomButton className={(!account || ludusGenesis001 <= 0) && (ludusGenesis002 <= 0) && (ludusGenesis003 <= 0) ? 'b-btn main' : `button`} disabled={(!account || ludusGenesis001 <= 0) && (ludusGenesis002 <= 0) && (ludusGenesis003 <= 0)} onClick={() => stakeNFT()}>Stake</CustomButton>
                            <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={() => claimNFT()}>Claim</CustomButton>
                            <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={() => setOpenUnstakeModal(true)}>Unstake</CustomButton>
                        </div>
                    </div>
                    <div className='card-wrap-column'>
                        <div className='card-wrap'>
                            <div className='card-title'>Single asset staking</div>
                            <div className='card-content-holder'>
                                <div className='card-content-balance'>
                                    <div className={`card-content-text ${!account ? 'disabled' : ''}`}>
                                        <div className='apy-title'>
                                            <span>APY {singleAssetAPY}%</span>
                                            Your Ludus Balance
                                        </div>
                                        <div className='card-content-number'>
                                            {ludusBalance}
                                        </div>
                                    </div>
                                    <div className={`card-content-text ${!account ? 'disabled' : ''}`}>
                                        Staked
                                        <div className='card-content-number'>
                                            {lpStakingBalance}
                                        </div>
                                    </div>
                                </div>
                                <div className='card-content-input'>
                                    <div className={`input-selection ${!account ? 'disabled' : ''}`}>
                                        <CustomButton className='nbdr-btn input-selection-icon left' onClick={() => onMinusClick(stakeSingleAssetValue, (val: string) => setStakeSingleAssetValue(val))}><FontAwesomeIcon icon={icons.minus} /></CustomButton>
                                        <input type="number" disabled={!account} className='input-selection-number' value={stakeSingleAssetValue} onChange={(ev: any) => setStakeSingleAssetValue(ev.target.value)} />
                                        <CustomButton className='nbdr-btn input-selection-icon right' onClick={() => onPlusClick(stakeSingleAssetValue, ludusBalance, (val: string) => setStakeSingleAssetValue(val))}><FontAwesomeIcon icon={icons.plus} /></CustomButton>
                                    </div>
                                    <CustomButton className='b-btn main input-selection-icon standAlone' disabled={!account} onClick={() => setStakeSingleAssetValue(ludusBalance)}>MAX</CustomButton>
                                </div>
                            </div>
                            <div className='card-content-btm'>
                                <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={() => approveSingleAsset()}>Approve</CustomButton>
                                <CustomButton className={(!account || parseFloat(stakeSingleAssetValue) <= 0) ? 'b-btn main' : `button`} disabled={(!account || parseFloat(stakeSingleAssetValue) <= 0)} onClick={stakeSingleAsset}>Stake</CustomButton>
                                <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={() => claimSingleAsset()}>Claim</CustomButton>
                                <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={() => unstakeSingleAsset()}>Unstake</CustomButton>
                            </div>
                        </div>
                        <div className='card-wrap'>
                            <div className='card-title'>LP Staking</div>
                            <div className='card-content'>
                                <div className='card-content-holder'>
                                    <div className='card-content-balance'>
                                        <div className={`card-content-text ${!account ? 'disabled' : ''}`}>
                                            <div className='apy-title'>
                                                <span>APY {LPAPY}%</span>
                                                Your LP Balance
                                            </div>
                                            <div className='card-content-number'>
                                                {lpBalance}
                                            </div>
                                        </div>
                                        <div className={`card-content-text ${!account ? 'disabled' : ''}`}>
                                            Staked
                                            <div className='card-content-number'>
                                                {ludusStakingBalance}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-content-input'>
                                        <div className={`input-selection ${!account ? 'disabled' : ''}`}>
                                            <CustomButton className='nbdr-btn input-selection-icon left' onClick={() => onMinusClick(stakeLPValue, (val: string) => setStakeLPValue(val))}><FontAwesomeIcon icon={icons.minus} /></CustomButton>
                                            <input type="number" disabled={!account} className='input-selection-number' value={stakeLPValue} onChange={(ev: any) => setStakeLPValue(ev.target.value)} />
                                            <CustomButton className='nbdr-btn input-selection-icon right' onClick={() => onPlusClick(stakeLPValue, lpBalance, (val: string) => setStakeLPValue(val))}><FontAwesomeIcon icon={icons.plus} /></CustomButton>
                                        </div>
                                        <CustomButton className='b-btn main input-selection-icon standAlone' disabled={!account} onClick={() => setStakeLPValue(lpBalance)}>MAX</CustomButton>
                                    </div>
                                </div>
                            </div>
                            <div className='card-content-btm'>
                                <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={() => approveLPStaking()}>Approve</CustomButton>
                                <CustomButton className={(!account || parseFloat(stakeLPValue) <= 0) ? 'b-btn main' : `button`} disabled={(!account || parseFloat(stakeLPValue) <= 0)} onClick={() => stakeLP()}>Stake</CustomButton>
                                <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={() => claimLP()}>Claim</CustomButton>
                                <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={() => unstakeLP()}>Unstake</CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StakingContent

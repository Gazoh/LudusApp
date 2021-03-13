import React, { useState } from 'react'
import LudusGenesis001 from '../../assets/img/ludusGenesis001.png'
import LudusGenesis002 from '../../assets/img/ludusGenesis002.png'
import LudusGenesis003 from '../../assets/img/ludusGenesis003.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../../helpers/icon'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useWallet } from 'use-wallet'

const FarmsContent: React.FC = () => {
    const { account } = useWallet()
    const [ludusGenesis001, setLudusGenesis001] = useState(0)
    const [ludusGenesis002, setLudusGenesis002] = useState(0)
    const [ludusGenesis003, setLudusGenesis003] = useState(0)

    return (
        <div className='farms-content-wrap'>
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
                    <CustomButton className='button' disabled={!account}>Approve</CustomButton>
                    <CustomButton className='b-btn main' disabled={!account}>Stake</CustomButton>
                    <CustomButton className='b-btn main' disabled={!account}>Claim</CustomButton>
                    <CustomButton className='b-btn main' disabled={!account}>Unstake</CustomButton>
                </div>
            </div>
            <div className='card-wrap-column'>
                <div className='card-wrap'>
                    <div className='card-title'>Single asset staking</div>
                    <div className='card-content'>
                        <div className='card-content-text'>Your Ludus balans</div>
                        <div className='card-content-number'>156454</div>
                    </div>
                    <div className='card-content-btm'>
                        <CustomButton className='button' disabled={!account}>Approve</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account}>Stake</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account}>Claim</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account}>Unstake</CustomButton>
                    </div>
                </div>
                <div className='card-wrap'>
                    <div className='card-title'>LP Staking</div>
                    <div className='card-content'>
                        <div className='card-content-text'>Your LP Balans</div>
                        <div className='card-content-number'>156454</div>
                    </div>
                    <div className='card-content-btm'>
                        <CustomButton className='button' disabled={!account}>Approve</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account}>Stake</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account}>Claim</CustomButton>
                        <CustomButton className='b-btn main' disabled={!account}>Unstake</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FarmsContent

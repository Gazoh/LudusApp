import React from 'react'
import { useWallet } from 'use-wallet'

import CustomButton from '../CustomButton/CustomButton'
import LudusGenesis001 from '../../assets/img/ludusGenesis001.png'
import LudusGenesis002 from '../../assets/img/ludusGenesis002.png'
import LudusGenesis003 from '../../assets/img/ludusGenesis003.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../../helpers/icon'

interface Props {
    onStake001: Function,
    onStake002: Function,
    onStake003: Function,
    onClose: Function
}

const UnstakeModal: React.FC<Props> = ({ onStake001, onStake002, onStake003, onClose }) => {
    const { account } = useWallet()

    return (
        <div className='unstake-modal'>
            <div className='unstake-wrap'>
                <CustomButton className='i-btn' onClick={onClose}>
                    <FontAwesomeIcon icon={icons.close} />
                </CustomButton>
                <div className='unstake-card'>
                    <img src={LudusGenesis001} alt="LudusGenesis001" />
                    <div className='unstake-card-title'>Ludus Genesis 001</div>
                    <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={onStake001}>Unstake</CustomButton>
                </div>
                <div className='unstake-card'>
                    <img src={LudusGenesis002} alt="LudusGenesis002" />
                    <div className='unstake-card-title'>Ludus Genesis 002</div>
                    <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={onStake002}>Unstake</CustomButton>
                </div>
                <div className='unstake-card'>
                    <img src={LudusGenesis003} alt="LudusGenesis003" />
                    <div className='unstake-card-title'>Ludus Genesis 003</div>
                    <CustomButton className={!account ? 'b-btn main' : `button`} disabled={!account} onClick={onStake003}>Unstake</CustomButton>
                </div>
            </div>
        </div>
    )
}

export default UnstakeModal

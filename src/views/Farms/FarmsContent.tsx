import React from 'react'
import LudusGenesis001 from '../../assets/img/ludusGenesis001.png'
import LudusGenesis002 from '../../assets/img/ludusGenesis002.png'
import LudusGenesis003 from '../../assets/img/ludusGenesis003.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '../../helpers/icon'
import CustomButton from '../../components/CustomButton/CustomButton'

const FarmsContent: React.FC = () => {

    return (
        <div className='farms-content-wrap'>
            <div className='card-wrap'>
                <div className='card-title'>NFT Staking</div>
                <div className='card-content'>
                    <div className='card-content-row'>
                        <img src={LudusGenesis001} alt="LudusGenesis001" />
                        <div className='card-content-row-title'>Ludus Genesis 001</div>
                        <div className='input-selection'>
                            <div className='input-selection-icon left'><FontAwesomeIcon icon={icons.minus} /></div>
                            <div className='input-selection-number'>20</div>
                            <div className='input-selection-icon right'><FontAwesomeIcon icon={icons.plus} /></div>
                        </div>
                    </div>
                    <div className='card-content-row'>
                        <img src={LudusGenesis002} alt="LudusGenesis002" />
                        <div className='card-content-row-title'>Ludus Genesis 002</div>
                    </div>
                    <div className='card-content-row'>
                        <img src={LudusGenesis003} alt="LudusGenesis003" />
                        <div className='card-content-row-title'>Ludus Genesis 003</div>
                    </div>
                </div>
                <div className='card-content-btm'>
                    <CustomButton className='button'>Approve</CustomButton>
                    <CustomButton className='b-btn main'>Stake</CustomButton>
                    <CustomButton className='b-btn main'>Claim</CustomButton>
                    <CustomButton className='b-btn main'>Unstake</CustomButton>
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
                        <CustomButton className='button'>Approve</CustomButton>
                        <CustomButton className='b-btn main'>Stake</CustomButton>
                        <CustomButton className='b-btn main'>Claim</CustomButton>
                        <CustomButton className='b-btn main'>Unstake</CustomButton>
                    </div>
                </div>
                <div className='card-wrap'>
                    <div className='card-title'>LP Staking</div>
                    <div className='card-content'>
                        <div className='card-content-text'>Your LP Balans</div>
                        <div className='card-content-number'>156454</div>
                    </div>
                    <div className='card-content-btm'>
                        <CustomButton className='button'>Approve</CustomButton>
                        <CustomButton className='b-btn main'>Stake</CustomButton>
                        <CustomButton className='b-btn main'>Claim</CustomButton>
                        <CustomButton className='b-btn main'>Unstake</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FarmsContent

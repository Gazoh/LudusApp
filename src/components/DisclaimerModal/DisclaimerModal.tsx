import React from 'react'
import CustomButton from '../CustomButton/CustomButton'

interface Props {
    onClose: Function
}

const DisclaimerModal: React.FC<Props> = ({ onClose }) => {

    return (
        <div className='disclaimer-modal'>
            <div className='disclaimer-title'>Disclaimer</div>
            <div className='disclaimer-content'>
                I am not a citizen, resident or otherwise living in one of the following countries: Unites States of America, United States Territories, United States Military Bases, Cuba, North Korea, Iran, Syria, Venezuela and the Democratic Republic of the Congo.

                LUDUS is a digital decentralized platform developed by NERD-LAB in the Republic of Ecuador, all the derivatives of the platform and the rights associated to them belong exclusively to NERD-LAB. NERD-LAB is a company established in Republic of Ecuador and it is therefore subject to their laws.

                We are not registered as a securities broker-dealer or an investment adviser either with the U.S. Securities and Exchange Commission (the “SEC”) or with any state securities regulatory authority. We are not licensed to provide financial services.

                LUDUS Token is ERC-20 TOKEN on the Ethereum blockchain. The LUDUS platform allows for the creation of NFTs that are ERC-721 tokens. ERC-721 tokens (NFT's) are non-fungible tokens, be aware that their value is derived only from what people are willing to pay. The value of NFTs is thus highly volatile and LUDUS holds no liability for such volatility.

                All on-chain files are available to everyone, be cautious. Never send a transaction containing personal information.

                Ethereum will power the LUDUS NFTs as a means of decentralization and immutability. Although the LUDUS platform is a decentralized smart contract, the user of the LUDUS platform still exists within the rules of the country in which they reside. LUDUS advises that users follow all laws and regulations related to their country of residence, and LUDUS takes no responsibility for any and all actions taken by those using the LUDUS platform.

                To repeat, the Ethereum blockchain is transparent and trackable, all responsibility lies with the user of the LUDUS platform. LUDUS has the right, with sole discretion, to edit this Disclaimer at any time. By clicking the box below, you agree to all of the terms listed above and to use the LUDUS platform in accordance with Local law.
                <br /><br />
                <strong>IF YOU DO NOT AGREE WITH THE TERMS OF THIS DISCLAIMER, PLEASE EXIT THIS SITE IMMEDIATELY. PLEASE BE ADVISED THAT YOUR CONTINUED USE OF THIS SITE OR THE INFORMATION PROVIDED HEREIN SHALL INDICATE YOUR CONSENT AND AGREEMENT TO THESE TERMS.</strong>
            </div>
            <div className='disclaimer-btm'>
                <CustomButton className='button main' onClick={onClose}>Agree</CustomButton>
            </div>
        </div>
    )
}

export default DisclaimerModal

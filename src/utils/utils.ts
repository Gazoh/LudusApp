import Web3 from 'web3'

export const sendTransaction = async (provider: any, fromAddress: any, toAddress: any, encodedABI: any, wei = `0x0`) => {
    const web3 = new Web3(provider)
    if (window.ethereum && web3) {
        try {

            const gasPrice = await web3.eth.getGasPrice();
            const tx = {
                from: fromAddress,
                to: toAddress,
                gasPrice: web3.utils.toHex(gasPrice),//`0xAB5D04C00`,
                data: encodedABI,
                value: wei
            };
            return new Promise((resolve, reject) => {
                web3.eth.sendTransaction(tx)
                    .on('transactionHash', (hash) => {
                        resolve(hash)
                    })
                    .on('receipt', (receipt) => {
                        resolve(receipt);
                    })
                    .on('error', (err) => {
                        reject(err);
                    });
            });
        } catch (err) {
            console.log('err :>> ', err);
            return null;
        }
    } else {
        return null;
    }
}

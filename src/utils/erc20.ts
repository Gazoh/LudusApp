import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'

export const getContractOf = (ABI: any, provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (ABI as unknown) as AbiItem,
    address,
  )
  return contract
}

export const getAllowance = async (
  lpContract: Contract,
  masterChefContract: Contract,
  account: string,
): Promise<string> => {
  try {
    const allowance: string = await lpContract.methods
      .allowance(account, masterChefContract.options.address)
      .call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getAllowanceCheck = async (contract: Contract, contractAddress: string, account: string): Promise<string> => {
  try {
    const allowance: string = await contract.methods.allowance(account, contractAddress).call()
    return allowance
  } catch (e) {
    return '0'
  }
}

export const getAllowanceNFT = async (contract: Contract, contractAddress: string, account: string): Promise<boolean> => {
  try {
    const allowance: boolean = await contract.methods.isApprovedForAll(account, contractAddress).call()
    return allowance
  } catch (e) {
    return false
  }
}
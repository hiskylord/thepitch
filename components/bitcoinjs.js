const bitcoin = require('bitcoinjs-lib')
import ECPairFactory from 'ecpair'
import BIP32Factory from 'bip32'
import * as ecc from 'tiny-secp256k1'

import Axios from 'axios'
export const generateAddrs = async () => {
  const ECPair = ECPairFactory(ecc)
  const bip32 = BIP32Factory(ecc)
  const keyPair = ECPair.makeRandom()
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })

  return {
    address: address,
    prikey: keyPair.toWIF(),
    pubkey: keyPair.publicKey,
  }
}

export const getAddressdata = async (address) => {
  return await Axios.get('https://blockchain.info/rawaddr/' + address).then(
    (response) => response.data,
  )
}

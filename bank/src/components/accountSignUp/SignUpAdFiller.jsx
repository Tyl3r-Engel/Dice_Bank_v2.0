import React, { useState, useEffect } from 'react';
import { CheckingAndSavingsInfo as cas } from '../serviceInfo/checkingAndSavings/CheckingAndSavingsInfo';
import { CreditCardInfo as cc } from '../serviceInfo/creditCard/CreditCardInfo';
import ServiceElement from '../serviceInfo/ServiceElement';

export default function AccountAdFiller() {
  const [account1, setAccount1] = useState({})
  const [account2, setAccount2] = useState({})
  const [account3, setAccount3] = useState({})
  const [hasSet, setHasSet] = useState(false)

  useEffect(() => {
    setAccount1(Math.floor(Math.random()*cas.length))
    setAccount2(Math.floor(Math.random()*cc.length))
    setAccount3(Math.floor(Math.random()*cc.length))
    setHasSet(true)
  },[])

  if(!hasSet) return <p>loading...</p>
  return (
      [
        cas[account1],
        cc[account2],
        cc[account3]
      ].map((element, index) => (
        <ServiceElement key={`${index} asuam`} element={element}/>
      ))
  )
}
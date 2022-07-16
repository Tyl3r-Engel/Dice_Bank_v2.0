import React, { useState, useEffect } from 'react';
import Loading from '../../loading/Loading';
import { CheckingAndSavingsInfo as cas } from '../serviceInfo/checkingAndSavings/CheckingAndSavingsInfo';
import { CreditCardInfo as cc } from '../serviceInfo/creditCard/CreditCardInfo';
import { LoanInfo as li } from '../serviceInfo/loan/LoanInfo';
import ServiceElement from '../serviceInfo/ServiceElement';

export default function AccountAdFiller({ size }) {
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

  if(!hasSet) return <Loading />
  return (
    [
      cas[account1],
      cc[account2],
      li[account3]
    ].map((element, index) => {
      element.noSignUp = true
      return <ServiceElement key={`${index} asuam`} element={element} size={size}/>
    })
  )
}
'use client'

import { QuantityButton } from "../../../../ui/QuantityButton/QuantityButton"

export const BasketClientWrapper: React.FC = () => {
  return (
    <QuantityButton onChange={(value) => console.log(value)} value={0} />
  )
}
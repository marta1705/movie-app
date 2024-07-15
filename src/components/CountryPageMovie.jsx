import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { SelectedItemContext } from './SelectedItemContext'

export default function CountryPageMovie() {
  const { selectedItem } = useContext(SelectedItemContext)
  console.log(selectedItem)
  return (
    <div>
      <h1 style={{color: "white"}}>{selectedItem.english_name}</h1>
    </div>
  )
}

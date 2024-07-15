import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { SelectedItemContext } from './SelectedItemContext'

export default function YearPageMovie() {
  const { selectedItem } = useContext(SelectedItemContext)
  console.log(selectedItem)
  return (
    <div>
      <h1 style={{color: "white"}}>{selectedItem.name}</h1>
    </div>
  )
}



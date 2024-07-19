import React, { useContext } from 'react'
import { SelectedItemContext } from './SelectedItemContext'

export default function DropdownMenu({options, name, onChange}) {
    const { setSelectedItem } = useContext(SelectedItemContext)
  return (
    <div className='dropdown-container'>
      <select onChange={(e) => {
        e.preventDefault()
        const selectedValue = e.target.value
        const selectedObject = options.find(option => 
            name === 'Countries' ? option.iso_3166_1 === selectedValue : option.name === selectedValue
          );
        
        setSelectedItem({
          ...selectedObject,
          category: name
        });
        
        if (onChange) {
            onChange(selectedValue)
        }
      }}>
        <option>{name}</option>
        {name === "Countries" ?
            <>
                {options.map(option => {
                    return <option key={option.iso_3166_1} value={option.iso_3166_1}>{option.english_name}</option>
                })}
            </>
            :
            <>
                {options.map(option => {
                    return <option key={option.id} value={option.name}>{option.name}</option>
                })}
        </>
        }
        
      </select>

    </div>
  )
}
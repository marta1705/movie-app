import React from 'react'

export default function TrailerPopup(props) {
  return (
    (props.trigger) ? (
        <div className='popup' onClick={props.onClick}>
            <div className='inner-popup'>
            <button className='btn-close' onClick={props.onClick}>Close</button>
            {props.children}
            </div>
        </div>
    ) : ""   
  )
}

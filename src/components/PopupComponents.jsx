import React from 'react'

export function TrailerPopup(props) {
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

export function TvEpisodePopup(props) {
  return (
    (props.trigger) ? (
      <div className='popup'>
        <div className='inner-episode-popup'>
          <button className='btn-close' onClick={props.onClick}>Close</button>
          {props.children}
        </div>
      </div>
    ) : ""
  )
}

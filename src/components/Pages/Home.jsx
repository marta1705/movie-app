import React, { useEffect, useState } from 'react'

export default function() {

  const [tvDetails, setTvDetails] = useState()


  useEffect(() => {
      fetch(`https://api.themoviedb.org/3/tv/${94997}?api_key=${import.meta.env.VITE_API_KEY}language=en-US&append_to_response=videos`)
        .then((res) => res.json())
        .then((data) => setTvDetails(data))  
  }, [])

  return (
    <h1 style={{color: 'white'}}>Home</h1>
  )
}



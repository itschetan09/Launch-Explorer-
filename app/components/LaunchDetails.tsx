import React, { useEffect } from 'react'
import { useLaunches } from '../hooks/useLaunches'

const LaunchDetails = (props)=> {
  const {launchId} = props

    const [fetchLaunch] = useLaunches();


  const fetchLaunchDetails = async (id: string) => {
    try {
      const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();
      console.log('LaunchDetails', data)
      return data;
    } catch (error) {
      console.log('Error', error)
    }
  }

    useEffect(() => {
      fetchLaunchDetails(launchId)
    }, [])

    
  return (
    <div>
      <h1>{launchId}</h1>
    </div>
  )
}

export default LaunchDetails;
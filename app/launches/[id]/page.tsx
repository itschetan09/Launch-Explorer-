'use client'
import { useLaunches } from '@/app/hooks/useLaunches';
import useStyles from '@/app/hooks/useStyles';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { LaunchDetailsType } from '@/app/services/LaunchDetails';


function LaunchDetails() {
    const styles = useStyles();
    const {fetchLaunchByID} = useLaunches();
    const {id: launch_id} = useParams();
    const [launchData, setLaunchData] = useState<LaunchDetailsType>({} as LaunchDetailsType);
    const { name, date_utc, flight_number } = launchData;

    const getLaunchDetails = async () => {
      try {
        const data: LaunchDetailsType = await fetchLaunchByID(launch_id as String)
        console.log('Launch_details', data);
        setLaunchData(data)
      } catch (error) {
        console.log('error:', error)
      }
    }

    useEffect(() => {
      console.log('pathname', launch_id)
      getLaunchDetails()
    }, [launch_id]);
    
  return (
    <div className={`${styles.container}`}>
      <p>Name: {name}</p>
      <p>Date of Launch: {new Date(date_utc).toDateString()}</p>
      <p>Flight Number: {flight_number}</p>
    </div>
  )
}

export default LaunchDetails
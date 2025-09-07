'use client'
import { useEffect, useState } from "react"
import { LaunchDetailsType } from "../services/LaunchDetails";

export const useLaunches = () => {
  const [launchesList, setlaunchesList] = useState([] as any);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [listofYears, setYearsList] = useState([])
  const [rocketsList, setrocketsList] = useState([])
  //   const loader = useRef(null);

  const fetchLaunches = async () => {
    try {
      const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          options: { page, limit: 10, sort: { date_utc: "desc" } },
        }),
      });

      const data = await res.json();

      console.log('rocketLaunches', data)
      if (!data.hasNextPage) {
        setHasMore(false);
      } else {
        setlaunchesList((prev) => [...prev, ...data.docs]);
        const yearsList = data.docs.map(itm => {
          console.log('itm', itm)
          const year = new Date(itm.date_utc).getFullYear();
          return year
        })
        console.log('yearsList', yearsList)
        // setYearsList((prev) => [...prev, ...(new Set(yearsList))]);
        // setPage(data.page)
      }

    } catch (error) {
      console.log('Error', error)
    }
  }

  const searchLaunchByName = async (searchText: string) => {
    try {
      const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: {
            $id: {
              $search: searchText
            }
          }
        }),
      });

      const data = await res.json();
      console.log('LaunchDetails', data)
      return data;
    } catch (error) {
      console.log('Error', error)
    }
  }

  const getRockets =  async () => {
    try {
      const res = await fetch("https://api.spacexdata.com/v4/rockets", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      console.log('RocketsDetails', data)
      setrocketsList(data);
    } catch (error) {
      console.log('Error', error)
    }
  }

  const fetchLaunchByID = async (launch_id: String) => {
    try {
      const res = await fetch(`https://api.spacexdata.com/v5/launches/${launch_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      let data: LaunchDetailsType = await res.json();

      const [launchPad, rocketDetails]: any = await Promise.all([
        fetchLaunchPadByID(data.launchpad),
        getRocketbyId(data.rocket)
      ])
      data = {...data, rocket: rocketDetails, launchpad: launchPad}
      return data;
    } catch (error) {
      console.log('Error', error)
    }
  }

  const fetchLaunchPadByID = async (launch_pad_id: String) => {
    try {
      const res = await fetch(`https://api.spacexdata.com/v4/launchpads/${launch_pad_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      console.log('Error', error)
    }
  }

  const getRocketbyId =  async (rocket_id: String) => {
    try {
      const res = await fetch(`https://api.spacexdata.com/v4/rockets/${rocket_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      console.log('RocketsDetails', data)
      return data
    } catch (error) {
      console.log('Error', error)
    }
  }

  useEffect(() => {
    fetchLaunches()
  }, [page])

  useEffect(() => {
    getRockets()
  }, [])
  


  const nextPage = () => {
    console.log('Next Page...')
    console.log('Page', listofYears)
    setPage(prevPage => prevPage + 1)
  }


  return {launchesList, nextPage, hasMore, listofYears, searchLaunchByName, rocketsList, fetchLaunchByID};
}
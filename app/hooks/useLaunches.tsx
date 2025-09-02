import { useEffect, useState } from "react"

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


  return [launchesList, nextPage, hasMore, listofYears, searchLaunchByName, rocketsList];
}
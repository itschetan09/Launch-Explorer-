'use client'

import { Stack } from '@fluentui/react'
import { Button, makeStyles, SearchBox, Spinner, typographyStyles } from '@fluentui/react-components'
import React, { useEffect, useRef } from 'react'
import RocketsDropdown from '../components/core/RocketsDropdown'
import RocketItem from '../components/RocketItem'
import { useLaunches } from '../hooks/useLaunches';
import { RocketType } from '@/app/services/rocket';
import useStyles from '../hooks/useStyles'

function Launches() {
  const styles = useStyles();
  const {launchesList, nextPage, hasMore, searchLaunchByName} = useLaunches()
  const loader = useRef(null);

  useEffect(() => {
    if (!loader.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          nextPage()
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasMore]);

  return (
      <div className={`${styles.container} ${styles.center}`}>
        <nav>
          <Stack horizontal wrap tokens={{ childrenGap: 10, padding: 20 }} horizontalAlign="center">
            <Stack.Item>
              <SearchBox style={{ width: 250 }} placeholder="Search Mission..." />
            </Stack.Item>
            <Stack.Item>
              <RocketsDropdown />
            </Stack.Item>
            <Stack.Item>
              <Button appearance="secondary" >Reset</Button>
            </Stack.Item>
          </Stack>
        </nav>

        <section>
          <Stack wrap
            horizontal
            horizontalAlign="center"
            tokens={{ childrenGap: 20 }}
            styles={{ root: { width: "100%" } }}
          >
            {
              launchesList && launchesList?.map((rocket: RocketType) => {
                return (
                  <Stack.Item key={rocket.id}>
                    <RocketItem {...rocket} />
                  </Stack.Item>
                )
              })
            }
          </Stack>
          {hasMore ? <div ref={loader}><Spinner size={'large'} /></div> : <p>No more launches</p>}
        </section>
      </div>
  )
}

export default Launches

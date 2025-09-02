'use client'
import styles_css from "./page.module.css";
import { Button, Dropdown, Field, Input, makeStyles, SearchBox, Spinner, Text, typographyStyles } from "@fluentui/react-components";
import { useLaunches } from "./hooks/useLaunches";
import RocketItem from "./components/RocketItem";
import { useEffect, useRef, useState } from "react";
import LaunchDetails from "./components/LaunchDetails";
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Stack } from "@fluentui/react"
import RocketsDropdown from "./components/core/RocketsDropdown";


export default function Home() {

  const styles = useStyles();
  const [launchesList, nextPage, hasMore, searchLaunchByName] = useLaunches()
  const loader = useRef(null);
  const [isOpen, setPanel] = useState(false);
  const [launchId, setlaunchId] = useState('');

  

  const dismissPanel = () => {
    setPanel(false)
  }

  // const fetchRockets = async () => {
  //   const rocketsList = await getRockets();
  //   console.log('RocketsList', rocketsList);
  // }

  useEffect(() => {

    // fetchRockets()

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

  const onLaunchClick = (id) => {
    setlaunchId(id)
    setPanel(true)
  }

  const OnSearch = (searchText) => {
    console.log('OnSearch', searchText)
    debounce(searchLaunchByName(searchText), 500)
  }


  return (
    <FluentProvider theme={webLightTheme}>
      <div className={`${styles.container} ${styles.center}`}>
        <nav>
          <Text as="h1" className={styles.title}>
            Launches Explorer
          </Text>

          <Stack horizontal wrap tokens={{childrenGap: 10, padding: 20}} horizontalAlign="center">
            <Stack.Item>
                <SearchBox style={{width: 250}} placeholder="Search Mission..."/>
            </Stack.Item>
            <Stack.Item>
              <RocketsDropdown />
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
            launchesList && launchesList?.map(rocket => {
              return (
                <Stack.Item onClick={() => onLaunchClick(rocket.id)}>
                  <RocketItem {...rocket} />
                </Stack.Item>
              )
            })
          }
        </Stack>
          {hasMore ? <div ref={loader}><Spinner size={'large'} /></div> : <p>No more launches</p>}
        </section>

        {/* <Panel
        headerText="Sample panel"
        isOpen={isOpen}
        isLightDismiss={true}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
       {launchId && <LaunchDetails launchId={launchId} />}
      </Panel> */}
      </div>
    </FluentProvider>
  );
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const useStyles = makeStyles({
  title: typographyStyles.title1,
  horizontalStack: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  container: {
    maxWidth: '80%',
    margin: 0,
    padding: 0,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  center: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
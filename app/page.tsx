'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { DocumentCard, Dropdown, Panel, PrimaryButton, SearchBox, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import { useLaunches } from "./hooks/useLaunches";
import RocketItem from "./components/RocketItem";
import { useEffect, useRef, useState } from "react";
import LaunchDetails from "./components/LaunchDetails";

export default function Home() {

  const [launchesList, nextPage, hasMore, searchLaunchByName] = useLaunches()
  const loader = useRef(null);
  const [isOpen, setPanel] = useState(false);
  const [launchId, setlaunchId] = useState('');

  const dismissPanel = () => {
    setPanel(false)
  }

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

  const onLaunchClick = (id) => {
    setlaunchId(id)
    setPanel(true)
  }

  const OnSearch = (searchText) => {
    console.log('OnSearch', searchText)
    debounce(searchLaunchByName(searchText), 500)
  }


  return (
    <div className={styles.page}>
      <nav>
        <h2>Launches Explorer</h2>
        <Stack horizontal horizontalAlign="space-between">
          <Stack.Item>
            <SearchBox placeholder="Search" onChange={OnSearch} />
          </Stack.Item>
          <Stack.Item>
            <Dropdown
              placeholder="Select Rockets..."
              // selectedKeys={selectedKeys}
              // // eslint-disable-next-line react/jsx-no-bind
              onChange={() => { }}
              multiSelect
              options={[]}
            // styles={dropdownStyles}
            />
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton text="Reset" onClick={() => { }} />
          </Stack.Item>
        </Stack>
      </nav>

      <section>
        <Stack wrap
          horizontal
          horizontalAlign="center"
          tokens={{ childrenGap: 20 }}
          styles={{ root: { width: "100%", maxWidth: 700 } }}
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
        {hasMore ? <div ref={loader}><Spinner size={SpinnerSize.large} /></div> : <p>No more launches</p>}
      </section>

      <Panel
        headerText="Sample panel"
        isOpen={isOpen}
        isLightDismiss={true}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
       {launchId && <LaunchDetails launchId={launchId} />}
      </Panel>
    </div>
  );
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
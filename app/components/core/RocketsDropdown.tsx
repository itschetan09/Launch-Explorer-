import { useLaunches } from '@/app/hooks/useLaunches';
import { RocketType } from '@/app/services/rocket';
import { Dropdown, Option } from '@fluentui/react-components'
import React, { useEffect, useState } from 'react'

function RocketsDropdown() {

    const [rocketOptions, setRockets] = useState<RocketType[]>([]);

    const fetchRockets = async () => {
        try {
            const res = await fetch("https://api.spacexdata.com/v4/rockets", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            if (data && data?.length) {
                setRockets(prevR => [...prevR, ...data]);
            }
        } catch (error) {
            console.log('Error', error)
        }
    }

    useEffect(() => {
        fetchRockets()
    }, [])

    return (
        <Dropdown
            placeholder="Select Rocket..."
            onChange={() => { }}
            multiselect
            style={{ width: 200 }}
            // onSelect={}
        >
            {rocketOptions.map(rocket => (
                <Option key={rocket.id}>
                    {rocket.name}
                </Option>
            ))}
        </Dropdown>
    )
}

export default RocketsDropdown
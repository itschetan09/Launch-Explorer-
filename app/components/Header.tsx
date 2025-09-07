'use client'

import { Stack } from '@fluentui/react'
import { Button, Persona, SearchBox, Text } from '@fluentui/react-components'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const navigateToHome = () => {
    router.push('/')
  }

  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      styles={{
        root: {
          height: 60,
          padding: '0 20px',
          background: '#f3f2f1',
          borderBottom: '1px solid #e1dfdd',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 99
        },
      }}
    >
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <Button 
          appearance="subtle" 
          onClick={navigateToHome}
          style={{ background: 'transparent', border: 'none' }}
        >
          <Text as="h3" style={{ margin: 0 }}>
            SpaceX Launches
          </Text>
        </Button>
      </Stack>

      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        <Persona
          name="Chetan Prajapati"
          secondaryText="Available"
          presence={{ status: "available" }}
        />
      </Stack>
    </Stack>
  )
}
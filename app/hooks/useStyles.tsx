'use client'

import { makeStyles, typographyStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
    title: typographyStyles.title3,
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

  export default useStyles;
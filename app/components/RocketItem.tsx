'use client'
import { Body1, Caption1, Card, CardFooter, CardHeader, CardPreview, makeStyles, MessageBar, MessageBarBody, MessageBarTitle, tokens } from '@fluentui/react-components';
import { useRouter } from 'next/navigation';


const useStyles = makeStyles({
  main: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    columnGap: "16px",
    rowGap: "36px",
  },

  title: { margin: "0 0 12px" },

  description: { margin: "0 0 12px" },

  card: {
    width: "400px",
    maxWidth: "100%",
    height: "fit-content",
  },

  link: {
    color: tokens.colorNeutralForeground1,

    ":hover": {
      color: tokens.colorNeutralForeground1,
      textDecoration: "none",
    },
  },

  text: { margin: "0" },
});


function RocketItem(props) {
  const { name, details, links, date_utc, upcoming, success, id } = props
  const styles = useStyles();
  const router = useRouter()

  const onActionCardClick = () => {
    router.push("launches/"+id)
  }

  return (
    <Card
      className={styles.card}
      onClick={onActionCardClick}
    >
      <CardPreview style={{ height: 300, width: 'auto' }}>
        <img
          src={links.patch.large}
          alt={details}
          height={300}
          width={'auto'}
          style={{ margin: 'auto', width: 'auto' }}
        />
      </CardPreview>

      <CardHeader
        image={
          <img
            src={links.patch.small}
            width="32px"
            height="32px"
            alt={details}
          />
        }
        header={
          <Body1>
            <b>{name}</b>
          </Body1>
        }
        description={<Caption1>{new Date(date_utc).toUTCString()}</Caption1>}
      />

      <p className={styles.text}>
        {details}
      </p>

      <CardFooter>
        <MessageBar intent={upcoming ? 'info' : success ? 'success' : 'error'} style={{width: '100%'}}>
          <MessageBarBody>
            <MessageBarTitle>Mission Status: {upcoming ? 'Upcoming' : success ? 'Successful!' : 'Failed!'}</MessageBarTitle>
          </MessageBarBody>
        </MessageBar>
      </CardFooter>
    </Card>
  )
}

export default RocketItem
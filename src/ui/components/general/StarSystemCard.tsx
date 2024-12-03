import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@mui/material'
import { TScenario } from '@/core/data/types'
import { appStore } from '@/core/mobX/AppStore'

const getFullURL = (url: string) => {
  return require(`@/images/${url}`)
}

const clipStr = (str: string, count: number = 100): string => {
  if (str.length > count) {
    return str.substring(0, count) + '...'
  }

  return str
}

const StarSystemCard: FC<{ data: TScenario }> = observer(({ data }) => {
  return (
    <Card sx={{ width: 250, height: 330 }}>
      <CardMedia sx={{ height: 150 }} image={getFullURL(data.preview)} title={data.name} />
      <CardContent sx={{ height: 130 }}>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Tooltip title={data.description} placement="bottom">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {clipStr(data.description)}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => appStore.setScenario(data)}>
          Run
        </Button>
      </CardActions>
    </Card>
  )
})

export default StarSystemCard

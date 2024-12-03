import { observer } from 'mobx-react-lite'
import { appStore } from '@/core/mobX/AppStore'
import { KeyboardDoubleArrowRight, KeyboardArrowRight, Pause } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

const defineIcon = (multiplier: number) => {
  switch (true) {
    case multiplier >= 1 && multiplier < 30:
      return <KeyboardArrowRight />
    case multiplier >= 30:
      return <KeyboardDoubleArrowRight />
    default:
      return <Pause />
  }
}

const TimeSpeedCounter = observer(() => {
  return (
    <Box display="flex" alignItems="center" width={150}>
      {defineIcon(appStore.speedOfTime)}
      <Typography noWrap>
        {`x${appStore.speedOfTime}`} {appStore.speedOfTime === 1 ? '(real rate)' : ''}
      </Typography>
    </Box>
  )
})

export default TimeSpeedCounter

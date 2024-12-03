import { observer } from 'mobx-react-lite'
import { Alert, Slide, Snackbar } from '@mui/material'
import { appStore } from '@/core/mobX/AppStore'
import { FC } from 'react'
import { NotificationMessageProps } from '@/ui/interfaces/NotificationMessageProps'

const NotificationMessage: FC<NotificationMessageProps> = observer(({ type, message }) => {
  return (
    <Snackbar
      open={appStore.notification.isOpen}
      TransitionComponent={Slide}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={5000}
      onClose={() => appStore.closeNotification()}
    >
      <Alert severity={type} onClose={() => appStore.closeNotification()} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
})

export default NotificationMessage

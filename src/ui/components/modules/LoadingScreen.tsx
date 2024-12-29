import { observer } from 'mobx-react-lite'
import { appStore } from '@/core/mobX/AppStore'

const LoadingScreen = observer(() => {
  return (
    <div className="loading-screen">
      <div className="loading-screen-data">
        <div className="counter">{appStore.loadingPercentage}%</div>
        <div className="progressbar">
          <span className="progress" style={{ width: appStore.loadingPercentage + '%' }}></span>
        </div>
        <div className="file">{appStore.appLoadingAsset}</div>
      </div>
    </div>
  )
})

export default LoadingScreen

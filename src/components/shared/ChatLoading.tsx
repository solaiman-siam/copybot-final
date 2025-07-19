

import Lottie from 'lottie-react'
import Loading from '../../assets/images/loading.json'

function ChatLoading() {
  return (
    <div>
        <Lottie className={`w-10`} animationData={Loading} loop={true} />
    </div>
  )
}

export default ChatLoading
function TimeFrame({ setTimeframe, getSQLforTimeFrame, setRefreshTime, refreshTime, setTimeSinceUpdate, timeSinceUpdate, setRefreshClicked}) {

  const handleRefresh = () => {
    getSQLforTimeFrame()
    setTimeSinceUpdate(Date.now())
    setRefreshTime(Date.now())
    setRefreshClicked(true)
  }

  const handleTimeFrameSelect = (e) => {
    setTimeframe(e.target.value)
  }

  let timeInMinutes = Math.floor((timeSinceUpdate - refreshTime) / 60000)
  if (timeInMinutes < 0 ) { timeInMinutes = 0 }
  const disableButton = timeInMinutes < 1
  
  return (
    <>
      <div className="p-16 flex items-center space-x-5">
        <h2 className="text-left font-head text-horusBlue text-7xl">Metrics</h2>
        <span className="w-3/4"></span>
        <div >
        <p className="font-body text-xs text-gray-400">Last updated {timeInMinutes} minutes ago</p>
          <div className="flex divide-x divide-gray-200 rounded-md shadow-lg p-3">
            <button className="pr-4" disabled={disableButton} onClick={handleRefresh}>
              <svg className="opacity-40" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/>
              </svg>
            </button>
            <form className="font-body" action="#">
              <label for="timeframe"></label>
              <select className="bg-white pl-2 pr-20" name="timeframe" id="timeframe" onChange={(e) => handleTimeFrameSelect(e)} >
                <option value="15 minutes">15 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="4 hours">4 hours</option>
                <option value="24 hours">24 hours</option>
                <option value="1 week">1 week</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default TimeFrame;
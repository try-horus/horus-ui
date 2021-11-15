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
      <div className="flex justify-end items-center space-x-5">
        <p className="text-xs text-gray-400">Page was last updated {timeInMinutes} minutes ago</p> 
        <button className="border-solid border-4 border-blue-700 p-3 rounded-lg border-opacity-25" disabled={disableButton} onClick={handleRefresh}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/>
          </svg>
        </button>
        <form className="bg-blue-700 p-3 rounded-lg bg-opacity-25" action="#">
          <label for="timeframe">Time frame: </label>
          <select name="timeframe" id="timeframe" onChange={(e) => handleTimeFrameSelect(e)} >
            <option value="15 minutes">15 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="4 hours">4 hours</option>
            <option value="24 hours">24 hours</option>
            <option value="1 week">1 week</option>
          </select>
        </form>
      </div>
    </>
  )
}

export default TimeFrame;
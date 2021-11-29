import { ResponsiveLine } from '@nivo/line'
import { useState, useEffect } from "react"
import { useRouter } from 'next/router'

const createQueryDatesStrings = (endTime) => {
    let end = new Date(endTime)
    let start = new Date(end - 10000)
    end = end.toISOString()
    start = start.toISOString()

    return [start, end]
}

const LineChart = ({ data , style, chartName }) => {
    const router = useRouter()

    const handleDataClick = (point) => {
        const [start, end] = createQueryDatesStrings(point.data.xFormatted)
        const href = `http://${window.location.hostname}:3000/traces?start=${start}&end=${end}`
        router.push(href)
    }

    const latencyLegend = {
        anchor: 'top-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 70,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
            {
                on: 'hover',
                style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                }
            }
        ]
    }

    return (
      <div className="justify-center pl-12 pb-14 mb-14" style={{height: 600}}>
        <h1 className="font-head text-horusBlue text-left rounded-lg text-4xl">{chartName}</h1>
        <ResponsiveLine
        theme={{fontFamily: "Roboto"}}
        data={data}
        margin={{ top: 50, right: 170, bottom: 50, left: 60 }}
        xScale={{ format: "%Y-%m-%dT%H:%M:%S.%L%Z", type: "time" }}
        xFormat="time:%Y-%m-%d %H:%M:%S"
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        yFormat=" >-.0d"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: "%b %d %H%:%M:%S",
            orient: 'bottom',
            tickValues: 6,
            legend: 'Time',
            legendOffset: 40,
            legendPosition: 'middle',
            fontFamily: 'Rubik'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendOffset: -50,
            legendPosition: 'middle'
        }}
        onClick={(point) => handleDataClick(point)}
        onMouseEnter={(point, event) => {
            event.target.style.cursor = "pointer"
        }}
        onMouseLeave={(point, event) => {
            event.target.style.cursor = "default"
        }}
        colors={datum => datum.color}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        curve={style}
        tooltip={point => { 
            return ( 
            <div className="bg-white border-2 border-gray-400 p-2 text-xs">
              <div>Time: {point.point.data.xFormatted}</div>
              <div>Value: {point.point.data.yFormatted}</div> 
            </div>)
            }
        }
        useMesh={true}
        legends={
            chartName === 'Latency Health' ? [latencyLegend] : []
        }
      />
    </div>
  )
}

export default LineChart
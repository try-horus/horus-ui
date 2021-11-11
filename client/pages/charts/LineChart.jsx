import { ResponsiveLine } from '@nivo/line'
import { useRouter } from 'next/router'




const LineChart = ({ data , style }) => {
    const router = useRouter()

    const handleDataClick = (point) => {
        const end = new Date(point.data.xFormatted).toISOString()
        console.log(end)
        const start = new Date(new Date(point.data.xFormatted) - 10000).toISOString()
        console.log(start)
        const href = `http://localhost:3000/traces?start=${start}&end=${end}`

        router.push(href)
    }


    return (
      <div style={{ height: 500 }}>
        <ResponsiveLine
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
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        onClick={(point) => handleDataClick(point)}
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
        legends={[
            {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
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
        ]}
      />
    </div>
  )
}

export default LineChart
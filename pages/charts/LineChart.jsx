import { ResponsiveLine } from '@nivo/line'

const LineChart = ({ data , schemeColour }) => {
    console.log(schemeColour)
    return (
      <div style={{ height: 500 }}>
        <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ 
            "type": "time", 
            "format": "%Y-%m-%d %H:%M:%S", 
            "precision": "minute" 
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: "%b %d %H%:%M:%S",
            // orient: 'bottom',
            // tickSize: 5,
            // tickPadding: 5,
            // tickRotation: 0,
            tickValues: 6,
            legend: 'time scale',
            legendOffset: -12,
            // legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: schemeColour }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
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
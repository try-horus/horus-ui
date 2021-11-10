import { ResponsivePie } from '@nivo/pie'

const data = [
  {
    "id": "GET /dashboard",
    "label": "GET /dashboard",
    "value": 550,
    "color": "hsla(129, 100%, 45%, 1)"
  },
  {
    "id": "GET /movies",
    "label": "GET /movies",
    "value": 450,
    "color": "hsla(129, 100%, 45%, 1)"
  },
  {
    "id": "express init",
    "label": "express init",
    "value": 100,
    "color": "hsla(9, 100%, 39%, 1)"
  },
  {
    "id": "middleware query",
    "label": "middleware query",
    "value": 112,
    "color": "hsla(129, 100%, 45%, 1)"
  },
  {
    "id": "http thing",
    "label": "http thing",
    "value": 50,
    "color": "hsla(9, 100%, 39%, 1)"
  }
]

const PieChart = () => {
    return (
      <div style={{ height: 500 }}>
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            endAngle={90}
            innerRadius={0.45}
            cornerRadius={3}
            activeOuterRadiusOffset={17}
            colors={datum => datum.data.color}
            borderWidth={3}
            borderColor="#ffffff"
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsStraightLength={28}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
            enableArcLabels={false}
            arcLabel={function(e){return e.id+" ("+e.value+")"}}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            motionConfig="wobbly"
            legends={[
                {
                    anchor: 'bottom-left',
                    direction: 'column',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 20,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    </div>
    )
}

export default PieChart
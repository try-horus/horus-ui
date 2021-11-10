// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/sankey
import { ResponsiveSankey } from '@nivo/sankey'

const data = {
  "nodes": [
    {
      "id": "Start",
      "nodeColor": "hsl(240, 70%, 50%)"
    },
    {
      "id": "End",
      "nodeColor": "hsl(187, 70%, 50%)"
    },
    {
      "id": "Ibrahim",
      "nodeColor": "hsl(77, 70%, 50%)"
    },
    {
      "id": "Junko",
      "nodeColor": "hsl(343, 70%, 50%)"
    }
  ],
  "links": [
    {
      "source": "Start",
      "target": "End",
      "value": 47
    },
    {
      "source": "Start",
      "target": "Junko",
      "value": 10
    },
    {
      "source": "Ibrahim",
      "target": "End",
      "value": 10
    },
    {
      "source": "Junko",
      "target": "Ibrahim",
      "value": 10
    }
  ]
}

const TraceChart = () => {
  return (
    <div style={{ height: 500 }}>
      <ResponsiveSankey
          data={data}
          margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
          align="justify"
          colors={{ scheme: 'category10' }}
          nodeOpacity={1}
          nodeHoverOthersOpacity={0.35}
          nodeThickness={18}
          nodeSpacing={24}
          nodeBorderWidth={0}
          nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
          nodeBorderRadius={3}
          linkOpacity={0.5}
          linkHoverOthersOpacity={0.1}
          linkContract={3}
          enableLinkGradient={true}
          labelPosition="outside"
          labelOrientation="vertical"
          labelPadding={16}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  translateX: 130,
                  itemWidth: 100,
                  itemHeight: 14,
                  itemDirection: 'right-to-left',
                  itemsSpacing: 2,
                  itemTextColor: '#999',
                  symbolSize: 14,
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

export default TraceChart
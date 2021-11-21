import React from 'react';
import { Bar } from 'react-chartjs-2';

/*
This is the format that the data object should have:
const data = {
  labels: ["span1", "span2", "span3", "span4", "span5"],
  datasets: [{
    data: [[0,50], [1,4], [4,14], [14,29], [29,50]]
  }]
}
*/

const WaterfallChart = ({ labels, datasets, handleClickOnChart }) => {
  console.log(datasets)
  const options = {
    type: 'bar',
    // responsive: true,
    // maintainAspectRatio: false,
    aspectRatio: 2,
    indexAxis: 'y',
    plugins:{   
      legend: {
        display: false
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Span Duration (microseconds)',
          font: {size: 18}
        }
      },
      y: {
        title: {
          display: true,
          text: 'Span Name',
          font: {size: 18}
        }
      },
    },
    skipNull: true,
  
    backgroundColor: [
      "rgba(185, 131, 255, 1)",
      "rgba(6, 223, 215, 1)",
      "rgba(255, 100, 100, 1)", 
      "rgba(196, 251, 110, 1)",
      "rgba(255, 223, 108, 1)"
    ],
  
    onClick: handleClickOnChart
  }

  const data = {
    labels,
    datasets,
  }

  return <Bar data={data} options={options} />
}

export default WaterfallChart
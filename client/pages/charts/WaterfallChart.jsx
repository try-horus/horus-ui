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
      'rgba(54, 127, 143, 1)',
      'rgba(73, 173, 175, 1)',
      'rgba(104, 194, 191, 1)',
      'rgba(242, 188, 70, 1)',
      'rgba(228, 135, 76, 1)',
      'rgba(223, 86, 77, 1)',
      'rgba(243, 224, 181, 1)',
      'rgba(39, 29, 63, 1)',
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
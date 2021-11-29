import React from 'react';
import { Bar } from 'react-chartjs-2';

const WaterfallChart = ({ labels, datasets, handleClickOnChart }) => {
  const options = {
    type: 'bar',
    aspectRatio: 2,
    maintainAspectRatio: false,
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
          font: {
            size: 12,
            family: "Roboto" 
          }
        },
        ticks: {
          font: {
            family: "Roboto"
          }
        }
      },
      y: {
        title: {
          display: true,
          text: '',
          font: {
            size: 18,
            family: "Roboto" 
          }
        },
        ticks: {
          font: {
            family: "Roboto"
          }
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

  return <Bar data={data} options={options}/>
}

export default WaterfallChart
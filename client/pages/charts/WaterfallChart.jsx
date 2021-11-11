import React from 'react';
import { Bar } from 'react-chartjs-2';


const WaterfallChart = ({ data, options }) => {
  return <Bar data={data} options={options} />
}

export default WaterfallChart
// // DonutChart.jsx
// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin

// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
// ChartJS.register(ArcElement, Tooltip, Legend);

// function DonutChart() {
//   const data = {
//     labels: ['Completed', 'Absent', 'Cancel'],
//     datasets: [
//       {
//         label: '# of Votes',
//         data: [ 19, 3, 5],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.9)',
//           'rgba(54, 162, 235, 0.9)',
//           'rgba(255, 206, 86, 0.9)'
         
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)'
          
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         enabled: true,
//       },
//       datalabels: {
//         formatter: (value, context) => {
//           // Return label and value together
//           const label = context.chart.data.labels[context.dataIndex];
//           return `${label}: ${value}`;
//         },
//         color: '#000', // Customize label color
//         font: {
//           size: 14,
//         },
//         anchor: 'end',
//         align: 'start',
//         offset: 10,
//       },
//     },
//   };

//   return <Doughnut data={data} options={options} />;
// }


// export default DonutChart;


// DonutChart.jsx
// import React from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// function DonutChart() {
//   const data = {
//     labels: ["Consultation", "Absence", "Return"],
//     datasets: [
//       {
//         label: "Patients",
//         data: [120, 60, 34],
//         backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
//         borderColor: ["#ff6384", "#36a2eb", "#ffcd56"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       tooltip: {
//         enabled: true,
//       },
//       datalabels: {
//         formatter: (value, context) => {
//           const label = context.chart.data.labels[context.dataIndex];
//           return `${label}: ${value}`;
//         },
//         color: "#000",
//         font: {
//           size: 16,
//         },
//         anchor: "center",
//         align: "center",
//       },
//     },
//   };

//   return (
//     <div style={{ width: "300px", margin: "0 auto" }}>
//       <Doughnut data={data} options={options} />
//     </div>
//   );
// }

// export default DonutChart;


// DonutChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DonutChart = ({arr}) => {
  const data = {
    labels: ['Completed', 'Unattended', 'Rejected'],
    datasets: [
      {
        data: arr, // Example data
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)', // Blue for Consultation
          'rgba(255, 99, 132, 0.8)', // Red for Absence
          'rgba(255, 206, 86, 0.8)', // Yellow for Return
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 1.5)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderColor: ['#fff'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      datalabels: {
        display: true,
        color: '#000',
        formatter: (value, context) => {
          return ` ${value.toFixed(1)}%`;
        },
        font: {
          size: 14,
        },
      },
    },
  };

  return (
    <div className='donutX' >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;

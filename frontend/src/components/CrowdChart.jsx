import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CrowdChart() {

  const data = {

    labels: [
      "8 AM",
      "10 AM",
      "12 PM",
      "2 PM",
      "4 PM",
      "6 PM",
      "8 PM"
    ],

    datasets: [
      {
        label: "Crowd Density",
        data: [120, 180, 300, 400, 350, 500, 420],
        borderColor: "#4CAF50",
        backgroundColor: "#4CAF50"
      }
    ]
  };

  const options = {

    responsive: true,

    plugins: {

      legend: {
        labels: {
          color: "white"
        }
      }
    },

    scales: {

      x: {
        ticks: {
          color: "white"
        }
      },

      y: {
        ticks: {
          color: "white"
        }
      }
    }
  };

  return (

    <div style={{
      background: "#1e3a5f",
      padding: "30px",
      borderRadius: "20px",
      marginTop: "40px"
    }}>

      <h2 style={{
        textAlign: "center",
        marginBottom: "20px"
      }}>
        📈 Crowd Trend Analysis
      </h2>

      <Line data={data} options={options} />

    </div>
  );
}

export default CrowdChart;
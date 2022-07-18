import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ dataValue, select }) {
  const value = dataValue;

  let options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Penambahan Berat Janin"
      },
      datalabels: {
        font: {
          size: 24
        }
      }
    }
  };

  let labels = [];

  for (let i = 0; i < value.length; i++) {
    labels.push(`Bulan ke ${i + 1}`);
  }

  let data = {
    labels,
    datasets: [
      {
        label: "Gram",
        data: value,
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ],
    font: {
      size: 24
    }
  };

  if (select.key === `baby`) {
    options.plugins.title.text = "Penambahan Berat Bayi";
    data.datasets[0].backgroundColor = "rgba(75, 192, 192, 1)";
  }

  return <Bar options={options} data={data} />;
}

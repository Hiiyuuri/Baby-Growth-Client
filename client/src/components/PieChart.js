import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart(dataValue) {
  const value = dataValue.dataValue;
  const totalData = value.reduce((a, b) => a + b, 0);
  const image = new Image();
  // image.src = "https://i.ibb.co/gwK9Pzz/Logo3.png";
  image.src = "https://i.ibb.co/QcYXxHz/Logo-180.png";
  // image.src = "https://i.ibb.co/K9D1m1m/Logo-150.png";

  const data = {
    labels: ["Kurang", "Cukup", "Berlebih"],
    datasets: [
      {
        label: "# of Votes",
        data: [value[0], value[1], value[2]],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  const option = {
    plugins: {
      legend: {
        display: true,
        title: {
          display: true,
          text: "Persentase Kecukupan Gizi Bayi Rentang Umur 0-24 Bulan",
          padding: 0,
          font: {
            size: 15,
            weight: "bold"
          }
        },
        position: "top"
      },
      datalabels: {
        font: {
          size: 24,
          lineHeight: 1
        },
        formatter: function(value) {
          const percentage = Math.round(value / totalData * 100);

          if (!percentage) {
            return ``;
          }
          return `${percentage}%`;
        }
      },
      id: "custom_canvas_background_image",
      beforeDraw: chart => {
        if (image.complete) {
          const ctx = chart.ctx;
          const { top, left, width, height } = chart.chartArea;
          const x = left + width / 2 - image.width / 2;
          const y = top + height / 2 - image.height / 2;
          ctx.drawImage(image, x, y);
        } else {
          image.onload = () => chart.draw();
        }
      }
    },
    responsive: true
  };

  const plugin = {
    id: "custom_canvas_background_image",
    beforeDraw: chart => {
      if (image.complete) {
        const ctx = chart.ctx;
        const { top, left, width, height } = chart.chartArea;
        const x = left + width / 2 - image.width / 2;
        const y = top + height / 2 - image.height / 2;
        ctx.drawImage(image, x, y);
      } else {
        image.onload = () => chart.draw();
      }
    }
  };

  return (
    <div>
      <Doughnut
        data={data}
        redraw="true"
        datasetIdKey="totalData"
        options={option}
        plugins={[plugin]}
      />
    </div>
  );
}

//Seluruh data Bulan TERAKHIR ie index terakhir

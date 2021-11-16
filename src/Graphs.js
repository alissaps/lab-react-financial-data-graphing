import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import FilterDate from "./FilterDate";

function Graphs() {
  const [bitcoinData, setBitcoinData] = useState({});
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => {
        setBitcoinData({ ...response.data.bpi });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      function renderChart() {
        const ctx = document.getElementById("myCanvas").getContext("2d");

        if (chart) {
          chart.destroy();
        }

        const chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: Object.keys(bitcoinData), // Array com as datas
            datasets: [
              {
                label: "Preço de fechamento Bitcoin",
                data: Object.values(bitcoinData),
              },
            ],
          },
        });

        setChart(chartInstance);
      }

      renderChart();
    }
  }, [loading, bitcoinData]);

  return (
    <div>
        <FilterDate/>
      <div>{loading ? "Carregando..." : <canvas id="myCanvas" />}</div>
    </div>
  );
}

export default Graphs;

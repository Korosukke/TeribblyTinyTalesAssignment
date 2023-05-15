import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import logo from './Assets/terribly.png';
import './SubmitStyles.css';

Chart.register(...registerables);

const Submit = () => {
  const [histogramData, setHistogramData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        'https://www.terriblytinytales.com/test.txt'
      );
      const data = response.data;

      const wordCountMap = {};
      const words = data.toLowerCase().match(/\b[\w']+\b/g);

      words.forEach((word) => {
        if (wordCountMap[word]) {
          wordCountMap[word]++;
        } else {
          wordCountMap[word] = 1;
        }
      });

      const sortedWords = Object.keys(wordCountMap).sort(
        (a, b) => wordCountMap[b] - wordCountMap[a]
      );

      const labels = sortedWords.slice(0, 20);
      const counts = labels.map((word) => wordCountMap[word]);

      const histogramChartData = {
        labels,
        datasets: [
          {
            label: 'Word Frequency',
            data: counts,
            backgroundColor: 'rgba(15,76,123)',
          },
        ],
      };

      setHistogramData(histogramChartData);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleExport = () => {
    if (!histogramData) return;

    const csvContent = `Word,Frequency\n${histogramData.labels
      .map((word, index) => `${word},${histogramData.datasets[0].data[index]}`)
      .join('\n')}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'histogram_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="button-container">
        {!histogramData ? (
          <button className="button" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <>
            <button className="button export-button" onClick={handleExport}>
              Export
            </button>
            <div className="chart-container">
              <Bar
                ref={chartRef}
                data={histogramData}
                options={{
                  scales: {
                    y: {
                      type: 'linear',
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Submit;

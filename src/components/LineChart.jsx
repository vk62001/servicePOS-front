import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  import React, { useEffect, useState } from 'react'
  


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Valores de un día anterior',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  console.log(labels);
  

  export const LineChart = ({dataYesterday}) => {

    const [lineLabels, setlineLabels] = useState([]);
    const [lineData, setlineData] = useState([]);
    const [colorLine, setColorLine] = useState('#006a41');

    const labels = ( )=>{
        const labelTemp = [];
        const dataTemp = []
            for (const key in dataYesterday) {
                if(key !== 'TIENDA'){
                    labelTemp.push(key);
                    dataTemp.push(dataYesterday[key])
                    if(dataYesterday[key]>0) setColorLine('#ff2b2e')
                }
            }
        setlineData(dataTemp);
        setlineLabels(labelTemp);
    };

    const data = {
        labels: lineLabels,
        datasets: [
          {
            label: 'Coincidencias',
            data: lineData,
            borderColor: colorLine,
            backgroundColor: colorLine,
          }
        ],
      };

    useEffect(() => {
      labels()
    
      return () => {
        
      }
    }, [dataYesterday])
    
 
    return <Line options={options} data={data} />;
  }
  
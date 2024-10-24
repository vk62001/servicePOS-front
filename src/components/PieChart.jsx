

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export const PieChart = ({goodPercentage, badPercentage}) => {
    const data = {
        labels:"",
        datasets: [
          {
            label: '# Coincidencias',
            data: [goodPercentage, badPercentage],
            weight:1,
            backgroundColor: [
              '#749B32',
              '#E30609',
            ],
            borderColor: [
                '#749B32',
                '#E30609',
            ],
            borderWidth: 0,
          },
        ],
      };
 

    return <div className='w-44'><Doughnut data={data} /></div>;
}
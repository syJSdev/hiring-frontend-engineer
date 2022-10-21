import type { FC } from 'react';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import type { ChartOptions, ChartData, DefaultDataPoint } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import cls from 'classnames';
import { rgba } from 'utils/color';

Chart.register(ArcElement, Tooltip);

export interface PayloadCardChartProps {
  className?: string;
  dataset: MissionSummary[];
}

const chartOptions: ChartOptions<'doughnut'> = {
  cutout: '94%',
  plugins: {
    tooltip: {
      backgroundColor: 'rgba(28, 31, 55, 1)',
      multiKeyBackground: 'transparent',
      bodyColor: '#fff',
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
      cornerRadius: 5,
      // color point
      displayColors: true,
      usePointStyle: true,
      boxWidth: 8,
      boxHeight: 8,
      boxPadding: 5,
      // caret
      caretSize: 5,
      caretPadding: 5,
      callbacks: {
        label: function (context) {
          let label = context.label || '';
          return label;
        },
        afterLabel: function (context) {
          if (context.formattedValue) {
            return context.formattedValue + ' KG';
          }

          return context.parsed + ' KG';
        },
        labelPointStyle: function () {
          return {
            pointStyle: 'circle',
            rotation: 0,
          };
        },
      },
    },
  },
};

const PayloadCardChart: FC<PayloadCardChartProps> = ({ className, dataset }) => {
  const data: ChartData<'doughnut', DefaultDataPoint<'doughnut'>, string> = {
    labels: dataset.map((item) => item.name),
    datasets: [
      {
        backgroundColor: dataset.map((item) => item.color),
        data: dataset.map((item) => item.total_payload_mass_kg),
        borderJoinStyle: 'round',
        borderRadius: 10,
        borderWidth: 0,
        hoverBorderWidth: 4,
        borderColor: dataset.map((item) => rgba(item.color, 0.2)),
        spacing: dataset.length > 2 ? 4 : 0,
      },
    ],
  };

  return (
    <div className={cls('flex items-center justify-center m-4', className)}>
      <div className={cls('h-40 w-40 sm:h-60 sm:w-60 md:h-40 md:w-40', className)}>
        <Doughnut data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export default PayloadCardChart;

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

interface LineChartProps {
    deviceInfos: DeviceData[];
    time: string;
}
export function LineChart({ deviceInfos, time }: LineChartProps) {
    const timeUnit = getTimeUnit(time); // Function to get the time unit based on the provided time string

    const temperatureData = {
        labels: deviceInfos[0]?.environmentValue
            .map((value) => moment(new Date(value.createdTime)).format(getTimeFormat(timeUnit)))
            .reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), [] as string[]), // Get unique labels
        values: deviceInfos[0]?.environmentValue.map((value) => value.value)
    };

    const data = {
        labels: temperatureData.labels,
        datasets: deviceInfos.map((device: DeviceData) => ({
            label: device.deviceName,
            data: temperatureData.values,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)'
        }))
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            title: {
                display: true,
                text: 'Chart showing temperature values over time of temperature sensors'
            },
            scales: {
                x: {
                    type: 'time' as const,
                    time: {
                        unit: timeUnit
                    }
                }
            }
        }
    };

    return <Line data={data} options={options} />;
}

function getTimeUnit(time: string): Chart.TimeUnit {
    if (time === 'hour') {
        return 'hour';
    } else if (time === 'minute') {
        return 'minute';
    } else if (time === 'date') {
        return 'date';
    } else {
        // Default to hour if time unit is not recognized
        return 'hour';
    }
}

function getTimeFormat(timeUnit: Chart.TimeUnit): string {
    if (timeUnit === 'hour') {
        return 'HH';
    } else if (timeUnit === 'minute') {
        return 'HH:mm';
    } else if (timeUnit === 'date') {
        return 'DD/MM';
    } else {
        // Default to 'HH:mm' format if time unit is not recognized
        return 'HH:mm';
    }
}

import moment from 'moment';
import Chart from 'react-apexcharts';
import { DEVICE_CATEGORY } from '@fe/constants';
interface LineChartProps {
    deviceInfos: DeviceData[];
    time: string;
}
export function LineChart({ deviceInfos, time }: LineChartProps) {
    const deviceTypeNames = DEVICE_CATEGORY;
    const TIME = {
        minute: {
            label: Array.from({ length: 60 }, (_, i) => `${i}:00`),
            timeUnit: 'second',
            format: 'HH:mm:ss'
        },
        hour: {
            label: Array.from({ length: 60 }, (_, i) => `${i}:00`),
            timeUnit: 'minute',
            format: 'HH:mm'
        },
        date: {
            label: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            timeUnit: 'hour',
            format: 'DD/MM-HH:00'
        }
    };

    const temperatureData = {
        labels: deviceInfos[0]?.environmentValue.map((value) =>
            moment(new Date(value.createdTime)).format(TIME[time as keyof typeof TIME].format)
        ),
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
        chart: {
            id: 'basic-bar'
        },
        xaxis: {
            categories: temperatureData.labels
        },
        stroke: {
            curve: 'smooth'
        },
        yaxis: {
            title: {
                text: `${deviceTypeNames[deviceInfos[0]?.deviceType as keyof typeof deviceTypeNames]?.shortName} ${deviceTypeNames[
                    deviceInfos[0]?.deviceType as keyof typeof deviceTypeNames
                ]?.unit}`
            }
        },
        title: {
            text: `${deviceTypeNames[deviceInfos[0]?.deviceType as keyof typeof deviceTypeNames]?.lineChartName}`,
            align: 'center'
        },
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        annotations: {
            yaxis: [
                {
                    y: 20,
                    borderColor: 'red',
                    label: {
                        borderColor: 'red',
                        style: {
                            color: '#fff',
                            background: '#00E396'
                        },
                        text: 'Min Alarm'
                    }
                },
                {
                    y: 40,
                    borderColor: 'red',
                    label: {
                        borderColor: 'red',
                        style: {
                            color: '#fff',
                            background: '#FEB019'
                        },
                        text: 'Max Alarm'
                    }
                }
            ]
        }
    };

    return <Chart options={options} series={data.datasets} type='line' height={350} />;
}

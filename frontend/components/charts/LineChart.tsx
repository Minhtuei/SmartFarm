import moment from 'moment';
import Chart from 'react-apexcharts';
import { DEVICE_CATEGORY } from '@fe/constants';
import { useMemo } from 'react';
interface DeviceData {
    deviceName: string;
    environmentValue: { createdTime: string; value: number }[];
    deviceType: string;
}

interface LineChartProps {
    deviceInfos: DeviceData[];
    time: string;
}

export function LineChart({ deviceInfos, time }: LineChartProps) {
    const deviceTypeNames = DEVICE_CATEGORY;

    const TIME = {
        minute: {
            timeUnit: 'second',
            format: 'HH:mm:ss'
        },
        hour: {
            timeUnit: 'minute',
            format: 'HH:mm'
        },
        date: {
            timeUnit: 'hour',
            format: 'DD/MM-HH:00'
        }
    };

    const temperatureData = (deviceInfos || []).map((device) => ({
        name: device.deviceName,
        data: device.environmentValue.slice(device.environmentValue.length - 19, device.environmentValue.length - 1).map((value) => ({
            x: moment(new Date(value.createdTime)).format(TIME[time as keyof typeof TIME].format),
            y: value.value
        }))
    }));

    const options = useMemo(
        () => ({
            series: temperatureData,
            chart: {
                id: 'basic-line'
            },
            xaxis: {
                type: 'category',
                categories: temperatureData.length > 0 ? temperatureData[0].data.map((data) => data.x) : []
            },
            stroke: {
                curve: 'smooth'
            },
            yaxis: {
                title: {
                    text: `${deviceTypeNames[deviceInfos[0]?.deviceType as keyof typeof deviceTypeNames]?.shortName} ${deviceTypeNames[
                        deviceInfos[0]?.deviceType as keyof typeof deviceTypeNames
                    ]?.unit}`,
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }
                }
            },
            title: {
                text: `${deviceTypeNames[deviceInfos[0]?.deviceType as keyof typeof deviceTypeNames]?.lineChartName}`,
                align: 'center',
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold'
                }
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
        }),
        [deviceInfos, deviceTypeNames, temperatureData]
    );

    return <Chart options={options} series={options.series} type='line' height={350} />;
}

import moment from 'moment';
import Chart from 'react-apexcharts';
import { DEVICE_CATEGORY } from '@fe/constants';
import { useMemo } from 'react';
import { useScreenSize } from '@fe/hooks';
import { useResponsiveStore } from '@fe/states';
interface DeviceData {
    deviceName: string;
    environmentValue: { createdTime: string; value: number }[];
    deviceType: string;
    minLimit?: number;
    maxLimit?: number;
}

interface LineChartProps {
    deviceInfos: DeviceData[];
    time: string;
}

export function LineChart({ deviceInfos, time }: LineChartProps) {
    const deviceTypeNames = DEVICE_CATEGORY;
    const screen = useScreenSize();
    const { darkMode } = useResponsiveStore();
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
        data: device.environmentValue.reduce(
            (unique, value) => {
                const timeFormat = moment(new Date(value.createdTime)).format(TIME[time as keyof typeof TIME].format);
                if (!unique.find((item) => item.x === timeFormat)) {
                    unique.push({
                        x: timeFormat,
                        y: value.value
                    });
                }
                return unique;
            },
            [] as Array<{ x: string; y: number }>
        )
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
            grid: {
                borderColor: darkMode ? '#333' : '#e8e8e8'
            },
            yaxis: {
                title: {
                    text: `${deviceTypeNames[deviceInfos[0]?.deviceType as keyof typeof deviceTypeNames]?.shortName} (${deviceTypeNames[
                        deviceInfos[0]?.deviceType as keyof typeof deviceTypeNames
                    ]?.unit})`,
                    style: {
                        fontSize: screen.screenSize >= 2 ? '14px' : '10px',
                        fontWeight: 'bold'
                    }
                }
            },
            title: {
                text: `${deviceTypeNames[deviceInfos[0]?.deviceType as keyof typeof deviceTypeNames]?.lineChartName}`,
                align: screen.screenSize >= 2 ? 'center' : 'left',
                style: {
                    fontSize: screen.screenSize >= 2 ? '20px' : '14px',
                    fontWeight: 'bold'
                }
            },
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            tooltip: {
                theme: darkMode ? 'dark' : 'light'
            },
            annotations: {
                yaxis: [
                    {
                        y: deviceInfos[0]?.minLimit,
                        borderColor: 'red',
                        label: {
                            borderColor: 'red',
                            style: {
                                color: '#fff',
                                background: '#00E396'
                            },
                            text: 'Ngưỡng dưới'
                        }
                    },
                    {
                        y: deviceInfos[0]?.maxLimit,
                        borderColor: 'red',
                        label: {
                            borderColor: 'red',
                            style: {
                                color: '#fff',
                                background: '#FEB019'
                            },
                            text: 'Ngưỡng trên'
                        }
                    }
                ]
            }
        }),
        [deviceInfos, deviceTypeNames, temperatureData, darkMode, screen.screenSize]
    );

    return <Chart options={options} series={options.series} type='line' height={350} />;
}

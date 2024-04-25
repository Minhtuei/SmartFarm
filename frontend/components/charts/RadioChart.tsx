import { Card, CardBody } from '@material-tailwind/react';
import Chart from 'react-apexcharts';
import { useMemo } from 'react';
export function RadioChart(deviceInfos: DevicesInfo) {
    const getAverageByType = (deviceInfos: DeviceData[], type: string) => {
        // Filter devices by type and calculate average
        const filteredDevices = deviceInfos.filter((device) => device.deviceType === type);
        if (filteredDevices.length === 0) return 0; // Handle case where there are no devices of this type
        const sum = filteredDevices.reduce((acc, device) => acc + device.lastValue, 0);
        return sum / filteredDevices.length;
    };

    const options = useMemo(
        () => ({
            series: [
                {
                    name: 'Average',
                    data: [
                        getAverageByType(deviceInfos.deviceInfos, 'temperature'),
                        getAverageByType(deviceInfos.deviceInfos, 'airhumidity'),
                        getAverageByType(deviceInfos.deviceInfos, 'earthhumidity'),
                        getAverageByType(deviceInfos.deviceInfos, 'light')
                    ]
                }
            ],
            chart: {
                type: 'radar'
            },
            xaxis: {
                categories: ['Nhiệt độ', 'Độ ẩm không khí', 'Độ ẩm đất', 'Ánh sáng'],
                labels: {
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }
                }
            },
            title: {
                text: 'Thông số trung bình tổng thể của trang trại',
                align: 'center',
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold'
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            },
            plotOptions: {
                radar: {
                    size: 150,
                    polygons: {
                        strokeColor: '#e8e8e8',
                        fill: {
                            colors: ['#f8f8f8', '#fff']
                        }
                    }
                }
            }
        }),
        [deviceInfos]
    );
    return (
        <Card>
            <CardBody>
                <Chart options={options} series={options.series} type='radar' height={400} />
            </CardBody>
        </Card>
    );
}

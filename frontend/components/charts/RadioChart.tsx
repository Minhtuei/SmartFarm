import { Card, CardBody } from '@material-tailwind/react';
import Chart from 'react-apexcharts';
import { useMemo } from 'react';
import { useScreenSize } from '@fe/hooks';
export function RadioChart(deviceInfos: DevicesInfo) {
    const screen = useScreenSize();
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
                        fontSize: screen.screenSize >= 2 ? '14px' : '10px',
                        fontWeight: 'bold'
                    }
                }
            },
            title: {
                text: 'Thông số trung bình tổng thể của trang trại',
                align: 'center',
                style: {
                    fontSize: screen.screenSize >= 2 ? '20px' : '14px',
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
        <Card className='overflow-auto'>
            <CardBody className='flex justify-center'>
                <Chart options={options} series={options.series} type='radar' width={450} height={400} />
            </CardBody>
        </Card>
    );
}

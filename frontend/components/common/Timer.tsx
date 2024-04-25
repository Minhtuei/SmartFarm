import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@fe/hooks';
export function Timer() {
    const [timer, setTimer] = useState<number>(9);
    const [darkMode] = useDarkMode();
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev - 1 < 0 ? 9 : prev - 1));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className='p-[10px] w-full'>
            <div className='flex justify-center mt-[14px]'>
                <div className='text-[#1F2328] dark:text-white font-semibold text-[18px] leading-[21px]'>Thời gian</div>
            </div>
            <div className='flex justify-center mt-[14px]'>
                <CircularProgressbarWithChildren
                    value={(timer / 9) * 100}
                    strokeWidth={9}
                    className='w-32 h-32'
                    styles={{
                        path: {
                            stroke: darkMode ? '#fff' : '#059669',
                            transition: 'stroke-dashoffset 0.5s ease 0s'
                        },
                        trail: { stroke: '#D0D7DE33' }
                    }}
                >
                    <div className='text-[#1F2328] dark:text-white font-bold text-[36px] leading-[43px]'>
                        {timer.toString().padStart(2, '0')}
                    </div>
                </CircularProgressbarWithChildren>
            </div>
        </div>
    );
}

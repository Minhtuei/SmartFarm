import { Link } from 'react-router-dom';
import Logo from '@fe/assets/sprinkler.png';
import { Typography } from '@material-tailwind/react';
import { ChevronDoubleLeftIcon } from '@heroicons/react/20/solid';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { useScreenSize } from '@fe/hooks';
export function AppSlideMenu({ menu, open, setOpen }: { menu: RouteMenu } & { open: boolean; setOpen: (open: boolean) => void }) {
    const screen = useScreenSize();
    return (
        <div
            className={
                `fixed top-0 left-0 h-full bg-green/1 text-white dark:bg-black/1` + (open && screen.screenSize >= 2 ? ` w-60` : ` w-16`)
            }
        >
            <div className='p-4 flex items-center justify-between'>
                {open && screen.screenSize >= 2 ? (
                    <>
                        <div className='flex items-center select-none'>
                            <img src={Logo} alt='logo' className='w-16 h-16' />
                            <Typography className='font-semibold text-lg ' placeholder={undefined}>
                                Smart Farm
                            </Typography>
                        </div>{' '}
                        <ChevronDoubleLeftIcon className='h-5 w-5 hover:text-black/1 cursor-pointer' onClick={() => setOpen(false)} />
                    </>
                ) : (
                    <ChevronDoubleRightIcon className='h-5 w-5 hover:text-black/1 cursor-pointer ml-1' onClick={() => setOpen(true)} />
                )}
            </div>
            <div>
                {menu.map((item, i) => {
                    if (item === 'divider') {
                        return <div key={i} className='border-t border-gray-700' />;
                    }
                    if (item.type === 'item') {
                        return (
                            <Link
                                to={item.path}
                                key={i}
                                className={`block hover:bg-white hover:text-black/1 rounded-xl w-4/5 ${
                                    open && screen.screenSize >= 2 ? 'mx-4' : 'mx-2'
                                } px-2 py-3 focus:bg-white focus:text-black/1 mb-2`}
                            >
                                {open && screen.screenSize >= 2 ? (
                                    <div className='flex items-center'>
                                        {item.icon}
                                        <span className='ml-2'>{item.name}</span>
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-center'>{item.icon}</div>
                                )}
                            </Link>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

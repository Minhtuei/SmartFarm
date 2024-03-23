import { ILayout } from '@fe/interfaces';
import { Card } from '@material-tailwind/react';
import { SnackbarProvider } from 'notistack';
export const AuthLayout: ILayout = ({ children }) => {
    return (
        <div className='w-full h-[100vh] bg-gradient-to-r from-green/1 to-gray-900'>
            <Card placeholder={''} className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] sm:w-[30vw]'>
                {children}
            </Card>
            <div>
                <SnackbarProvider maxSnack={3} />
            </div>
        </div>
    );
};

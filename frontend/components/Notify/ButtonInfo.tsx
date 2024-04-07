import React from 'react';
import { IconButton } from '@material-tailwind/react';
import { HiDotsHorizontal } from 'react-icons/hi';
interface ButtonInfoProps {
    link: string;
}

const ButtonInfo: React.FC<ButtonInfoProps> = ({ link }) => {
    return (
        <a href={link}>
            <IconButton variant='outlined'>
                <HiDotsHorizontal className='text-xl' />
            </IconButton>
        </a>
    );
};

export { ButtonInfo };

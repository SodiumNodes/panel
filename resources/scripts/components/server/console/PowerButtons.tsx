import React, { useEffect, useState } from 'react';
import { Button } from '@/components/elements/button/index';
import Can from '@/components/elements/Can';
import { ServerContext } from '@/state/server';
import { PowerAction } from '@/components/server/console/ServerConsoleContainer';
import { Dialog } from '@/components/elements/dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPowerOff, faSync } from '@fortawesome/free-solid-svg-icons';

interface PowerButtonProps {
    className?: string;
}

export default ({ className }: PowerButtonProps) => {
    const [open, setOpen] = useState(false);
    const status = ServerContext.useStoreState((state) => state.status.value);
    const instance = ServerContext.useStoreState((state) => state.socket.instance);

    const killable = status === 'stopping';
    const onButtonClick = (
        action: PowerAction | 'kill-confirmed',
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        if (action === 'kill') {
            return setOpen(true);
        }

        if (instance) {
            setOpen(false);
            instance.send('set state', action === 'kill-confirmed' ? 'kill' : action);
        }
    };

    useEffect(() => {
        if (status === 'offline') {
            setOpen(false);
        }
    }, [status]);

    return (
        <div className={className}>
            <Dialog.Confirm
                open={open}
                hideCloseIcon
                onClose={() => setOpen(false)}
                title={'Forcibly Stop Process'}
                confirm={'Continue'}
                onConfirmed={onButtonClick.bind(this, 'kill-confirmed')}
            >
                Forcibly stopping a server can lead to data corruption.
            </Dialog.Confirm>
            <Can action={'control.start'}>
                <button 
                    className={` ${!status || status === 'offline' ? 'cursor-not-allowed' : 'cursor-pointer'}
                    transition-colors
                    px-5 py-2 rounded-md
                    text-green-500 bg-green-600
                    hover:text-green-400
                    disabled:text-neutral-400 disabled:bg-neutral-600`}
                    disabled={!status || status === 'offline'}
                    onClick={onButtonClick.bind(this, 'start')}>
                        <FontAwesomeIcon icon={faPlayCircle} className='text-green-500'/> Start
                </button>
            </Can>
            <Can action={'control.restart'}>
                <button
                className={`${ !status ? 'cursor-not-allowed' : 'cursor-pointer'}
                transition-colors
                px-5 py-2 rounded-md
                text-yellow-500 bg-yellow-600
                hover:text-yellow-400
                disabled:text-neutral-400 disabled:bg-neutral-600`}
                disabled={!status}
                onClick={onButtonClick.bind(this, 'restart')}>
                    <FontAwesomeIcon  icon={faSync} className='text-yellow-500'/> Restart
                </button>
            </Can>
            <Can action={'control.stop'}>
                <button
                    className={`${!status || status === 'offline' ? 'cursor-not-allowed' : 'cursor-pointer'}
                    transition-colors 
                    px-5 py-2 rounded-md
                    text-red-500 bg-red-600
                    hover:text-red-400
                    disabled:text-neutral-400 disabled:bg-neutral-600`}
                    disabled={!status || status === 'offline'}
                    onClick={onButtonClick.bind(this, killable ? 'kill' : 'stop')}
                >
                    <FontAwesomeIcon icon={faPowerOff} className='text-red-500'/> Stop
                </button>

            </Can>
        </div>
    );
};

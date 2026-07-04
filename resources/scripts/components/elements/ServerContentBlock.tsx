import PageContentBlock, { PageContentBlockProps } from '@/components/elements/PageContentBlock';
import React from 'react';
import { ServerContext } from '@/state/server';
import Can from './Can';
import PowerButtons from '../server/console/PowerButtons';

interface Props extends PageContentBlockProps {
    title: string;
}

const ServerContentBlock: React.FC<Props> = ({ title, children, ...props }) => {
    const name = ServerContext.useStoreState((state) => state.server.data!.name);
    const description = ServerContext.useStoreState((state) => state.server.data!.description);

    return (
        <PageContentBlock title={`${name} | ${title}`} {...props}>
            <div className="my-5">
                <h1 className={'font-header font-medium text-2xl text-gray-50 leading-relaxed line-clamp-1'}>
                    {name}
                </h1>
                <p className={'text-sm line-clamp-2'}>{description}</p>
            </div>

            <Can action={['control.start', 'control.stop', 'control.restart']} matchAny>
                <PowerButtons className={'flex gap-2 my-5'} />
            </Can>
            
            {children}
        </PageContentBlock>
    );
};

export default ServerContentBlock;

import styled from 'styled-components/macro';
import tw, { theme } from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`w-full h-[72px] sticky md:h-screen top-0 md:pt-[72px] md:fixed md:block z-[900] bg-neutral-800 shadow overflow-x-auto md:w-[72px] flex items-center`};

    & > div {
        ${tw`flex md:flex-col text-sm items-center`};

        & > a,
        & > div {
            ${tw`block text-xl py-3 px-4 text-neutral-300 no-underline whitespace-nowrap transition-all duration-150`};

            &:hover {
                ${tw`text-neutral-100`};
            }

            &:active,
            &.active {
                ${tw`text-green-500`};
            }
        }
    }
`;

export default SubNavigation;

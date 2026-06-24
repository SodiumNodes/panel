import styled from 'styled-components/macro';
import tw, { theme } from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`top-0 pt-[64px] fixed z-[900] h-screen bg-neutral-800 shadow overflow-x-auto w-[72px]`};

    & > div {
        ${tw`flex flex-col text-sm mx-auto items-center`};

        & > a,
        & > div {
            ${tw`block text-lg py-3 px-4 text-neutral-300 no-underline whitespace-nowrap transition-all duration-150`};

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

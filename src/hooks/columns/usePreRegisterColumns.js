import { useMemo } from 'react';

import HighlightedText from '../../components/HighlightedText';
import TextSkeleton from '../../components/TextSkeleton';
import moment from "moment";

const useCustomerColumns = ({ actions, isLoading, actionDefaultStyle }) => {
    return useMemo(() => {
        const Cell = isLoading ? TextSkeleton : HighlightedText;

        return [
            {
                header: 'No',
                width: '1%',
                accessor: 'index',
                Cell: ({ row: { index }, data }) =>
                    isLoading ? null : <Cell value={data?.length - index} />,
            },
            {
                header: 'Name',
                accessor: 'name',
                width: '10%',
                Cell,
            },
            {
                header: 'Country',
                accessor: 'country',
                width: '10%',
                Cell,
            },

            {
                header: 'Date of Birth',
                accessor: `dateOfBirth`,
                width: '10%',
                Cell:({value})=> {
                   return  <Cell value={moment(value).format("yy-MM-DD")}/>
                }
            },
            {
                header: 'Register Date',
                accessor: `createdAt`,
                width: '10%',
                Cell:({value})=> {
                   return  <Cell value={moment(value).format("HH:mm, yy-MM-DD")}/>
                }
            },

        ];
    }, [isLoading]);
};

export default useCustomerColumns;

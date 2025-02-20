"use client";
import { NMTable } from '@/components/ui/core/NMTable';
import { ICategory } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import CreateCategoryModal from './CreaetCategoryModal';
import Image from 'next/image';

type TCategoryProps = {
    categories: ICategory[]
}
const ManageCategories = ({ categories }: TCategoryProps) => {
    const columns: ColumnDef<ICategory>[] = [
        {
            accessorKey: "name",
            header: () => <div>Category Name</div>,
            cell: ({row}) => <div className='flex items-center gap-2'>
                <Image
                src={row.original.icon}
                alt={row.original.name}
                height={40}
                width={40}
                className='h-7 w-7 rounded-full'
                />
                <span className='truncate'>{row.original.name}</span>
            </div>,
        },
        {
            accessorKey: "description",
            header: "Description",
        },

    ]
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>ManageCategories</h1>
                <CreateCategoryModal />

            </div>
            <NMTable data={categories} columns={columns} />
        </div>
    );
};

export default ManageCategories;
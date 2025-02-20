"use client";
import { NMTable } from '@/components/ui/core/NMTable';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { IProduct } from '@/types/product';
import { Edit, Eye, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';



const ManageProducts = ({ products }: { products: IProduct[] }) => {
    console.log(products);
    const columns: ColumnDef<IProduct>[] = [
        {
            accessorKey: "name",
            header: () => <div>Product Name</div>,
            cell: ({ row }) => <div className='flex items-center gap-2'>
                <Image
                    src={row.original.imageUrls[0]}
                    alt={row.original.name}
                    height={40}
                    width={40}
                    className='h-7 w-7 rounded-full'
                />
                <span className='truncate'>{row.original.name}</span>
            </div>,
        },
        {
            accessorKey: "category.name",
            header: "Category",
        },
        {
            accessorKey: "brand.name",
            header: "Brand",
        },
        {
            accessorKey: "stock",
            header: "Stock",
        },
        {
            accessorKey: "price",
            header: "Price",
        },
        {
            accessorKey: "price",
            header: "Offered Price",
        },
        {

            header: "Action",
            cell: ({ row }) => <div className='flex  items-center gap-2'>

                <Eye className=' w-5' />  <Link href={`/user/shop/products/update-product/${row.original._id}`}><Edit className=' w-5' /> </Link> <Trash className=' w-5' />
            </div>,
        },


    ]
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>ManageProducts</h1>
                {/* <CreateProductModal /> */}
                <Link href="/user/shop/products/add-product">
                    <Button className="mt-5 w-full">
                        Create Product
                    </Button>
                </Link>


            </div>
            <NMTable data={products} columns={columns} />
        </div>
    );
};

export default ManageProducts;
'use client'


import { AlignRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from '../ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { protectedRoutes } from '@/constants';
import { useUser } from '@/context/UserContext';
import { logoutUser } from '@/services/AuthService';


// const Navbar = ({ session }: { session: UserProps | null }) => {
const Navbar = () => {

    const { user, setIsLoading } = useUser()
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        logoutUser();
        setIsLoading(true)
        if (protectedRoutes.some(route => pathname.match(route))) {
            router.push("/")
        }
    }

    const [toggle, setToggle] = useState(false);

    // useEffect(() => {
    //     if (session) {
    //         localStorage.setItem("session", JSON.stringify(session));
    //     }
    // }, [session]);

    const isActive = (path: string) => pathname === path ? "text-dark" : "text-gray-600 hover:text-dark";

    return (
        <div className={`padding-x w-full  py-5 fixed top-0 z-20 bg-secondary border border-b`}>

            <div className="w-[93%] flex justify-between items-center max-w-7xl mx-auto ">

                <div className="w-full lg:w-auto justify-between flex items-center ">
                    <Link
                        href="/"
                        className="ml-4 text-xl font-semibold flex items-center gap-1 text-gray-800 hover:text-gray-600"
                    >
                        {/* <Image src={logo} alt="logo" height={36} width={36} className="object-contain" /> */}
                        <p className="text-dark text-[18px] font-bold cursor-pointer flex">
                            Ikhtiaj Arif &nbsp;
                            <span className="sm:block hidden">|&nbsp; Portfolio</span>
                        </p>
                    </Link>

                    <div className="relative lg:hidden">
                        <div
                            onClick={() => setToggle(!toggle)}
                            tabIndex={0}
                            role="button"
                            className="p-2 h-10 w-10 rounded-md hover:bg-black-100 focus:outline-none"
                        >
                            {/* <Image src={toggle ? close : menu} alt="menu" className="object-fill:cover" height={30} width={30} /> */}
                            <AlignRight />
                        </div>
                        {
                            toggle && <ul
                                tabIndex={0}
                                className="absolute mt-3 right-0 z-10 p-4  shadow-md bg-tertiary rounded-md w-52"
                            >
                                <li className="hover:text-gray-600 p-2">
                                    <Link href="/" className={isActive('/')} >Home</Link>
                                </li>
                                <li className="hover:text-gray-600 p-2">
                                    <Link href="/projects" className={isActive('/projects')}>Projects</Link>
                                </li>
                                <li className="hover:text-gray-600 p-2" >
                                    <Link href="/blog" className={isActive('/blog')}>Blog</Link>
                                </li>
                                <li className="hover:text-gray-600 p-2">
                                    <Link href="/contact" className={isActive('/contact')}>Contact</Link>
                                </li>
                                <li className="hover:text-gray-600 p-2 mb-2">
                                    <Link href="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
                                </li>
                                {/* {
                                    session?.user ? (
                                        <button onClick={() => signOut()} className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-black transition duration-200">
                                            Logout
                                        </button>) :
                                        (<Link
                                            href="/login"
                                            className="border border-teal-500 text-teal-500 px-5 py-2 rounded-full hover:bg-teal-500 hover:text-black transition duration-200"
                                        >
                                            Login
                                        </Link>)
                                } */}
                            </ul>
                        }

                    </div>
                </div>



                <div className="hidden md:flex items-center ">

                    {!user ?
                        <Link href="/login">
                            <Button variant="outline" className='rounded-full'>
                                Login
                            </Button>
                        </Link>
                        :
                        <>
                            <Link href="/create-shop">
                                <Button variant="outline" className='rounded-full'>
                                    Create shop
                                </Button>
                            </Link>

                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>User</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                                    <DropdownMenuItem>My Shop</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='text-red-500 cursor-pointer' onClick={handleLogout}>
                                        <LogOut />
                                        <span>Log Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu></>

                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar;
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaChevronDown, FaCog, FaHome, FaUser } from "react-icons/fa";

const Sidebar = () => {
    const pathname = usePathname();
    const isActive = (path: string) =>
        pathname === path ? "bg-gray-800 text-white font-semibold" : "text-gray-300 hover:text-white";

    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const toggleMenu = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div className="bg-gray-900 min-h-screen p-4 rounded-xl w-64 shadow-lg">
            <ul className="space-y-2">
                {/* Dashboard */}
                <li>
                    <Link
                        href="/"
                        className={`flex text-white  font-bold items-center space-x-3 p-3 rounded-lg transition-all duration-300 `}
                    >
                        <FaHome className="h-5 w-5" />
                        <span>Home</span>
                    </Link>
                </li>

                {/* User Info */}
                <li>
                    <Link
                        href="/dashboard"
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${isActive("/dashboard/user-info")}`}
                    >
                        <FaUser className="h-5 w-5" />
                        <span>User Info</span>
                    </Link>
                </li>

                {/* Blogs Section */}
                <li>
                    <div
                        onClick={() => toggleMenu("blogs")}
                        className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-300 `}
                    >
                        <div className="flex items-center space-x-3">
                            <FaCog className="h-5 w-5" />
                            <span>Blogs</span>
                        </div>
                        <FaChevronDown className={`transition-transform ${openMenu === "blogs" ? "rotate-180" : ""}`} />
                    </div>

                    {openMenu === "blogs" && (
                        <ul className="pl-8 mt-2 space-y-2">
                            <li>
                                <Link
                                    href="/dashboard/blogs"

                                    className={`block p-2 rounded-lg transition-all duration-300 ${isActive("/dashboard/blogs")}`}
                                >
                                    Blog List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/blogs/create-blog"
                                    className={`block p-2 rounded-lg transition-all duration-300 ${isActive("/dashboard/blogs/create")}`}
                                >
                                    Create Blog
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Projects Section */}
                <li>
                    <div
                        onClick={() => { toggleMenu("projects") }}
                        className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-300`}
                    >
                        <div className="flex items-center space-x-3">
                            <FaCog className="h-5 w-5" />
                            <span>Projects</span>
                        </div>
                        <FaChevronDown className={`transition-transform ${openMenu === "projects" ? "rotate-180" : ""}`} />
                    </div>

                    {openMenu === "projects" && (
                        <ul className="pl-8 mt-2 space-y-2">
                            <li>
                                <Link

                                    href="/dashboard/projects"
                                    className={`block p-2 rounded-lg transition-all duration-300  ${isActive("/dashboard/projects")}}`}
                                >
                                    Project List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/projects/create"
                                    className={`block p-2 rounded-lg transition-all duration-300 ${isActive("/dashboard/projects/create")}`}
                                >
                                    Create Project
                                </Link>
                            </li>

                        </ul>
                    )}
                </li>
                {/* message Info */}
                <li>
                    <Link
                        href="/dashboard/messages"
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${isActive("/dashboard/user-info")}`}
                    >
                        <FaUser className="h-5 w-5" />
                        <span>Messages</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

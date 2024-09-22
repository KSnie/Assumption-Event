"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiHome, FiCalendar, FiUsers } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import { useSession, signOut } from "next-auth/react"; // Importing authentication hooks

export default function Navigation() {
    const { data: session } = useSession(); // Access the user session data
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (session?.user) {
            setIsAuthenticated(true);
            setUsername(session.user.name); // Set username if authenticated
            // console.log(session.user.id); // Log the Owner_id
        } else {
            setIsAuthenticated(false);
            setUsername("");
        }
    }, [session]);

    const headMenuItems = [
        { name: "Home", icon: <FiHome className="text-lg" />, path: "/" },
    ];

    const menuItems = [
        { name: "MY EVENT", icon: <FiCalendar className="text-lg" />, path: "/event" },
        { name: "MY ATTENDEE", icon: <FiUsers className="text-lg" />, path: "/attendee" },
    ];

    const secondMenuItems = [
        { name: "TICKETS", icon: <IoTicketOutline className="text-lg" />, path: "/tickets" },
    ];

    const footerMenuItems = isAuthenticated
    ? [{ name: "Sign out", icon: <PiSignOut className="text-lg" />, action: () => signOut() }]
    : [{ name: "Sign in", icon: <PiSignIn className="text-lg" />, path: "/signin" }];



    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div>
            <button
                onClick={toggleNav}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                ref={buttonRef}
            >
                <span className="sr-only">Open sidebar</span>
                {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>

            <aside
                id="logo-sidebar"
                ref={sidebarRef}
                className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-6 overflow-y-auto bg-customGray dark:bg-gray-800 flex flex-col">
                    <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                        <img
                            src="https://www.clipartmax.com/png/full/155-1551269_abac-library-assumption-university-of-thailand-logo.png"
                            className="h-9 me-6 sm:h-14"
                            alt="Flowbite Logo"
                        />
                        <div className="self-center text-center font-normal text-slate-600 text-base">
                            <h1>Assumption</h1>
                            <h1>University Event</h1>
                        </div>
                    </a>

                    {/* Header Menu */}
                    <ul className="my-3 font-medium rounded-2xl">
                        {headMenuItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.path}
                                    className="flex items-center p-2 text-gray-600 rounded-lg hover:text-red-700 hover:bg-red-200 group"
                                >
                                    <div className="bg-white w-11 h-11 rounded-lg flex justify-center items-center shadow-2xl">
                                        {item.icon}
                                    </div>
                                    <span className="ms-3 text-sm">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Main Menu */}
                    <h2 className="mb-3 text-sm font-medium mx-2 text-gray-600">Manager</h2>
                    <ul className="space-y-2 font-medium">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.path}
                                    className="flex items-center p-2 text-gray-600 rounded-lg hover:text-red-700 hover:bg-red-
                                200 group"
                                >
                                    <div className="bg-white w-11 h-11 rounded-lg flex justify-center items-center shadow-2xl">
                                        {item.icon}
                                    </div>
                                    <span className="ms-3 text-sm">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Second Menu */}
                    <h2 className="mb-3 text-sm font-medium mx-2 text-gray-600">Ticket</h2>
                    <ul className="space-y-2 font-medium">
                        {secondMenuItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.path}
                                    className="flex items-center p-2 text-gray-600 rounded-lg hover:text-red-700 hover:bg-red-200 group"
                                >
                                    <div className="bg-white w-11 h-11 rounded-lg flex justify-center items-center shadow-2xl">
                                        {item.icon}
                                    </div>
                                    <span className="ms-3 text-sm">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* User Info and Footer */}
                    <div className="mt-auto">
                        {isAuthenticated && (
                            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-3">
                                <span className="text-sm text-gray-600">Hello, {username}</span>
                            </div>
                        )}

                        <ul className="space-y-2 font-medium">
                            {footerMenuItems.map((item, index) => (
                                <li key={index}>
                                    {item.action ? (
                                        <button
                                            onClick={item.action}
                                            className="w-full flex items-center p-2 text-gray-600 rounded-lg hover:text-red-700 hover:bg-red-200 group"
                                        >
                                            <div className="bg-white w-11 h-11 rounded-lg flex justify-center items-center shadow-2xl">
                                                {item.icon}
                                            </div>
                                            <span className="ms-3 text-sm">{item.name}</span>
                                        </button>
                                    ) : (
                                        <a
                                            href={item.path}
                                            className="flex items-center p-2 text-gray-600 rounded-lg hover:text-red-700 hover:bg-red-200 group"
                                        >
                                            <div className="bg-white w-11 h-11 rounded-lg flex justify-center items-center shadow-2xl">
                                                {item.icon}
                                            </div>
                                            <span className="ms-3 text-sm">{item.name}</span>
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>
        </div>
    );
}

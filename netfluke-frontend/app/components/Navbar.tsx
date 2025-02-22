"use client"

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import profileImg from "@/public/images/fluke.jpg";
import NavbarItem from "./NavbarItem";
import { FiChevronDown } from "react-icons/fi";
import NavbarDropDownList from "./NavbarDropDownList";
import { IoSearch } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import ProfileList from "./ProfileList";

const Navbar = () => {

    const [showDropDownList, setShowDropDownList] = useState(false);
    const [showProfileList, setShowProfileList] = useState(false);
    const [showBg, setShowBg] = useState(false);

    const toggleDropDownList = useCallback(() => {
        setShowDropDownList((current) => !current);
    }, [])

    const toggleProfileList = useCallback(() => {
        setShowProfileList((current) => !current);
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= 69){
                setShowBg(true)
            }else{
                setShowBg(false)
            }
        }

        window.addEventListener('scroll',handleScroll)
    
        return () => {
            window.addEventListener('scroll',handleScroll)
        }
    },[])

    

    return (
        <div className="w-full fixed z-[20]">
        <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBg ? 'bg-zinc-900 bg-opacity-90' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
            <Image src={logo} className="w-[80px] lg:w-[120px]" alt="Netfluke Logo" />
            <div className="flex-row ml-8 gap-7 hidden lg:flex">
                <NavbarItem title={'Home'}/>
                <NavbarItem title={'TV Shows'}/>
                <NavbarItem title={'Movies'}/>
                <NavbarItem title={'New & Popular'}/>
                <NavbarItem title={'My List'}/>
            </div>
            <div onClick={toggleDropDownList} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                <p className="text-white text-sm">Browse</p>
                <FiChevronDown className={`text-white transition ${showDropDownList ? 'rotate-180' : 'rotate-0'} `}/>
                <NavbarDropDownList show={showDropDownList}/>
            </div>
            <div className="flex flex-row ml-auto gap-7 items-center">
                <div className="text-gray-200 text-2xl hover:text-gray-300 cursor-pointer transition">
                    <IoSearch />
                </div>
                <div className="text-gray-200 text-2xl hover:text-gray-300 cursor-pointer transition">
                    <FaRegBell />
                </div>
            </div>
            <div className="flex flex-row items-center gap-2 cursor-pointer relative pl-7">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                    <Image src={profileImg} alt="Netfluke Logo" />
                </div>
                <FiChevronDown onClick={toggleProfileList} className={`text-white transition ${showProfileList ? 'rotate-180' : 'rotate-0'} `}/>
                <ProfileList show={showProfileList}/>
            </div>
        </div>
        </div>
    );
};

export default Navbar;

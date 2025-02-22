import React from 'react'
import Image from "next/image";
import profileImg from "@/public/images/fluke.jpg";
import { FaChildReaching } from "react-icons/fa6";

interface ProfileListProps {
    show?: boolean;
}

const ProfileList: React.FC<ProfileListProps> = ({show}) => {
  
    if(!show){
        return null;
    }

    return (
        <div className='mt-3 bg-black w-80 absolute top-8 right-0 py-5 flex-col border-2 border-gray-800 flex'>
            <div className='flex flex-col gap-4'>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <FaChildReaching className='text-white'/>
                    <p className='text-white text-sm '>Hi ! I'm Fluke Sikharin</p>
                </div>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <hr />
                    <p className='text-white text-sm '>You are using this website as my guest. 😊</p>
                </div>
                <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                    <hr />
                    <p className='text-white text-sm '>I don't have a function profile. I hope you won't mind.</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileList
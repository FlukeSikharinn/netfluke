import React from 'react'

interface ItemProps {
    title: string;
}

const NavbarItem: React.FC<ItemProps> = ({title}) => {
  return (
    <div className="text-white bold cursor-pointer hover:text-gray-300 transition">
        {title}
    </div>
  )
}

export default NavbarItem
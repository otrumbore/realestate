import React, { useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';

const Navbar = () => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const toggleMobileMenu = () => {
		setShowMobileMenu(!showMobileMenu);
	};

	return (
		<nav className='bg-primary p-4'>
			<div className='container mx-auto flex items-center justify-between'>
				<div className='flex items-center'>
					{/* Logo or Brand */}
					<span className='text-white text-lg font-bold'>Real Estate</span>
				</div>
				<div className='hidden md:flex space-x-4'>
					{/* Desktop Navigation Links */}
					<a href='#' className='text-white'>
						Home
					</a>
					<a href='#' className='text-white'>
						About
					</a>
					<a href='#' className='text-white'>
						Services
					</a>
					<a href='#' className='text-white'>
						Contact
					</a>
				</div>
				<div className='md:hidden'>
					{/* Hamburger menu for mobile */}
					<button
						className='text-white focus:outline-none'
						onClick={toggleMobileMenu}
					>
						<RiMenuLine size={24} />
					</button>
				</div>
			</div>
			{/* Mobile Menu (Hidden by default) */}
			{showMobileMenu && (
				<div className='md:hidden bg-gray-700 p-2'>
					<a href='#' className='block text-white py-2'>
						Home
					</a>
					<a href='#' className='block text-white py-2'>
						About
					</a>
					<a href='#' className='block text-white py-2'>
						Services
					</a>
					<a href='#' className='block text-white py-2'>
						Contact
					</a>
				</div>
			)}
		</nav>
	);
};

export default Navbar;

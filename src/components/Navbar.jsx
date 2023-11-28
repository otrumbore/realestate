import React, { useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const toggleMobileMenu = () => {
		setShowMobileMenu(!showMobileMenu);
	};

	return (
		<nav className='bg-white shadow-lg border-b border-2 pb-1'>
			<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
				<div className='relative flex items-center justify-between h-16'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<button
							type='button'
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary'
							aria-controls='mobile-menu'
							aria-expanded='false'
							onClick={() => setShowMobileMenu(!showMobileMenu)}
						>
							<span className='sr-only'>Open main menu</span>
							{showMobileMenu ? (
								<AiOutlineClose className='block h-6 w-6' />
							) : (
								<AiOutlineMenu className='block h-6 w-6' />
							)}
						</button>
					</div>
					<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='flex-shrink-0 flex items-center'>
							<img
								className='block lg:hidden h-8 w-auto'
								src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
								alt='Workflow'
							/>
							<img
								className='hidden lg:block h-8 w-auto'
								src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
								alt='Workflow'
							/>
						</div>
						<div className='hidden sm:block sm:ml-6'>
							<div className='flex space-x-4'>
								<a
									href='#'
									className='px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
								>
									Home
								</a>
								<a
									href='#'
									className='px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
								>
									Listings
								</a>
								<a
									href='#'
									className='px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
								>
									About
								</a>
								<a
									href='#'
									className='px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
								>
									Contact
								</a>
							</div>
						</div>
					</div>
					<div className='hidden sm:block sm:ml-6'>
						<div className='flex space-x-4'>
							<a
								href='#'
								className='px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
							>
								Sign in
							</a>
							<a
								href='#'
								className='px-3 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark'
							>
								Sign up
							</a>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`${showMobileMenu ? 'block' : 'hidden'} sm:hidden`}
				id='mobile-menu'
			>
				<div className='px-2 pt-2 pb-3 space-y-1'>
					<a
						href='#'
						className='block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
					>
						Home
					</a>
					<a
						href='#'
						className='block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
					>
						Listings
					</a>
					<a
						href='#'
						className='block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
					>
						About
					</a>
					<a
						href='#'
						className='block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
					>
						Contact
					</a>
					<a
						href='#'
						className='block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
					>
						Sign in
					</a>
					<a
						href='#'
						className='block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-500 hover:bg-gray-100'
					>
						Sign up
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

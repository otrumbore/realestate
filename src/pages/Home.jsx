import React, { useEffect, useState, useRef } from 'react';
import fetchAPIAccessToken from '../api/fetchAPIAccessToken';
import fetchAPIListings from '../api/fetchAPIListings';
import {
	FaAngleDoubleRight,
	FaAngleDoubleLeft,
	FaSearch,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
	const [apiData, setApiData] = useState(null); // State to hold the fetched data
	const [accessToken, setAccessToken] = useState(null);
	const [listPerPage, setListPerPage] = useState('10');

	const [pageNum, setPageNum] = useState(1);

	const scrollToTopRef = useRef(null);

	const [location, setLocation] = useState('');
	const [propertyType, setPropertyType] = useState('');
	const [transactionType, setTransactionType] = useState('');
	const [filterSearch, setFilterSearch] = useState(false);

	const [listingsError, setListingsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!accessToken) return;

				const listings = await fetchAPIListings(
					accessToken,
					pageNum,
					listPerPage,
					location,
					propertyType,
					transactionType
				);
				if (listings) {
					setListingsError(false);
					setApiData(listings);
				} else if (!listings) {
					setListingsError(true);
				} else {
					console.error('Error fetching listings');
				}
			} catch (error) {
				console.error('Error fetching listings:', error);
			}
		};

		fetchData();
		setFilterSearch(false);
	}, [accessToken, pageNum, listPerPage, filterSearch]);

	useEffect(() => {
		const fetchToken = async () => {
			try {
				const token = await fetchAPIAccessToken();
				if (token) {
					setAccessToken(token.accToken);
				} else {
					console.error('Error fetching token');
				}
			} catch (error) {
				console.error('Error fetching token:', error);
			}
		};

		fetchToken();
	}, []);

	const handleListingsPerPageChange = (event) => {
		const selectedValue = event.target.value;
		setListPerPage(selectedValue);
		setPageNum(1); // Reset page number when changing listings per page
	};

	const nextPage = () => {
		setPageNum(pageNum + 1);
		scrollToTopRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to top
	};

	const prevPage = () => {
		setPageNum(pageNum - 1);
		scrollToTopRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to top
	};

	const handleLocationChange = (event) => {
		setLocation(event.target.value);
	};

	const handlePropertyTypeChange = (event) => {
		setPropertyType(event.target.value);
	};

	const handleTransactionTypeChange = (event) => {
		setTransactionType(event.target.value);
	};

	const handleListingSearch = () => {
		setFilterSearch(true);
		//console.log(location);
	};

	const handleListingSearchClear = () => {
		setLocation('');
		setFilterSearch(true);
		setPageNum(1);
		//console.log(location);
	};

	return (
		<div className='flex flex-col items-center justify-center'>
			{/* <h1 className='text-4xl font-bold mt-8 mb-4'>Homes:</h1> */}
			{/* Search Bar and Filter Options */}
			<div className='w-full bg-white shadow-lg rounded-sm p-6 mb-8'>
				<div className='flex flex-col lg:flex-row lg:items-center lg:justify-center lg:space-x-4 space-y-4 lg:space-y-0'>
					<div className='flex items-center relative'>
						<input
							type='text'
							placeholder='Search City'
							value={location}
							onChange={handleLocationChange}
							className='w-96 h-10 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
						/>
						<FaSearch className='absolute top-3 left-3 text-gray-400' />
					</div>
					<select
						value={propertyType}
						onChange={handlePropertyTypeChange}
						className='h-10 px-4 rounded-full border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
					>
						<option value=''>Property Type</option>
						<option value='house'>House</option>
						<option value='condo'>Condo</option>
						<option value='apartment'>Apartment</option>
						{/* Add more property types */}
					</select>
					<select
						value={transactionType}
						onChange={handleTransactionTypeChange}
						className='h-10 px-4 rounded-full border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
					>
						<option value=''>Transaction Type</option>
						<option value='rent'>Rent</option>
						<option value='buy'>Buy</option>
					</select>
					<button
						className='px-6 py-2 rounded-md text-white bg-gray-500 hover:bg-gray-600'
						onClick={handleListingSearchClear}
					>
						Clear Filters
					</button>
					<button
						className='px-6 py-2 rounded-md text-white bg-primary hover:bg-primary-dark'
						onClick={handleListingSearch}
					>
						Search
					</button>
				</div>
			</div>

			<div ref={scrollToTopRef}></div>
			<div className='w-full bg-white shadow-lg rounded-lg p-6 mb-8'>
				{apiData && apiData.value && Array.isArray(apiData.value) ? (
					<>
						{!listingsError ? (
							<div className='w-full flex items-center justify-between mb-4'>
								<div className='hidden md:flex'>
									Page: {pageNum} of {apiData.page_count}
								</div>
								<div>
									<label htmlFor='listingsPerPage'>Listings per Page:</label>
									<select
										id='listingsPerPage'
										value={listPerPage}
										onChange={handleListingsPerPageChange}
										className='border p-2 ml-2 rounded-md bg-white text-black'
									>
										<option value='10'>10</option>
										<option value='20'>20</option>
										<option value='30'>30</option>
										<option value='40'>40</option>
										<option value='50'>50</option>
										<option value='100'>100</option>
									</select>
								</div>
								<div className='flex space-x-2'>
									<button
										onClick={prevPage}
										className={`btn btn-primary ${
											pageNum > 1 ? '' : 'btn-disbaled'
										} ${pageNum > 1 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
										disabled={pageNum <= 1}
									>
										<FaAngleDoubleLeft className='text-3xl text-white' />
									</button>
									<button
										onClick={nextPage}
										className='border-2 py-2 px-4 rounded-lg bg-primary cursor-pointer'
									>
										<FaAngleDoubleRight className='text-3xl text-white' />
									</button>
								</div>
							</div>
						) : (
							''
						)}

						{listingsError ? (
							<div>Could not find results</div>
						) : (
							<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
								{apiData.value.map((item, index) => (
									<div key={index} className='border rounded-lg p-4'>
										{item.Media &&
										item.Media.length > 0 &&
										item.Media[0].Thumbnail ? (
											<Link to={`/listing/${item.ListingId}`}>
												<img
													src={item.Media[0].Thumbnail}
													alt='listing'
													className='w-full h-48 object-cover mb-2 rounded-md'
												/>
											</Link>
										) : (
											<p className='mb-2'>No Thumbnail available</p>
										)}
										<p className='text-sm'>
											Property Type: {item.PropertySubType}
										</p>
										<p className='text-sm'>City: {item.City}</p>
										<p className='text-sm'>Price: ${item.ListPrice}</p>
									</div>
								))}
							</div>
						)}

						{listingsError ? (
							''
						) : (
							<div className='flex flex-col md:flex-row space-y-4 mt-8 items-center justify-between'>
								<div className=''>
									Page: {pageNum} of {apiData.page_count}
								</div>
								<div className='flex flex-col md:flex-row space-y-4 md:space-x-4 items-center justify-between'>
									<div>
										{apiData.page_count * listPerPage - listPerPage}+ Listings
									</div>
									<div className='flex space-x-2'>
										<button
											onClick={prevPage}
											className={`btn btn-primary ${
												pageNum > 1 ? '' : 'btn-disbaled'
											} ${
												pageNum > 1 ? 'cursor-pointer' : 'cursor-not-allowed'
											}`}
											disabled={pageNum <= 1}
										>
											<FaAngleDoubleLeft className='text-3xl text-white' />
										</button>
										<button
											onClick={nextPage}
											className='border-2 py-2 px-4 rounded-lg bg-primary cursor-pointer'
										>
											<FaAngleDoubleRight className='text-3xl text-white' />
										</button>
									</div>
								</div>
							</div>
						)}
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
};

export default Home;

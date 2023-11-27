import React, { useEffect, useState, useRef } from 'react';
import fetchAPIAccessToken from '../api/fetchAPIAccessToken';
import fetchAPIListings from '../api/fetchAPIListings';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';
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
			<h1 className='text-4xl font-bold mt-8 mb-4'>Homes:</h1>
			{/* Search Bar and Filter Options */}
			<div className='w-full bg-gray-100 rounded-lg p-8 mb-8'>
				<div className='flex flex-col md:flex-row md:items-center md:justify-center md:space-x-4 space-y-4 md:space-y-0'>
					<input
						type='text'
						placeholder='Location'
						value={location}
						onChange={handleLocationChange}
						className='border p-2 rounded-md md:w-64'
					/>
					<select
						value={propertyType}
						onChange={handlePropertyTypeChange}
						className='border p-2 rounded-md md:w-64'
					>
						<option value=''>Property Type</option>
						<option value='house'>House</option>
						<option value='condo'>Condo</option>
						<option value='condo'>Apartment</option>
						{/* Add more property types */}
					</select>
					<select
						value={transactionType}
						onChange={handleTransactionTypeChange}
						className='border p-2 rounded-md md:w-64'
					>
						<option value=''>Transaction Type</option>
						<option value='rent'>Rent</option>
						<option value='buy'>Buy</option>
					</select>
					<button
						className='btn btn-secondary text-white md:w-32'
						onClick={handleListingSearchClear}
					>
						Clear Filters
					</button>
					<button
						className='btn btn-primary text-white md:w-32'
						onClick={handleListingSearch}
					>
						Search
					</button>
				</div>
			</div>
			<div ref={scrollToTopRef}></div>
			{/* Listing Cards and Pagination */}
			{apiData.value && Array.isArray(apiData.value) ? (
				<div className='w-full rounded-lg bg-gray-100 p-8'>
					{!listingsError ? (
						<div className='w-full flex items-center justify-between mb-4'>
							<div>
								Page: {pageNum} of {apiData.page_count}
							</div>
							<div>
								<label htmlFor='listingsPerPage'>Listings per Page:</label>
								<select
									id='listingsPerPage'
									value={listPerPage}
									onChange={handleListingsPerPageChange}
									className='border p-2 ml-2 rounded-md bg-base-100 text-black'
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
						<div className='flex mt-8 items-center justify-between'>
							<div>
								Page: {pageNum} of {apiData.page_count}
							</div>
							<div>
								More than {apiData.page_count * listPerPage - listPerPage}{' '}
								Results
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
					)}
				</div>
			) : (
				<p>Loading...</p>
			)}
			;
		</div>
	);
};

export default Home;

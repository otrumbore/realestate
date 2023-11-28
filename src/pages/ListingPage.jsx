import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchAPIProperty from '../api/fetchAPIProperty'; // Import a function to fetch listing details
import fetchAPIAccessToken from '../api/fetchAPIAccessToken';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const ListingPage = () => {
	const { listingId } = useParams();
	const [listingDetails, setListingDetails] = useState(null);
	const [accessToken, setAccessToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

	useEffect(() => {
		const fetchDetails = async () => {
			if (accessToken) {
				try {
					const details = await fetchAPIProperty(accessToken, listingId);
					setListingDetails(details);
					setLoading(false);
					console.log(details);
				} catch (error) {
					console.error('Error fetching listing details:', error);
				}
			}
		};

		fetchDetails();
	}, [accessToken, listingId]);

	const prevImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? listingDetails.Media.length - 1 : prevIndex - 1
		);
	};

	const nextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === listingDetails.Media.length - 1 ? 0 : prevIndex + 1
		);
	};

	// Render listing details
	return (
		<div className='p-4'>
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					<div className='mb-8 relative'>
						<img
							src={listingDetails.Media[currentImageIndex].MediaURL}
							alt={`Photo ${currentImageIndex + 1}`}
							className='w-full h-96 object-cover rounded-lg'
						/>
						{listingDetails.Media.length > 1 ? (
							<div>
								<button
									className={`btn btn-primary absolute top-1/2 left-4 font-bold px-3 py-1 rounded-md bg-opacity-70 ${
										currentImageIndex < 1 ? 'btn-disabled' : ''
									}`}
									onClick={prevImage}
								>
									<FaAngleLeft size={40} />
								</button>
								<button
									className='btn btn-primary absolute top-1/2 right-4 font-bold px-3 py-1 rounded-md bg-opacity-70'
									onClick={nextImage}
								>
									<FaAngleRight size={40} />
								</button>
							</div>
						) : (
							''
						)}
					</div>
					<div className='grid grid-cols-2 gap-8'>
						<div className='col-span-2'>
							<h2 className='text-3xl font-bold mb-4'>
								{listingDetails.UnparsedAddress}
							</h2>
							<div className='grid grid-cols-2 gap-4 mb-6'>
								<div className='col-span-1'>
									<p className='font-bold'>
										Price: ${listingDetails.ListPrice}
									</p>
									<p>
										Beds:{' '}
										{listingDetails.BedroomsTotal
											? listingDetails.BedroomsTotal
											: 'N/A'}
									</p>
									<p>
										Baths:{' '}
										{listingDetails.BathroomsTotalInteger
											? listingDetails.BathroomsTotalInteger
											: 'N/A'}
									</p>
									<p>Living Area: {listingDetails.LivingArea} sqft</p>
									{/* Add other details here */}
								</div>
								<div className='col-span-1'>
									<p>Year Built: {listingDetails.YearBuilt}</p>
									<p>Stories: {listingDetails.Stories}</p>
									{/* Add other details here */}
								</div>
							</div>
							<p className='text-gray-600'>{listingDetails.PublicRemarks}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ListingPage;

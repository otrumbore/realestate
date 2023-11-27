import axios from 'axios';

const fetchAPIListings = async (
	accessToken,
	pageNum,
	listPerPage,
	location,
	propertyType,
	transactionType
) => {
	//console.log(accessToken);

	const apiKey = import.meta.env.VITE_RAPID_API_KEY;

	listPerPage = parseInt(listPerPage);

	//console.log(propertyType);

	if (!accessToken) throw error;
	const options = {
		method: 'GET',
		url: 'https://mls-router1.p.rapidapi.com/reso/odata/Property',
		params: {
			orderby: 'ModificationTimestamp desc',
			top: listPerPage,
		},
		headers: {
			Authorization: accessToken,
			'x-api-key': 'a50YsdAcOQ6xyDqVYTzEB57jBqKVYV01MyTD4at6',
			'X-RapidAPI-Key': apiKey,
			'X-RapidAPI-Host': 'mls-router1.p.rapidapi.com',
		},
	};

	// Pagination logic for subsequent pages
	if (pageNum > 1) {
		const skipCount = listPerPage * (pageNum - 1);
		//console.log('skipcount: ', skipCount)
		options.params = {
			...options.params,
			skip: skipCount,
		};
	}

	if (location && location.trim() !== '') {
		const formattedLocation = location
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
		options.params.filter = `City eq '${formattedLocation}'`;
	}

	// Adding property type filter
	if (propertyType && propertyType.trim() !== '') {
		options.params.filter = options.params.filter
			? `${options.params.filter} and `
			: '';
		const formattedPropertyType = propertyType
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
		console.log(formattedPropertyType);
		options.params.filter += `PropertySubType eq '${formattedPropertyType}'`;
		console.log('Filter:', options.params.filter);
	}

	// Adding transaction type filter
	if (transactionType) {
		// options.params.filter = options.params.filter
		// 	? `${options.params.filter} and `
		// 	: '';
		// options.params.filter += `TransactionType eq '${transactionType}'`;
	}

	try {
		const response = await axios.request(options);
		if (response.data && response.data.value.length === 0) {
			// Handle case when data is not found
			console.log('No data found');
			return null; // or handle in a way suitable for your application
		}
		const APIListing = response.data; // Set the fetched data in the state
		console.log(APIListing);
		return APIListing;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export default fetchAPIListings;

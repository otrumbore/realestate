import axios from 'axios';

const fetchAPIProperty = async (accessToken, listingId) => {
	const apiKey = import.meta.env.VITE_RAPID_API_KEY;

	const options = {
		method: 'GET',
		url: `https://mls-router1.p.rapidapi.com/reso/odata/Property/${listingId}`,
		headers: {
			Authorization: accessToken,
			'x-api-key': 'a50YsdAcOQ6xyDqVYTzEB57jBqKVYV01MyTD4at6',
			'X-RapidAPI-Key': apiKey,
			'X-RapidAPI-Host': 'mls-router1.p.rapidapi.com',
		},
	};

	try {
		const response = await axios.request(options);
		//console.log('listing: ', response.data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export default fetchAPIProperty;

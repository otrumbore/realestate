import axios from "axios";

const fetchAPIListings = async (accessToken) => {

  //console.log(accessToken);

  const apiKey = import.meta.env.VITE_RAPID_API_KEY;

  //console.log(apiKey);

  if (!accessToken) throw error;
  const options = {
    method: 'GET',
    url: 'https://mls-router1.p.rapidapi.com/reso/odata/Property',
    params: {
      orderby: 'ModificationTimestamp desc',
      top: '10'
    },
    headers: {
      Authorization: accessToken,
      'x-api-key': 'a50YsdAcOQ6xyDqVYTzEB57jBqKVYV01MyTD4at6',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'mls-router1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const APIListing = response.data; // Set the fetched data in the state
    console.log(APIListing);
    return APIListing;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchAPIListings;

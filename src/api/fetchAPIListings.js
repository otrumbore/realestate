import axios from "axios";

const fetchAPIListings = async (accessToken) => {

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
      'X-RapidAPI-Key': 'bed02c67e9msh9e1af9591bc15e8p15b94bjsn8f8782a7d181',
      'X-RapidAPI-Host': 'mls-router1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const APIListing = response.data; // Set the fetched data in the state
    return APIListing;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchAPIListings;

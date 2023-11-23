import React, { useEffect, useState } from 'react';
import fetchAPIAccessToken from '../api/fetchAPIAccessToken';
import fetchAPIListings from '../api/fetchAPIListings';

const Home = () => {
  const [apiData, setApiData] = useState(null); // State to hold the fetched data
  const [accessToken, setAccessToken] = useState(null);

  // Fetch the access token on component mount
  useEffect(() => {

    const fetchToken = async () => {
        try {
          const token = await fetchAPIAccessToken();
          //console.log('Token:', token); // Log the entire token object
          if (token) {
            setAccessToken(token);
            //console.log('Access Token:', token.accToken);
          } else {
            console.error('Token or Access Token not available.');
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      };
      fetchToken();
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    const fetchListings = async () => {
        try {
            const listings = await fetchAPIListings(accessToken);
            //console.log('Token:', token); // Log the entire token object
            if (listings) {
              setApiData(listings);
              //console.log('Access Token:', token.accToken);
            } else {
              console.error('Token or Access Token not available.');
            }
          } catch (error) {
            console.error('Error fetching token:', error);
          }
    }
    fetchListings();
  }, [accessToken]); // Empty dependency array to run this effect only once (on mount)

  return (
    <div className='flex flex-col max-w-[1000px] w-full h-full items-center justify-center'>
      <h1>API Data:</h1>
      {apiData ? (
        <ul className='space-y-6'>
          {apiData.value.map((item, index) => (
            <li key={index}>
                <img src={item.Media[0].Thumbnail} alt='listing' className='w-[300px] h-auto' />
                <p>Property Type: {item.PropertySubType}</p>
                <p>City: {item.City}</p>
                <p>Price: ${item.ListPrice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;

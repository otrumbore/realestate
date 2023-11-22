import axios from "axios";

const fetchAPIAccessToken = async () => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('grant_type', 'client_credentials');
  encodedParams.set('app_client_id', '118po0r6i1o1ccsu6ee4cl132u');

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'bed02c67e9msh9e1af9591bc15e8p15b94bjsn8f8782a7d181',
    'X-RapidAPI-Host': 'mls-router1.p.rapidapi.com'
  };

  try {
    const response = await axios.post(
      'https://mls-router1.p.rapidapi.com/cognito-oauth2/token',
      encodedParams,
      { headers }
    );

    const accToken = response.data.access_token;
    return accToken;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export default fetchAPIAccessToken;

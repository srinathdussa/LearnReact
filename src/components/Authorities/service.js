import axios from 'axios'

export async function getAuthorities() {
  const authoritiesURL = 'http://api.ratings.food.gov.uk/Authorities';
  const response = await axios.get(authoritiesURL,
   {params:{},
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': '2',      
    }}
  )
console.log(response);
  return response.data.authorities
}
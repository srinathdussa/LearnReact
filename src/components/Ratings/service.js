import axios from 'axios'
import {prepareRatings} from './helpers'

export async function getRatings(id) {
  
const a=`http://api.ratings.food.gov.uk/Establishments?localAuthorityId=${id}`
  const response = await axios.get(a,
   {params:{},
    headers: {
      'Content-Type': 'application/json',
      'x-api-version': '2',      
    }}
  )
console.log(response);
  return prepareRatings(response.data)
}
import { apiGetRequest } from './utils';
import { apiPostRequest} from './utils';

function getProduct(id) {
    console.log('Request for product details with product id: ' + id);
    return apiGetRequest('GET', 'products/' + id);
  }
  
  function postProduct(productDetails) {
    console.log('Request for adding new product: '+ JSON.stringify(productDetails));
    return apiPostRequest('POST', 'products/' , productDetails);
  }

export default {postProduct, getProduct};
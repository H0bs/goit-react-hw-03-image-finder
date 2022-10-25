import PropTypes from "prop-types";
import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "29676871-837cab832e208c22136e7205d"

export const fetchPhotos = async (value, page) => {
  const response = axios.get(``, {
    params: {
      q: value,
      page: page,
      key: `${KEY}`,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12
    }
  });
  return response;
}

fetchPhotos.propTypes = {
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

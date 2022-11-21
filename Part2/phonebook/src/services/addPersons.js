import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const add = (infoOfPerson) => {
  const request = axios.post(baseUrl, infoOfPerson);
  return request.then((response) => response.data);
};

const deleteValue = (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  add,
  deleteValue,
};

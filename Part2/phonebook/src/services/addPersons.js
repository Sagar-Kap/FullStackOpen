import axios from "axios";
const baseUrl = "http://localhost:3000/api/persons";

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

const updateValue = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  add,
  deleteValue,
  updateValue,
};

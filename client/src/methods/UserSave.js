import axios from 'axios';

const HTTP = axios.create({
    baseURL: "https://mern-generic-crud.herokuapp.com",
});

export const UserSave = async (body) => {
    await HTTP.post('/api/user', body)
        .then(response => console.log(response))
        .catch(error => console.log(error));
};

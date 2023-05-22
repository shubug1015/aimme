import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://www.aimmetest.ga/aimme/api',
// });

const api = axios.create({
  baseURL: 'https://devapi.aimmeart.com/aimme/api',
});

export const mainApi = {
  topArtists: async () => {
    const {
      data: { responseObject },
    } = await api.get('/v2/top-artists');

    return responseObject;
  },

  listData: async (props) => {
    const {
      data: { responseObject },
    } = await api.get('/v1/search/', {
      params: props,
    });

    return responseObject;
  },
};

export const listApi = {
  topArtists: async () => {
    const {
      data: { responseObject },
    } = await api.get('/v2/top-artists');

    return responseObject;
  },

  autocompletedArtists: async (searchTerm) => {
    const {
      data: { responseObject },
    } = await api.get('/v1/artist-name-list', {
      params: { artistName: searchTerm },
    });

    return responseObject;
  },

  listData: async (props) => {
    const {
      data: { responseObject },
    } = await api.get('/v1/search/', {
      params: props,
    });

    return responseObject;
  },
};

export const detailApi = {
  detailData: async (lotUuid) => {
    const {
      data: { responseObject },
    } = await api.get(`/v2/detail/${lotUuid}`);

    return responseObject;
  },
};

export const contactApi = {
  contact: (data) => api.post(`/v1/feedback/`, data),
};

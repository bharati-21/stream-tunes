import axios from 'axios';

const getVideos = () => axios.get('/api/videos');

export { getVideos };
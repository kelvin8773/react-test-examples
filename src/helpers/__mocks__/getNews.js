console.log('use mock api');

const getNews = jest.fn().mockResolvedValue([]);

export default getNews;

// Run with Node.js
// Put desire subreddit as first argument
// example - node ./saveMockPosts.js javascript
// example output - mockPosts_javascript.json
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const fs = require('fs');
const axios = require('axios');
const dayjs = require('dayjs');

const getPosts = async (subreddit) => {
  const BASE_URL = 'https://api.pushshift.io/reddit/submission/search/';
  const oneYearBefore = dayjs().subtract(1, 'years').unix();
  const numberOfPosts = 10;

  const url = `${BASE_URL}?subreddit=${subreddit}&after=${oneYearBefore}&size=${numberOfPosts}&sort=desc&sort_type=score`;

  try {
    const response = await axios.get(url);
    if (response.status === 200 && response.data.data.length > 0) {
      return response.data.data;
    }
    throw new Error('No such subreddit!');
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveMockPosts = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    throw new Error(err.message);
  }
};

const redditName = process.argv[2];
console.log(`Saving subreddit - ${redditName} posts to disk...`);

getPosts(redditName)
  .then((res) => {
    const data = res.reduce((result, post) => {
      const oneEntry = {
        id: post.id,
        title: post.title,
        full_link: post.full_link,
        created_utc: post.created_utc,
        score: post.score,
        num_comments: post.num_comments,
        author: post.author,
      };
      result.push(oneEntry);
      return result;
    }, []);
    try {
      saveMockPosts(`./src/helpers/__mocks__/mockPosts_${redditName}.json`, data);
      console.log(`mockPosts_${redditName}.json saved.`);
    } catch (error) {
      console.log(error.message);
    }
  })
  .catch((error) => {
    console.log(error.message);
  });

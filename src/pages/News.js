import React, { useState, useEffect } from 'react';
import getNews from '../helpers/getNews';

export default () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const subreddit = 'reactjs';

  useEffect(() => {
    getNews(subreddit)
      .then(res => {
        if (res.length > 0) {
          const posts = convertToHeatMapData(res);
          dispatch(updatePosts(posts));
        } else {
          throw new Error('No such subreddit!');
        }
      })
      .catch(e => {
        setErrorMsg(e.message);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [posts])

  return (
    <>
      <h1>What is New Today?</h1>
    </>

  )
}
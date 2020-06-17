import React, { useState, useEffect } from 'react';
import getNews from '../helpers/getNews';
import NewsTable from '../components/newsTable';

export default () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const subreddit = 'reactjs';

  useEffect(() => {
    getNews(subreddit)
      .then(res => {
        if (res.length > 0) {
          setPosts(res);
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
      <h1>What is News Lately?</h1>
      <div>
        {loading && 'Loading news ...'}
        {errorMsg && <p>{errorMsg}</p>}
        {!errorMsg && !loading && <NewsTable news={posts} subreddit={subreddit} />}
      </div>
    </>

  )
}
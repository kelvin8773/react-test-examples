import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Styled from 'styled-components';

const TableWrapper = Styled.table`
  box-sizing: border-box;
  width: 968px;
  margin: 12px auto 0;
  font-size: 18px;
  color: #0f0f0f;
  text-align: left;
`;

const NewsTable = ({ news }) => {
  // const getMin = (utc) => dayjs.unix(utc).minute();
  const REDDIT_USER_BASE_URL = 'https://www.reddit.com/user/';

  return (
    <>
      <h3>Higest Scores Posts from Reddit in last 3 months</h3>

      <TableWrapper>
        <thead>
          <tr>
            <th>Title</th>
            <th>Post Date</th>
            <th>Score</th>
            <th>Comments</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {
            news.map((post) => (
              <tr key={post.id}>
                <td style={{
                  'maxWidth': '400px',
                  'padding': '10px 30px 10px 0',
                  'textOverflow': 'ellipsis',
                  'whiteSpace': 'nowrap',
                  'overflow': 'hidden',
                }}>
                  <a
                    target="_blank"
                    title={post.title}
                    rel="noopener noreferrer"
                    href={post.full_link}
                  >
                    {post.title}
                  </a>
                </td>
                <td>{dayjs.unix(post.created_utc).format('YYYY-MM-DD')}</td>
                <td data-testid="postScore">{post.score}</td>
                <td data-testid="postCommentNum">{post.num_comments}</td>
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={REDDIT_USER_BASE_URL + post.author}
                  >
                    {post.author}
                  </a>
                </td>
              </tr>
            ))
          }
        </tbody>
      </TableWrapper>

    </>
  );
};

NewsTable.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewsTable;

import React, { useState } from 'react';

import { imgUrl } from '../utils/constants';

export const NewCommentCard = ({ createComment }) => {
  const [text, setText] = useState('');
  return (
    <div className="flex w-100">
      <div className="profile-date-time-container">
        <img className="profile-pic" src={imgUrl} />
      </div>
      <div className="card card-container">
        <input
          className="form-control m-4 w-auto"
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              setText('');
              createComment(text);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

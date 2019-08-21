import React, { useState } from 'react';
import { ProfilePicture } from './';

export const NewCommentCard = ({ createComment }) => {
  const [text, setText] = useState('');
  return (
    <div className="flex w-100">
      <div className="profile-date-time-container">
        {/* TODO: Change to user id of user logged in */}
        <ProfilePicture user_id={1} />
      </div>
      <div className="card card-container">
        <input
          className="form-control m-4 w-auto"
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <div className="card-actions">
          <button
            className="btn-sm md:btn-md btn-primary"
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

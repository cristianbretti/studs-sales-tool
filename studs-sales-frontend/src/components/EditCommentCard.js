import React, { useState } from 'react';
import {
  dateStringFromTimestamp,
  timeStringFromTimestamp
} from '../utils/utils';

import { ProfilePicture } from '.';

export const EditCommentCard = ({
  comment,
  saveNewComment,
  cancelEditingComment
}) => {
  const [text, setText] = useState(comment.text);
  return (
    <div className="flex w-100">
      <div className="profile-date-time-container">
        <ProfilePicture user_id={comment.user_id} />
        <div className="text-sm">
          {dateStringFromTimestamp(comment.timestamp)}
        </div>
        <div className="text-xs">
          {timeStringFromTimestamp(comment.timestamp)}
        </div>
      </div>
      <div className="card card-container">
        <input
          className="form-control m-4 mt-0 w-auto"
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <div className="card-actions">
          <button
            className="btn-sm md:btn-md btn-primary"
            onClick={() => saveNewComment(comment.id, text)}
          >
            Save
          </button>
          <button
            className="btn-sm md:btn-md btn-danger"
            onClick={() => cancelEditingComment(comment.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  dateStringFromTimestamp,
  timeStringFromTimestamp
} from '../utils/utils';

import { ProfilePicture } from './';

export const StaticCommentCard = ({
  comment,
  startEditingComment,
  deleteComment
}) => {
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
        <div className="flex-1 p-1 inline-block">{comment.text}</div>
        <div className="card-actions">
          <button
            className="btn-sm md:btn-md btn-primary"
            onClick={() => startEditingComment(comment.id)}
          >
            Edit
          </button>

          <button
            className="btn-sm md:btn-md btn-danger"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

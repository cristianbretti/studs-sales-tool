import React from 'react';
import { serverBase } from '../utils/constants';

export const ProfilePicture = ({ user_id }) => (
  <img
    className="profile-pic"
    src={`${serverBase}/profile_pictures/${user_id}.jpg`}
  />
);

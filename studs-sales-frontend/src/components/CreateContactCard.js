import React, { useState } from 'react';

export const CreateContactCard = ({
  createContact,
  dontShowCreateContactCard
}) => {
  const [name, setName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  return (
    <div className="card">
      <div className="contact-card flex flex-col items-start mx-4">
        <label>Namn</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <label>Telefonnummer</label>
        <input
          type="text"
          className="form-control"
          value={phone_number}
          onChange={event => setPhoneNumber(event.target.value)}
        />
        <label>Mejl</label>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <label>Kommentar</label>
        <input
          type="text"
          className="form-control"
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
      </div>
      <div className="card-actions">
        <button
          className="btn btn-primary"
          onClick={() => createContact({ name, phone_number, email, comment })}
        >
          Save
        </button>
        <button
          className="btn btn-danger"
          onClick={() => dontShowCreateContactCard()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

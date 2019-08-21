import React, { useState } from 'react';

export const CreateContactCard = ({ contactInfo, saveContact, hideCard }) => {
  const [name, setName] = useState(contactInfo ? contactInfo.name : '');
  const [phone_number, setPhoneNumber] = useState(
    contactInfo ? contactInfo.phone_number : ''
  );
  const [email, setEmail] = useState(contactInfo ? contactInfo.email : '');
  const [comment, setComment] = useState(
    contactInfo ? contactInfo.comment : ''
  );
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
          className="btn-small md:btn-medium btn-primary"
          onClick={() => saveContact({ name, phone_number, email, comment })}
        >
          Save
        </button>
        <button
          className="btn-sm md:btn-md btn-danger"
          onClick={() => hideCard()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

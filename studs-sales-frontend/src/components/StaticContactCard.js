import React from 'react';

export const StaticContactCard = ({
  contactInfo,
  deleteContact,
  startEditingContact
}) => {
  return (
    <div className="card card-container">
      <div className="p-2 flex flex-col justify-start items-start">
        <div className="flex flex-col w-100">
          <div className="text-left ml-1">
            <b>Namn:</b> {contactInfo.name}
          </div>
          <div className="text-left ml-1">
            <b>Nummer</b> {contactInfo.phone_number}
          </div>
          <div className="text-left ml-1">
            <b>Mejl:</b> {contactInfo.email}
          </div>
        </div>
        <div className="text-left pt-2">{contactInfo.comment}</div>
      </div>
      <div className="card-actions">
        <button
          className="btn-sm md:btn-md  btn-primary"
          onClick={() => startEditingContact(contactInfo.id)}
        >
          Edit
        </button>
        <button
          className="btn-sm md:btn-md btn-danger"
          onClick={() => deleteContact(contactInfo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

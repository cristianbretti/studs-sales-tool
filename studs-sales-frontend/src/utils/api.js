export const statusesApi = () => {
  return fetch(`http://localhost:3005/api/statuses`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log(resp);
    }
  });
};

export const companiesApi = search => {
  return fetch(`http://localhost:3005/api/companies${search}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log(resp);
    }
  });
};

export const membersApi = () => {
  return fetch(`http://localhost:3005/api/users`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log(resp);
    }
  });
};

export const companyInfoApi = id => {
  return fetch(`http://localhost:3005/api/companies/${id}/info`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log(resp);
    }
  });
};

export const companyContactsApi = id => {
  return fetch(`http://localhost:3005/api/companies/${id}/contacts`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log(resp);
    }
  });
};

export const companyCommentsApi = id => {
  return fetch(`http://localhost:3005/api/companies/${id}/comments`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      console.log(resp);
    }
  });
};

export const addCompanyApi = data => {
  return fetch(`http://localhost:3005/api/companies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(resp => {
    if (resp.ok) {
      return true;
    } else {
      console.log(resp);
      return false;
    }
  });
};

export const updateCompanyApi = data => {
  const { id, body } = data;
  return fetch(`http://localhost:3005/api/companies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(resp => {
    if (resp.ok) {
      return true;
    } else {
      console.log(resp);
      return false;
    }
  });
};

export const addCommentApi = data => {
  const { id, body } = data;
  return fetch(`http://localhost:3005/api/companies/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(resp => {
    if (resp.ok) {
      return true;
    } else {
      console.log(resp);
      return false;
    }
  });
};

export const updateCommentApi = data => {
  const { id, body } = data;
  return fetch(`http://localhost:3005/api/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(resp => {
    if (resp.ok) {
      return true;
    } else {
      console.log(resp);
      return false;
    }
  });
};

export const deleteCommentApi = id => {
  return fetch(`http://localhost:3005/api/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => {
    if (resp.ok) {
      return true;
    } else {
      console.log(resp);
      return false;
    }
  });
};

export const addContactApi = data => {
  const { id, body } = data;
  return fetch(`http://localhost:3005/api/companies/${id}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(resp => {
    if (resp.ok) {
      return true;
    } else {
      console.log(resp);
      return false;
    }
  });
};

export const deleteContactApi = id => {
  return fetch(`http://localhost:3005/api/contacts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => {
    if (resp.ok) {
      return true;
    } else {
      console.log(resp);
      return false;
    }
  });
};

export const updateContactApi = data => {
  const { id, body } = data;
  return fetch(`http://localhost:3005/api/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(resp => {
    if (resp.ok) {
      return true;
    } else {
      console.log(resp);
      return false;
    }
  });
};

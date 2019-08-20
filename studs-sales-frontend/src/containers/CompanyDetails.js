import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';
import {
  companyInfoApi,
  companyContactsApi,
  companyCommentsApi,
  membersApi,
  updateCompanyApi,
  addCommentApi,
  updateCommentApi,
  deleteCommentApi,
  addContactApi,
  deleteContactApi
} from '../api';
import { statuses } from '../constants';

class CompanyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId: props.match.params.id,
      users: [],
      info: {},
      contacts: [],
      comments: [],
      commentsBeingEdited: [],
      newComment: '',
      newContact: {
        name: '',
        phone_number: '',
        email: '',
        comment: ''
      },
      completedUpdating: false,
      showCreateContact: false
    };
  }

  componentDidMount = () => {
    this.getAllInfo();
    this.getMembers();
  };

  getAllInfo = async () => {
    const { info } = await companyInfoApi(this.state.companyId);
    const { contacts } = await companyContactsApi(this.state.companyId);
    const { comments } = await companyCommentsApi(this.state.companyId);
    this.setState({
      info,
      contacts,
      comments
    });
    document.title = 'STUDS | ' + info.company_name;
  };

  getComments = async () => {
    const { comments } = await companyCommentsApi(this.state.companyId);
    this.setState({ comments });
  };

  getContacts = async () => {
    const { contacts } = await companyContactsApi(this.state.companyId);
    this.setState({ contacts });
  };

  getMembers = async () => {
    try {
      const { users } = await membersApi();
      this.setState({ users });
    } catch (err) {
      console.log(err);
    }
  };

  updateCompany = async () => {
    if (this.state.info.responsible_user === 0) {
      return;
    }
    try {
      const wasUpdated = await updateCompanyApi({
        id: this.state.companyId,
        body: {
          status: this.state.info.status,
          responsible_user: this.state.info.responsible_user
        }
      });
      if (wasUpdated) {
        this.setState({ completedUpdating: true });
        setTimeout(() => {
          this.setState({ completedUpdating: false });
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  createComment = async () => {
    try {
      const addedComment = await addCommentApi({
        id: this.state.companyId,
        body: {
          user: 1,
          text: this.state.newComment
        }
      });
      if (addedComment) {
        console.log('ADDED');
        this.getComments();
        this.setState({ newComment: '' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  startEditingComment = commentId => {
    if (!this.state.commentsBeingEdited.includes(commentId)) {
      this.setState({
        commentsBeingEdited: [...this.state.commentsBeingEdited, commentId]
      });
    }
  };

  changeCommentText = (id, newText) => {
    let oldComments = this.state.comments;
    oldComments.find(comment => comment.id === id).text = newText;
    this.setState({ comments: oldComments });
  };

  saveNewComment = async id => {
    const text = this.state.comments.find(comment => comment.id === id).text;
    const updated = await updateCommentApi({ id, body: { text } });
    if (updated) {
      console.log('UPDATED');
      this.cancelEditingComment(id);
    } else {
      console.log('could not update');
    }
  };

  cancelEditingComment = id => {
    this.setState({
      commentsBeingEdited: this.state.commentsBeingEdited.filter(
        idInList => idInList !== id
      )
    });
  };

  deleteComment = async id => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const deleted = await deleteCommentApi(id);
      if (deleted) {
        this.getComments();
      } else {
        console.log('could not delete comment with id: ' + id);
      }
    }
  };

  createContact = async () => {
    try {
      const addedComment = await addContactApi({
        id: this.state.companyId,
        body: {
          name: this.state.newContact.name,
          phone_number: this.state.newContact.phone_number,
          email: this.state.newContact.email,
          comment: this.state.newContact.comment
        }
      });
      if (addedComment) {
        console.log('ADDED Contact');
        this.getContacts();
        this.setState({
          showCreateContact: false,
          newContact: { name: {}, phone_number: {}, email: {}, comment: {} }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  deleteContact = async id => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const deleted = await deleteContactApi(id);
      if (deleted) {
        this.getContacts();
      } else {
        console.log('could not delete comment with id: ' + id);
      }
    }
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <Link to={`/`}>
            <i className="fas fa-long-arrow-alt-left top-left" />
          </Link>
          <div>{this.state.info.company_name}</div>
        </div>
        <div className="body">
          <div className="content status-container">
            <div className="info-icon-container">
              {this.state.completedUpdating && (
                <span className="icon">
                  <i className="fas fa-check" />{' '}
                </span>
              )}
            </div>
            <div>
              <label>Status</label>
              <select
                className="form-control"
                id="status-select"
                value={this.state.info.status}
                onChange={event =>
                  this.setState(
                    {
                      info: { ...this.state.info, status: event.target.value }
                    },
                    this.updateCompany
                  )
                }
              >
                {statuses.map(status => (
                  <option>{status.status}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Ansvarig</label>
              <select
                className="form-control"
                id="member-select"
                value={
                  this.state.info.responsible_user != null
                    ? this.state.info.responsible_user
                    : 0
                }
                onChange={event => {
                  this.setState(
                    {
                      info: {
                        ...this.state.info,
                        responsible_user: event.target.value
                      }
                    },
                    this.updateCompany
                  );
                }}
              >
                <option value={0}>Ingen</option>
                {this.state.users.map(member => (
                  <option value={member.id}>{member.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="content body-row">
            <div className="col-md-4 contact-sidebar">
              <div className="contact-cards-container">
                {this.state.contacts.map(contactInfo =>
                  this.renderContactCard(contactInfo)
                )}
                <div>
                  {this.state.showCreateContact &&
                    this.renderCreateContactCard()}
                  {!this.state.showCreateContact && (
                    <button
                      className="btn-primary"
                      onClick={() => this.setState({ showCreateContact: true })}
                    >
                      Lägg till kontaktperson
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="contact-cards-container">
                <div className="comment-container">
                  <div className="profile-date-time-container">
                    <img className="profile-pic" src={imgUrl} />
                  </div>
                  <div className="card add-comment-card">
                    <textarea
                      value={this.state.newComment}
                      onChange={event => {
                        this.setState({ newComment: event.target.value });
                      }}
                    />
                    <button
                      className="btn-primary"
                      onClick={this.createComment}
                    >
                      Add
                    </button>
                  </div>
                </div>
                {this.state.comments
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map(comment => this.renderCommentCard(comment))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCommentCard(comment) {
    const isCommentBeingEdited = this.state.commentsBeingEdited.includes(
      comment.id
    );
    if (isCommentBeingEdited) {
      return this.renderEditCommentCard(comment);
    } else {
      return this.renderStaticCommentCard(comment);
    }
  }

  renderStaticCommentCard = comment => {
    return (
      <div className="comment-container">
        <div className="profile-date-time-container">
          <img className="profile-pic" src={imgUrl} />
          <div className="comment-date">
            {this.dateStringFromTimestamp(comment.timestamp)}
          </div>
          <div className="comment-time">
            {this.timeStringFromTimestamp(comment.timestamp)}
          </div>
        </div>
        <div className="card card-container">
          <div className="comment-card">
            <div className="comment-text">{comment.text}</div>
          </div>
          <div className="card-actions">
            <button
              className="btn-primary"
              onClick={() => this.startEditingComment(comment.id)}
            >
              Edit
            </button>

            <button
              className="btn-danger"
              onClick={() => this.deleteComment(comment.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  renderEditCommentCard = comment => {
    return (
      <div className="comment-container">
        <div className="profile-date-time-container">
          <img className="profile-pic" src={imgUrl} />
          <div className="comment-date">
            {this.dateStringFromTimestamp(comment.timestamp)}
          </div>
          <div className="comment-time">
            {this.timeStringFromTimestamp(comment.timestamp)}
          </div>
        </div>
        <div className="card card-container">
          <div className="comment-card">
            <textarea
              className="comment-text"
              value={this.state.comments.find(c => c.id === comment.id).text}
              onChange={event =>
                this.changeCommentText(comment.id, event.target.value)
              }
            />
          </div>
          <div className="card-actions">
            <button
              className="btn-primary"
              onClick={() => this.saveNewComment(comment.id)}
            >
              Save
            </button>
            <button
              className="btn-danger"
              onClick={() => this.cancelEditingComment(comment.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  renderContactCard(contactInfo) {
    return (
      <div className="card card-container">
        <div className="contact-card">
          <div className="contact-info">
            <div className="contact-text">
              <b>Namn:</b> {contactInfo.name}
            </div>
            <div className="contact-text">
              <b>Nummer</b> {contactInfo.phone_number}
            </div>
            <div className="contact-text">
              <b>Mejl:</b> {contactInfo.email}
            </div>
          </div>
          <div className="contact-comment">{contactInfo.comment}</div>
        </div>
        <div className="card-actions">
          <button className="btn-primary">Edit</button>
          <button
            className="btn-danger"
            onClick={() => this.deleteContact(contactInfo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  renderCreateContactCard = () => {
    return (
      <div className="card">
        <div className="contact-card create-contact-inputs-container">
          <label>Namn</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newComment.name}
            onChange={event =>
              this.setState({
                newContact: {
                  ...this.state.newContact,
                  name: event.target.value
                }
              })
            }
          />
          <label>Telefonnummer</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newComment.phone_number}
            onChange={event =>
              this.setState({
                newContact: {
                  ...this.state.newContact,
                  phone_number: event.target.value
                }
              })
            }
          />
          <label>Mejl</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newComment.email}
            onChange={event =>
              this.setState({
                newContact: {
                  ...this.state.newContact,
                  email: event.target.value
                }
              })
            }
          />
          <label>Kommentar</label>
          <input
            type="text"
            className="form-control"
            value={this.state.newComment.comment}
            onChange={event =>
              this.setState({
                newContact: {
                  ...this.state.newContact,
                  comment: event.target.value
                }
              })
            }
          />
        </div>
        <div className="card-actions">
          <button className="btn-primary" onClick={this.createContact}>
            Save
          </button>
          <button
            className="btn-danger"
            onClick={() => this.setState({ showCreateContact: false })}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  dateStringFromTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toISOString().substr(0, 10);
  };

  timeStringFromTimestamp = timestamp => {
    const date = new Date(timestamp);
    return (
      this.paddTimeNumber(date.getHours().toString()) +
      ':' +
      this.paddTimeNumber(date.getMinutes().toString())
    );
  };

  paddTimeNumber = number => {
    return number.length < 2 ? '0' + number : number;
  };
}

const imgUrl =
  'https://media.licdn.com/dms/image/C5603AQHwSdySWFDuDQ/profile-displayphoto-shrink_200_200/0?e=1570665600&v=beta&t=06T-IUNJ-tRb5fHRCKPA5ADSnkXjsyiQLNlz8RntK7c';

export default CompanyDetails;

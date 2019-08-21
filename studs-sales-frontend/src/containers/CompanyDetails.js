import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
  deleteContactApi,
  updateContactApi
} from '../utils/api';
import { statuses } from '../utils/constants';

import {
  StaticCommentCard,
  EditCommentCard,
  CreateContactCard,
  NewCommentCard,
  StaticContactCard
} from '../components';

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
      contactsBeingEdited: [],
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

  createComment = async text => {
    try {
      const addedComment = await addCommentApi({
        id: this.state.companyId,
        body: {
          user: 1,
          text
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

  startEditingContact = contactId => {
    if (!this.state.contactsBeingEdited.includes(contactId)) {
      this.setState({
        contactsBeingEdited: [...this.state.contactsBeingEdited, contactId]
      });
    }
  };

  changeCommentText = (id, newText) => {
    let oldComments = this.state.comments;
    oldComments.find(comment => comment.id === id).text = newText;
    this.setState({ comments: oldComments });
  };

  saveNewComment = async (id, text) => {
    const updated = await updateCommentApi({ id, body: { text } });
    if (updated) {
      this.cancelEditingComment(id);
      this.getComments();
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

  cancelEditingContact = id => {
    this.setState({
      contactsBeingEdited: this.state.contactsBeingEdited.filter(
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

  createContact = async body => {
    try {
      const addedComment = await addContactApi({
        id: this.state.companyId,
        body
      });
      if (addedComment) {
        console.log('ADDED Contact');
        this.getContacts();
        this.setState({
          showCreateContact: false
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

  saveContact = async (id, body) => {
    const updated = await updateContactApi({ id, body });
    if (updated) {
      console.log('UPDATED CONTACT');
      this.cancelEditingContact(id);
      this.getContacts();
    } else {
      console.error('failed to update contact');
      this.cancelEditingContact(id);
    }
  };

  render() {
    return (
      <div className="text-center m-w-full m-h-full flex flex-col align-center justify-center min-w-15">
        <div className="bg-gray-700 w-100 text-5xl pt-4 pb-4 text-white">
          <div>
            <i
              className="fas fa-long-arrow-alt-left absolute top-0 left-0 text-white pl-8 pt-8 hover:cursor-pointer hover:underline"
              onClick={() => {
                this.props.history.goBack();
              }}
            />
          </div>
          <div>{this.state.info.company_name}</div>
        </div>
        <div className="bg-white flex-1 w-100 flex flex-col items-center">
          <div className="w-100 px-2 mb-8 flex justify-center">
            <div className="flex justify-center items-end mr-4">
              {this.state.completedUpdating && (
                <span className="text-2xl text-green-500">
                  <i className="fas fa-check" />{' '}
                </span>
              )}
            </div>
            <div className="mr-4">
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
          <div className="body flex lg:flex-row flex-col mb-8 pl-4">
            <div className="lg:w-1/4 max-w-full h-100">
              <div className="contact-cards-container">
                {this.state.contacts.map(contactInfo =>
                  this.isContactBeingEdited(contactInfo) ? (
                    <CreateContactCard
                      contactInfo={contactInfo}
                      saveContact={body =>
                        this.saveContact(contactInfo.id, body)
                      }
                      hideCard={() => this.cancelEditingContact(contactInfo.id)}
                    />
                  ) : (
                    <StaticContactCard
                      contactInfo={contactInfo}
                      deleteContact={this.deleteContact}
                      startEditingContact={this.startEditingContact}
                    />
                  )
                )}
                <div>
                  {this.state.showCreateContact && (
                    <CreateContactCard
                      saveContact={this.createContact}
                      hideCard={() =>
                        this.setState({ showCreateContact: false })
                      }
                    />
                  )}
                  {!this.state.showCreateContact && (
                    <button
                      className="btn btn-primary"
                      onClick={() => this.setState({ showCreateContact: true })}
                    >
                      Lägg till kontaktperson
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-3/4 lg:mt-0 mt-8 max-w-full">
              <div className="contact-cards-container">
                <NewCommentCard createComment={this.createComment} />
                {this.state.comments
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map(comment =>
                    this.isCommentBeingEdited(comment) ? (
                      <EditCommentCard
                        comment={comment}
                        changeCommentText={this.changeCommentText}
                        saveNewComment={this.saveNewComment}
                        cancelEditingComment={this.cancelEditingComment}
                      />
                    ) : (
                      <StaticCommentCard
                        comment={comment}
                        startEditingComment={this.startEditingComment}
                        deleteComment={this.deleteComment}
                      />
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  isCommentBeingEdited = comment => {
    return this.state.commentsBeingEdited.includes(comment.id);
  };

  isContactBeingEdited = contact => {
    return this.state.contactsBeingEdited.includes(contact.id);
  };
}

export default CompanyDetails;

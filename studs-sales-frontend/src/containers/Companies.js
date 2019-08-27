import React, { Component } from 'react';
import {
  statusesApi,
  companiesApi,
  membersApi,
  addCompanyApi
} from '../utils/api';
import { Link } from 'react-router-dom';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      filteredCompanies: [],
      users: [],
      statuses: [],
      showAddNew: false,
      newCompanyName: '',
      filterText: '',
      filterUser: 'Alla',
      filterStatus: 'Alla',
      sortStatus: {
        property: 'company_name',
        direction: 'DESC'
      }
    };
  }

  componentDidMount() {
    this.getCompanies();
    this.getMembers();
    this.getStatuses();
    document.title = 'STUDS | Alla företag';
  }

  getCompanies = async () => {
    try {
      const companies = await companiesApi(this.props.location.search);
      this.setState({ companies }, this.filterResult);
    } catch (err) {
      console.error(err);
    }
  };

  getMembers = async () => {
    try {
      const { users } = await membersApi();
      this.setState({ users });
    } catch (err) {
      console.log(err);
    }
  };

  getStatuses = async () => {
    try {
      const { statuses } = await statusesApi();
      this.setState({ statuses });
    } catch (err) {
      console.log(err);
    }
  };

  addNewCompany = async () => {
    try {
      const wasAdded = await addCompanyApi({ name: this.state.newCompanyName });
      if (wasAdded) {
        this.setState({ showAddNew: false, newCompanyName: '' });
        this.getCompanies();
      }
    } catch (err) {
      console.log(err);
    }
  };

  filterResult = () => {
    this.setState(
      {
        filteredCompanies: this.state.companies
          .filter(company =>
            company.company_name
              .toLowerCase()
              .includes(this.state.filterText.toLowerCase())
          )
          .filter(company =>
            this.state.filterStatus === 'Alla'
              ? 1
              : company.status === this.state.filterStatus
          )
          .filter(company =>
            this.state.filterUser === 'Alla'
              ? 1
              : company.responsible_name === this.state.filterUser
          )
      },
      this.applySortStatus
    );
  };

  setSortStatus = property => {
    if (this.state.sortStatus.property === property) {
      switch (this.state.sortStatus.direction) {
        case 'ASC':
          this.setState(
            { sortStatus: { property, direction: 'DESC' } },
            this.applySortStatus
          );
          break;
        case 'DESC':
          this.setState(
            { sortStatus: { property, direction: 'NONE' } },
            this.applySortStatus
          );
          break;
        case 'NONE':
          this.setState(
            { sortStatus: { property, direction: 'ASC' } },
            this.applySortStatus
          );
          break;
        default:
          throw new RangeError('Wrong sort status direction');
      }
    } else {
      this.setState(
        { sortStatus: { property, direction: 'ASC' } },
        this.applySortStatus
      );
    }
  };

  applySortStatus = () => {
    const { property, direction } = this.state.sortStatus;
    let sortedList = [];
    if (direction === 'ASC') {
      sortedList = this.state.filteredCompanies.sort(
        (a, b) =>
          (a[property] === null) - (b[property] === null) ||
          +(a[property] > b[property]) ||
          -(a[property] < b[property])
      );
    } else if (direction === 'DESC') {
      sortedList = this.state.filteredCompanies.sort(
        (a, b) =>
          (a[property] === null) - (b[property] === null) ||
          -(a[property] > b[property]) ||
          +(a[property] < b[property])
      );
    } else {
      //default sort by id
      sortedList = this.state.filteredCompanies.sort((a, b) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0
      );
    }
    this.setState({ filteredCompanies: sortedList });
  };

  render() {
    return (
      <div className="text-center m-w-full m-h-full flex flex-col items-center justify-center">
        <div className="bg-gray-700 w-100 text-5xl pt-4 pb-4 text-white">
          Företag
        </div>
        <div className="bg-white flex-1 w-100 flex flex-col items-center">
          <div className="body flex justify-center">
            <div className="form-group mr-2">
              <label>Företag</label>
              <input
                type="text"
                className="form-control"
                value={this.state.filterText}
                onChange={event => {
                  this.setState(
                    { filterText: event.target.value },
                    this.filterResult
                  );
                }}
              />
            </div>
            <div className="mr-2">
              <label>Status</label>
              <select
                className="form-control"
                id="status-select"
                value={this.state.filterStatus}
                onChange={event =>
                  this.setState(
                    { filterStatus: event.target.value },
                    this.filterResult
                  )
                }
              >
                <option value="Alla">Alla</option>
                {this.state.statuses.map(status => (
                  <option key={status.id} value={status.status}>
                    {status.status}
                  </option>
                ))}
              </select>
            </div>
            <div className="mr-2">
              <label>Ansvarig</label>
              <select
                className="form-control"
                id="member-select"
                value={this.state.filterUser}
                onChange={event =>
                  this.setState(
                    { filterUser: event.target.value },
                    this.filterResult
                  )
                }
              >
                <option value="Alla">Alla</option>
                {this.state.users.map(user => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            Visar <b>{this.state.filteredCompanies.length}</b> företag
          </div>
          {!this.state.showAddNew && (
            <button
              className="btn-sm md:btn-md btn-primary"
              onClick={() => this.setState({ showAddNew: true })}
            >
              Lägg till ny
            </button>
          )}

          {this.state.showAddNew && this.renderAddNewInput()}

          <div className="body mt-2">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th
                    onClick={() => {
                      this.setSortStatus('company_name');
                    }}
                  >
                    Företag
                  </th>
                  <th
                    onClick={() => {
                      this.setSortStatus('status');
                    }}
                  >
                    Status
                  </th>
                  <th
                    onClick={() => {
                      this.setSortStatus('responsible_name');
                    }}
                  >
                    Ansvarig
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.filteredCompanies.map(company =>
                  this.renderCompany(company)
                )}
              </tbody>
            </table>
          </div>
          <div />
        </div>
      </div>
    );
  }

  renderCompany({ id, company_name, status, responsible_name }) {
    const statusColorId = this.getStatusColorFromStatusName(status);
    return (
      <tr key={id}>
        <td>
          <Link to={`companies/${id}`}>{company_name}</Link>
        </td>
        <td className={`status-box status-color-${statusColorId}`}>{status}</td>
        <td>{responsible_name}</td>
      </tr>
    );
  }

  getStatusColorFromStatusName = status => {
    const statusForCompany = this.state.statuses.find(s => s.status === status);
    return statusForCompany ? statusForCompany.id : 0;
  };

  renderAddNewInput = () => {
    return (
      <div className="body flex flex-column justify-center items-center mb-4">
        <div className="mb-2 w-2/5">
          <label>Företag</label>
          <input
            type="text"
            className="form-control"
            id="newCompanyInput"
            value={this.state.newCompanyName}
            onChange={event =>
              this.setState({ newCompanyName: event.target.value })
            }
          />
        </div>
        <div className="flex justify-center">
          <button
            className="btn-sm md:btn-md btn-secondary"
            onClick={() => this.setState({ showAddNew: false })}
          >
            Avbryt
          </button>
          <button
            className="btn-sm md:btn-md btn-primary whitespace-no-wrap"
            onClick={() => this.addNewCompany()}
          >
            Lägg till
          </button>
        </div>
      </div>
    );
  };
}

export default Companies;

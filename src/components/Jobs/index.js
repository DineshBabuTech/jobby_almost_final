import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import Profile from '../Profile'

import AllJobs from '../AllJobs'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {searchInput: '', salaryRangeId: ''}

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  changeSalaryRangeId = event => {
    this.setState({salaryRangeId: event.target.value})
  }

  render() {
    const {searchInput, salaryRangeId} = this.state
    return (
      <>
        <Header />
        <div className="jobs-cont">
          <div className="responsive-cont">
            <div className="s-search-box">
              <input
                className="s-search"
                type="search"
                value={searchInput}
                placeholder="Search"
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-icon"
              >
                <BsSearch />
              </button>
            </div>
            <Profile />
            <hr className="separator" />
            <h1 className="type-text">Type of Employment</h1>
            <ul className="type-cont">
              {employmentTypesList.map(type => (
                <li className="item">
                  <input
                    className="checkbox"
                    id={type.employmentTypeId}
                    type="checkbox"
                  />
                  <label htmlFor={type.employmentTypeId} className="labe-text">
                    {type.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="separator" />
            <h1 className="type-text">Salary Range</h1>
            <ul className="type-cont">
              {salaryRangesList.map(range => (
                <li className="item">
                  <input
                    onChange={this.changeSalaryRangeId}
                    name="salary range"
                    className="checkbox"
                    type="radio"
                    value={range.salaryRangeId}
                    id={range.salaryRangeId}
                  />
                  <label htmlFor={range.salaryRangeId} className="labe-text">
                    {range.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="each-jobs-cont">
            <div className="l-search-box">
              <input
                onChange={this.getSearchInput}
                className="l-search"
                type="search"
                value={searchInput}
                placeholder="Search"
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-icon"
              >
                <BsSearch />
              </button>
            </div>
            <AllJobs salaryRangeId={salaryRangeId} searchInput={searchInput} />
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

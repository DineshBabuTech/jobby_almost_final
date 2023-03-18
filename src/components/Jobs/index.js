import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobCard from '../JobCard'
import Profile from '../Profile'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    salaryRangeId: '',
    jobsList: [],
    employmentTypeId: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {employmentTypeId, searchInput, salaryRangeId} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeId}&minimum_package=${salaryRangeId}&title_search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.againGetJobs} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobCard jobDetails={job} key={job.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  againGetJobs = () => {
    this.getJobs()
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchEntry = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getJobs)
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-cont">
          <div className="responsive-cont">
            <div className="s-search-box">
              <input
                onChange={this.getSearchInput}
                className="s-search"
                type="search"
                value={searchInput}
                placeholder="Search"
              />
              <button
                onClick={this.getSearchEntry}
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
                onClick={this.getSearchEntry}
                data-testid="searchButton"
                type="button"
                className="search-icon"
              >
                <BsSearch />
              </button>
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

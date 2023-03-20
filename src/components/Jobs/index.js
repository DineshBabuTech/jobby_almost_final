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
    employmentTypeId: [],
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
    const empTypeId = employmentTypeId.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empTypeId}&minimum_package=${salaryRangeId}&search=${searchInput}`
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

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchInput = () => {
    this.getJobs()
  }

  changeSalaryRangeId = event => {
    if (event.target.checked) {
      this.setState({salaryRangeId: event.target.id}, this.getJobs)
    }
  }

  changeEmploymentTypeId = event => {
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentTypeId: [...prevState.employmentTypeId, event.target.id],
        }),
        this.getJobs,
      )
    } else {
      const {employmentTypeId} = this.state
      const updatedList = employmentTypeId.filter(
        eachType => eachType !== event.target.id,
      )
      this.setState({employmentTypeId: [...updatedList]}, this.getJobs)
    }
  }

  render() {
    const {searchInput, employmentTypeId, salaryRangeId} = this.state

    return (
      <>
        <Header />
        <div className="jobs-cont">
          <div className="responsive-cont">
            <div className="s-search-box">
              <input
                onChange={this.changeSearchInput}
                className="s-search"
                type="search"
                placeholder="Search"
                value={searchInput}
              />
              <button
                onClick={this.getSearchInput}
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
                    id={type.employmentTypeId}
                    onChange={this.changeEmploymentTypeId}
                    className="checkbox"
                    value={employmentTypeId}
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
                    id={range.salaryRangeId}
                    onChange={this.changeSalaryRangeId}
                    name="salary range"
                    value={salaryRangeId}
                    className="checkbox"
                    type="radio"
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
                onChange={this.changeSearchInput}
                className="l-search"
                type="search"
                value={searchInput}
                placeholder="Search"
              />
              <button
                onClick={this.getSearchInput}
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

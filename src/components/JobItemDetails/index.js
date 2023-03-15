import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoOpenOutline} from 'react-icons/io5'

import SimilarJobs from '../SimilarJobs'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const data = {
        jobDetails: fetchedData.job_details,
        similarJobs: fetchedData.similar_jobs,
      }
      const updatedJobData = {
        companyLogoUrl: data.jobDetails.company_logo_url,
        companyWebsiteUrl: data.jobDetails.company_website_url,
        employmentType: data.jobDetails.employment_type,
        id: data.jobDetails.id,
        jobDescription: data.jobDetails.job_description,
        skills: data.jobDetails.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: data.jobDetails.life_at_company.description,
          imageUrl: data.jobDetails.life_at_company.image_url,
        },
        location: data.jobDetails.location,
        packagePerAnnum: data.jobDetails.package_per_annum,
        rating: data.jobDetails.rating,
        title: data.jobDetails.title,
      }
      const updatedSimilarJobs = data.similarJobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        rating: eachData.rating,
        title: eachData.title,
      }))
      this.setState({
        jobData: updatedJobData,
        similarJobsData: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  againGetJobDetails = () => {
    this.getJobData()
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
      <button
        onClick={this.againGetJobDetails}
        className="retry-btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData} = this.state
    const {
      packagePerAnnum,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      rating,
      title,
    } = jobData
    return (
      <div className="job-item">
        <div className="company-logo-cont">
          <img
            className="company-logo-img"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="rating-cont">
              <AiFillStar className="rating-star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="cont2">
          <div className="location-emp-cont">
            <div className="location-cont">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="emp-cont">
              <BsBriefcaseFill className="job-icon" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator2" />
        <div className="desc-cont">
          <h1 className="heading2">Description</h1>
          <a href={companyWebsiteUrl} className="link">
            <div className="visit-cont">
              <p className="visit">Visit</p>
              <IoOpenOutline className="open" />
            </div>
          </a>
        </div>
        <p className="job-description">{jobDescription}</p>
        <h1 className="heading3">Skills</h1>
        <ul className="skill-bg">
          {skills.map(eachSkill => (
            <li className="skill-cont">
              <img src={eachSkill.imageUrl} alt={eachSkill.name} />
              <p className="skill-text">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="heading2">Life at Company</h1>
        <div className="life-cont">
          <p className="job-description">{lifeAtCompany.description}</p>
          <img src={lifeAtCompany.imageUrl} alt="life at company" />
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {similarJobsData} = this.state
    return (
      <>
        <Header />
        <div className="job-item-bg">
          {this.renderJobDetails()}
          <h1 className="heading4">Similar Jobs</h1>
          <ul className="similar-cont">
            {similarJobsData.map(eachJob => (
              <SimilarJobs jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default JobItemDetails

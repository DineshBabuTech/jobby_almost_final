import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="company-logo-cont">
          <img
            className="company-logo-img"
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="heading2">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard

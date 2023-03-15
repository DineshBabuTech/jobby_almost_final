import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-item2">
      <div className="company-logo-cont">
        <img
          className="company-logo-img"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="job-title">{title}</h1>
          <div className="rating-cont">
            <AiFillStar className="rating-star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="heading2">Description</h1>
      <p className="job-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobs

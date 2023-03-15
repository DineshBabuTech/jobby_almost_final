import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const logoutClicked = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <div className="res-cont">
        <Link to="/">
          <img
            className="nav-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <div>
          <ul className="text-cont">
            <li className="nav-text">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-text">
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
            </li>
          </ul>
          <ul className="text-cont">
            <li>
              <Link className="nav-link" to="/">
                <AiFillHome className="s-icon" />
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/jobs">
                <BsBriefcaseFill className="s-icon" />
              </Link>
            </li>
            <li>
              <FiLogOut onClick={logoutClicked} className="s-icon" />
            </li>
          </ul>
        </div>
        <button onClick={logoutClicked} className="logout-btn" type="button">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)

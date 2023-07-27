import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onSubmitLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="home-top-container">
        <img
          className="home-top-logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button
          className="home-top-button"
          type="button"
          onClick={onSubmitLogout}
        >
          Logout
        </button>
      </div>
      <div className="home-bottom-container">
        <h1 className="home-title">Your Flexibility, Our Excellence</h1>
        <img
          className="home-image"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home

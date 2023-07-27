import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showError: false, errorMsg: ''}

  onChangeUserInput = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userInput, pin, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-image-container">
          <img
            className="login-image"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
        </div>
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <h1 className="form-heading">Welcome Back!</h1>
          <label htmlFor="user-id" className="form-label">
            User ID
          </label>
          <br />
          <input
            id="user-id"
            type="text"
            placeholder="Enter User ID"
            className="form-input"
            onChange={this.onChangeUserInput}
            value={userInput}
          />
          <br />
          <label htmlFor="pin" className="form-label">
            PIN
          </label>
          <br />
          <input
            id="pin"
            type="password"
            placeholder="Enter PIN"
            className="form-input"
            onChange={this.onChangePin}
            value={pin}
          />
          <br />
          <button className="form-button" type="submit">
            Login
          </button>
          {showError ? <p className="error">{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default Login

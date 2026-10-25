import { ChevronIcon } from '../components/Icons'

// Admin sign-in screen. The typed values and the error message live in Admin.jsx.
export default function LoginForm({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  error,
  onSubmit,
}) {
  return (
    <div className="alogin">
      <form className="panel acard" onSubmit={onSubmit}>
        <h2 className="logo">MOTRIX</h2>
        <small>Admin sign in</small>

        <label>
          Email
          <input
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="motrix@gmail.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </label>

        {error && <small className="err">{error}</small>}

        <button className="btn dark">Sign in</button>

        {/* plain <a> on purpose: a full page load back to the store */}
        <a href="/" className="u">
          <span className="bk">
            <ChevronIcon direction="left" />
          </span>
          Back to store
        </a>
      </form>
    </div>
  )
}

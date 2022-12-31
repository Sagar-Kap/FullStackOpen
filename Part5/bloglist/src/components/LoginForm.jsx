import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
    setPassword("");
    setUsername("");
  };

  return (
    <div>
      <h1 className="heading">Log in to the application</h1>
      <form onSubmit={onSubmit}>
        <table>
          <tr>
            <td>Username:</td>
            <td>
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button type="submit">Login</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;

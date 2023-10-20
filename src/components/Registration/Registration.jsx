import React, { useReducer, useState } from "react";

const registrationReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.email };
    case "SET_PASSWORD":
      return { ...state, password: action.password };
    case "SET_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const Registration = () => {

  const initialRegistrationData = {
    email: "",
    password: "",
    error: null,
  };

  const [registrationData, dispatch] = useReducer(
    registrationReducer,
    initialRegistrationData
  );
  const [isRegistered, setIsRegistered] = useState(false);

  const validateForm = () => {
    const { email, password } = registrationData;

    if (!email || !password) {
      dispatch({
        type: "SET_ERROR",
        error: "All fields must be filled",
      });
      return false;
    }

    dispatch({ type: "SET_ERROR", error: null });
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsRegistered(true);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      {isRegistered ? (
        <div>
          <p>Congratulations! Registration completed successfully</p>
        </div>
      ) : (
        <div>
          {registrationData.error && (
            <p className="error">{registrationData.error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                value={registrationData.email}
                onChange={(e) =>
                  dispatch({ type: "SET_EMAIL", email: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="password"
                value={registrationData.password}
                onChange={(e) =>
                  dispatch({ type: "SET_PASSWORD", password: e.target.value })
                }
              />
            </div>
            <button type="submit">Sign up</button>
          </form>
        </div>
      )}
    </div>
  );
};

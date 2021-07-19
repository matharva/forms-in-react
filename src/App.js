import "./App.css";
import React, { useState } from "react";

function App() {
  const [form, setForm] = useState([]);

  function prevIsValid() {
    if (form.length === 0) {
      return true;
    }

    const isFieldEmpty = form.some(
      (item) => item.username === "" || item.platform === ""
    );

    if (isFieldEmpty) {
      form.map((item, index) => {
        const currentForm = [...form];

        if (form[index].platform === "")
          currentForm[index].errors.platform = "Platform is required";
        if (form[index].username === "")
          currentForm[index].errors.username = "Username is required";

        setForm(currentForm);
      });
    }
    return !isFieldEmpty;
  }

  function handleClick(e) {
    e.preventDefault();
    const inputState = {
      platform: "",
      username: "",
      errors: {
        platform: null,
        username: null,
      },
    };

    if (prevIsValid()) {
      setForm((prevState) => [...prevState, inputState]);
    }
  }

  function handleChange(index, e) {
    e.preventDefault();
    e.persist();
    // setForm({ ...form, [name]: value });
    setForm((prev) => {
      return prev.map((item, i) => {
        const value = e.target.value;
        const name = e.target.name;
        if (i !== index) return item;

        return {
          ...item,
          [name]: value,
          errors: {
            ...item.errors,
            [name]: value.length > 0 ? null : [name] + "is required",
          },
        };
      });
    });
  }

  function handleRemove(index, e) {
    e.preventDefault();

    setForm((prev) => prev.filter((item) => item !== prev[index]));
  }

  return (
    <div className="container mt-5 py-5">
      <h1>Add social links</h1>
      {JSON.stringify(form)}
      {form.map((item, index) => (
        <div className="row mt-3" key={`item-${index}`}>
          {/* Platform */}
          <div className="col">
            <input
              type="text"
              className={
                item.errors.platform
                  ? `form-control is-invalid`
                  : `form-control `
              }
              name="platform"
              placeholder="Platform"
              value={item.platform}
              onChange={(e) => handleChange(index, e)}
            />
            {item.errors.platform && (
              <div className="invalid-feedback">{item.errors.platform}</div>
            )}
          </div>
          {/* Username */}
          <div className="col">
            <input
              type="text"
              className={
                item.errors.username
                  ? "form-control is-invalid"
                  : `form-control`
              }
              name="username"
              placeholder="Username"
              value={item.username}
              onChange={(e) => handleChange(index, e)}
            />
            {item.errors.username && (
              <div className="invalid-feedback">{item.errors.username}</div>
            )}
          </div>

          <button
            className="col-1 btn btn-warning"
            onClick={(e) => handleRemove(index, e)}
          >
            X
          </button>
        </div>
      ))}
      <form>
        <button className="btn btn-primary mt-3" onClick={handleClick}>
          Add link
        </button>
      </form>
    </div>
  );
}

export default App;

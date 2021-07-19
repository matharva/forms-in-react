import "./App.css";
import React, { useState } from "react";

function App() {
  const [form, setForm] = useState([]);

  function handleClick(e) {
    e.preventDefault();
    const inputState = {
      platform: "",
      username: "",
    };
    setForm((prevState) => [...prevState, inputState]);
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

        return { ...item, [name]: value };
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
              className="form-control"
              name="platform"
              placeholder="Platform"
              value={item.platform}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
          {/* Username */}
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              value={item.username}
              onChange={(e) => handleChange(index, e)}
            />
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

import { useState } from "react";

function FilterDate() {

  const [formData, setFormData] = useState({
    from: "",
    to: "",
  });

  function handleChange(event) {
    let value = event.target.value;
    setFormData({ ...formData, [event.target.name]: value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event)
  };

  return (
    <div className="d-flex w-50 m-3">
      <form onSubmit={handleSubmit}>
        <label>
          From:{" "}
          <input
            onChange={handleChange}
            id="inicial"
            className="form-control me-3"
            type="date"
            placeholder="Data Inicial"
            value={formData.inicial}
          />
        </label>

        <label>
          To:{" "}
          <input
            onChange={handleChange}
            id="final"
            className="form-control"
            type="date"
            placeholder="Data Final"
            value={formData.final}
          />
        </label>

        <button type="submit" className="btn btn-light">Filter</button>
      </form>
    </div>
  );
}

export default FilterDate;

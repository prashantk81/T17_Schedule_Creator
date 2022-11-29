import React from "react";
import "./act.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function Activity(props) {
  const { index, deleteActivity, handleServiceChange, value } = props;
  return (
    <div className="services">
      <div className="first-division align-item-centre">
        <div className="form-group col-md-3 col-md-5 st_col">
          <label htmlFor="x">
            <strong>Name of the Activity:</strong>
          </label>
          <input
            name="title"
            type="text"
            id="service"
            className="form-control"
            onChange={(e) => handleServiceChange(e, index)}
            required
          />
        </div>

        <div className="form-group col-md-3 col-md-5 st_col int">
          <div>
            <label htmlFor="datetime-local">
              <strong> No of Slot(Per slot 30 min):</strong>
            </label>
            <input
              name="noofslots"
              timer="time"
              type="input"
              className="form-control "
              id="datetime-local"
              onChange={(e) => handleServiceChange(e, index)}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => deleteActivity(e, index)}
          className="remove"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

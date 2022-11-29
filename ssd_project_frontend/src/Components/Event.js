import React from "react";
import { useNavigate, useHistory } from "react-router-dom";

function Event(props) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/query", {
      state: {
        activities: props.data.activity,
      },
    });
  };
  return (
    <div>
      <h1 onClick={handleClick}>{props.name}</h1>
    </div>
  );
}

export default Event;

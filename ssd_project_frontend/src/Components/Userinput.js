import React, { useState, useEffect } from "react";
import { Activity } from "./activity";
import "./style.css";
import axios from "axios";
import App from "./../App";
import "bootstrap/dist/css/bootstrap.min.css";
import Event from "./Event";
import { useNavigate } from "react-router-dom";
function Userinput() {
  const [serviceList, setServiceList] = useState([]);
  const [eventName, setEventName] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [query, setQuery] = useState([]);
  const [submitVisibility, setSubmitVisibility] = useState(true);
  const [scheduleVisibility, setScheduleVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/getquery", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((jsonRes) => {
        setQuery([...jsonRes.data]);
      });
  }, []);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (e, index) => {
    e.preventDefault();
    let modArray = serviceList.filter((val, idx) => {
      return idx !== index;
    });
    setServiceList([...modArray]);
  };

  const handleChange1 = (event) => {
    setEventName(event.target.value);
  };

  const handleChange2 = (event) => {
    setNoOfDays(event.target.value);
  };

  const handleChange3 = (event) => {
    setStartDate(event.target.value);
  };
  const handleChange4 = (event) => {
    setEndDate(event.target.value);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, {}]);
  };

  const myFunction = (e) => {
    e.preventDefault();
    window.location = "https://www.timeanddate.com/calendar/";
  };

  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    var start_time = new Date(startDate);
    var end_time = new Date(endDate);
    const milliseconds = Math.abs(start_time.getTime() - end_time.getTime());
    const hours = parseInt((parseInt(milliseconds) / 36e5) * 2);
    var arr = new Array(noOfDays);
    for (var i = 0; i < noOfDays; i++) {
      arr[i] = new Array(hours);
    }
    for (var i = 0; i < noOfDays; i++) {
      for (var j = 0; j < hours; j++) {
        arr[i][j] = 0;
      }
    }
    var updated_serviceList = [];
    var day = 0;
    for (var idx = 0; idx < serviceList.length; idx++) {
      var time_slice = parseInt(serviceList[idx].noofslots);
      var bb = 0;
      for (var i = day % noOfDays; i < noOfDays; i = (i + 1) % noOfDays) {
        var out_temp = 0;
        // console.log(serviceList);
        if (bb == noOfDays) {
          alert(`Can't schedule  ${serviceList[idx].title}`);
          break;
        }
        bb++;
        for (var j = 0; j <= arr[i].length - time_slice; j++) {
          var temp = 0;
          var k;
          if (time_slice + j <= arr[i].length) {
            for (k = j; k < time_slice + j; k++) {
              if (arr[i][k] == 1) temp = 1;
            }
          } else temp = 1;
          if (temp == 0) {
            var time = new Date(start_time);
            time.setTime(time.getTime() + i * 24 * 60 * 60 * 1000);
            time.setTime(time.getTime() + j * 0.5 * 60 * 60 * 1000);
            const temp = time;
            serviceList[idx].startDate = new Date(temp);
            var endtime = new Date(time);
            endtime.setTime(time.getTime() + time_slice * 0.5 * 60 * 60 * 1000);
            serviceList[idx].endDate = new Date(endtime);
            var t;
            for (t = j; t < time_slice + j; t++) {
              arr[i][t] = 1;
            }
            updated_serviceList.push(serviceList[idx]);
            out_temp = 1;
            break;
          }
        }
        day++;
        if (out_temp == 1) break;
      }
    }
    setServiceList(updated_serviceList);

    const configuration = {
      method: "post",
      url: "http://localhost:5000/tasks",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        eventName,
        noOfDays,
        startDate,
        serviceList,
      },
    };
    setIsLoading(true);
    axios(configuration)
      .then((response) => {
        setSubmitVisibility(false);
        setScheduleVisibility(true);
        setIsLoading(false);
      })
      .catch((error) => {
        error = new Error();
        setIsLoading(false);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/");
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    navigate("/query", {
      state: {
        activities: serviceList,
      },
    });
  };

  const events = query.map((q, idx) => {
    return <Event key={idx} name={q.event_name} id={q._id} data={q} />;
  });

  return (
    <>
      {isLoading ? (
        <>
          <h1>Loading</h1>
        </>
      ) : (
        <div className="formbody">
          <h2 class="head">Schedule Creator</h2>
          <button class="submitbtn" onClick={handleLogout}>
            Logout
          </button>
          <div className="form-row1">
            <div className="eventdiv">
              <div className=" form-group col-md-5 div2 ">
                <label htmlFor="inputEmail4">
                  <strong>Event Name:</strong>
                </label>
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="event_name"
                  placeholder="Enter event Name"
                  onChange={handleChange1}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-5 div2">
                  <label htmlFor="inputEmail4">
                    <strong>No of Days:</strong>
                  </label>
                  <br />
                  <input
                    type="number"
                    className="form-control"
                    id="no_of_days"
                    placeholder="0"
                    onChange={handleChange2}
                  />
                </div>
              </div>
              <div className="form-group col-md-5 st_col">
                <label htmlFor="dt">
                  <strong>Start date And Time:</strong>
                </label>
                <input
                  onChange={handleChange3}
                  timer="time"
                  type="datetime-local"
                  name="startDate"
                  className="form-control"
                  id="datetime-local"
                ></input>
              </div>
              <div className="form-group col-md-5 st_col">
                <label htmlFor="dt">
                  <strong>End date and Time:</strong>
                </label>
                <input
                  onChange={handleChange4}
                  timer="time"
                  type="datetime-local"
                  name="endDate"
                  className="form-control"
                  id="datetime-local"
                ></input>
              </div>
              <br />
              <h5> Add Your Activities...</h5>
              <form className="App" autoComplete="off">
                <div className="form-field">
                  {serviceList.map((singleService, index) => (
                    <Activity
                      key={index}
                      index={index}
                      value={singleService.service}
                      deleteActivity={handleServiceRemove}
                      handleServiceChange={handleServiceChange}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleServiceAdd}
                    className="buttonAdd"
                  >
                    Add
                  </button>
                </div>
              </form>
              <br />
              <button
                type="button"
                className="btn btn-primary submitBT"
                onClick={(e) => handleSubmit(e)}
                style={{ display: submitVisibility ? "block" : "none" }}
              >
                Submit
              </button>
              <div className="title">
                {" "}
                <a
                  className="btn btn-primary submitBT"
                  type="button"
                  onClick={(e) => handleSchedule(e)}
                  style={{ display: scheduleVisibility ? "block" : "none" }}
                >
                  Schedule
                </a>
              </div>
            </div>
            <div className="allschedule">
              <h3 class="headline">Previous Scheduled Events</h3>
              <>{events}</>
            </div>
          </div>
        </div>
      )}
    </>
  );
  // }
}

export default Userinput;

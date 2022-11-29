import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import "./query.css";
import { useNavigate } from "react-router-dom";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  Appointments,
  TodayButton,
  MonthView,
  DayView,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import axios from "axios";
import Userinput from "./Userinput";

export function Query(props) {
  const location = useLocation();
  const { activities } = location.state;
  const [currentDate, setCurrentDate] = useState("2022-11-11");
  const [back, setback] = useState(false);
  const [currentViewName, setCurrentViewName] = useState("work-week");
  const navigate = useNavigate();
  const currentDateChange = (currentDate) => {
    setCurrentDate(currentDate);
  };
  const currentViewNameChange = (currentViewName) => {
    setCurrentViewName(currentViewName);
  };
  const handleback = (e) => {
    setback(true);
    navigate("/user");
  };
  const Appointment = ({ children, style, ...restProps }) => {
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor: "#325785",
          borderRadius: "8px",
          fontSize: "25px",
        }}
      >
        {children}
      </Appointments.Appointment>
    );
  };
  if (back == true) {
    return <Userinput />;
  } else {
    return (
      <div className="pp">
        <div class="calen">
          <div class="heading">
            <h1 className="heading">Scheduler</h1>
          </div>
          <div class="btn">
            <button class="styleforbtnback" onClick={handleback}>
              Back
            </button>
          </div>
        </div>
        <Paper>
          <Scheduler data={activities}>
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={currentDateChange}
              currentViewName={currentViewName}
              onCurrentViewNameChange={currentViewNameChange}
            />
            <WeekView startDayHour={0} endDayHour={24} />
            <WeekView
              name="work-week"
              displayName="Work Week"
              excludedDays={[0, 6]}
              startDayHour={0}
              endDayHour={24}
            />
            <MonthView />
            <DayView />
            <AllDayPanel />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
            <Appointments appointmentComponent={Appointment} />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}

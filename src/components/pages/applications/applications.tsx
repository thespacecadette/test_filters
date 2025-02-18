import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

// theme
import { FILTER_TABS } from './data';
import { SPACING_COMPONENT } from '../../../styles/theme';

// components
import DatePicker from 'react-datepicker';
import DataTable from './table';
import { Button, ButtonGroup, Card, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CalendarIcon from '@mui/icons-material/CalendarMonth';

// services
import services from './../../../services/service'

// types/models
import { Application } from '../../../../mock_api_service/model/Application';

// styles
import "react-datepicker/dist/react-datepicker.css";

interface ApplicationProps {
}

const Applications: React.FC<ApplicationProps> = ({  }) => {
  const [activeTab, setActiveTab] = useState<string>(FILTER_TABS.FIXED_RATE_EXPIRY);
  const [appData, setAppData] = useState<Array<Application>>([]);
  const [startDate, setStartDate] = useState(dayjs().subtract(30, 'day').toDate());
  const [endDate, setEndDate] = useState(dayjs().toDate());
  const [showCalendar, setCalendarView] = useState(false);

  useEffect(() => {
    services.get(`${process.env.API_DOMAIN}/applications/get`)
      .then((data) => {
        setAppData(data.data);
    });
  }, []);

  return (<div style={{
    // TODO: export to styles
    height: '100%',
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#f1f1f1',
  }}>
    <Card style={{
      margin: '0 auto',
      width: '100%'
    }}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Upcoming Key Dates
      </Typography>
      <AppBar position="static">
        <Toolbar>
          <ButtonGroup variant="outlined" aria-label="Basic button group" style={{
              marginTop: `${SPACING_COMPONENT}px`,
            }}>
              {Object.entries(FILTER_TABS).map((tab: [string, string]) => (<Button color={tab[1] === activeTab ? 'primary' : 'secondary'} onClick={() => { setActiveTab(tab[1])}}>{tab[1]}</Button>))}
          </ButtonGroup>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CalendarIcon />
            <DatePicker
              selected={startDate}
              onChange={(date) => date ? setEndDate(new Date(date)) : null}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            {showCalendar && <DatePicker
              swapRange
              selected={startDate}
              onChange={(dates) => {
                if (dates) {
                  const [start, end] = dates;

                  if (start && end) {
                    setStartDate(start);
                    setEndDate(end);
                  }
                }
              }}
              onBlur={() => {
                setCalendarView(!showCalendar);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              selectsDisabledDaysInRange
              inline
            />}
          </IconButton>
        </Toolbar>
      </AppBar>
    <DataTable
      data={appData}
      filters={{
        activeTab,
        startDate,
        endDate,
      }}
      isLoading={appData.length === 0}
    />
    </Card>
  </div>);
}

export default Applications;

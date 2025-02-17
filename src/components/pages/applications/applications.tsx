import { useEffect, useState } from 'react';

// theme
import { TAB_BUTTONS } from './data';
import { SPACING_COMPONENT } from '../../../styles/theme';

// components
import DataTable from './table';
import { Button, ButtonGroup, Card, Typography } from '@mui/material';

// services
import services from './../../../services/service'

// types/models
import { Application } from '../../../../mock_api_service/model/Application';

interface ApplicationProps {
}

const Applications: React.FC<ApplicationProps> = ({  }) => {
  const [appData, setAppData] = useState<Array<Application>>([]);

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
      <ButtonGroup variant="outlined" aria-label="Basic button group" style={{
        marginTop: `${SPACING_COMPONENT}px`,
      }}>
        {Object.keys(TAB_BUTTONS).map((tab: string) => (<Button>{tab}</Button>))}
    </ButtonGroup>
    <DataTable data={appData} isLoading={appData.length === 0} />
    </Card>
  </div>);
}

export default Applications;

import { useEffect } from 'react';
import { Button, ButtonGroup, Card, Typography } from '@mui/material';

// theme
import { TAB_BUTTONS } from './data';
import { SPACING_COMPONENT } from '../../../styles/theme';
import DataTable from './table';

interface ApplicationProps {
}

const Applications: React.FC<ApplicationProps> = ({  }) => {
  useEffect(() => {
    // TODO: load data
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
    <DataTable />
    </Card>
  </div>);
}

export default Applications;

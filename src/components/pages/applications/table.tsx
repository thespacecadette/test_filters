import * as React from 'react';

// utils
import dayjs from 'dayjs';
import { visuallyHidden } from '@mui/utils';

// components
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { Card, Typography } from '@mui/material';

// types & data
import { Filters, TableData, TableProps } from './types';
import { FILTER_TABS, HEAD_CELLS } from './data';

// pages
import { Application } from '../../../../mock_api_service/model/Application';

const getRows = (data: Array<Application>): Array<TableData> => data.map((application: Application) => ({
    id: application.id,
    clientName: application.client_account.name,
    loanDetails: `${application.lender_reference} | $${application.amount} | ${application.purpose}`,
    keyDate: dayjs(Object.entries(application.attributes.key_dates)[0][1]).format(DATE_FORMAT),
    type: application.type,
    contact: `m: ${application.client_account.primary_applicant_info.mobile} | email: ${application.client_account.primary_applicant_info.email}`,
}))

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | Date },
  b: { [key in Key]: number | string | Date },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function getFilter(data: Array<Application>, filters: Filters) {
    let filteredRecords = [];

    if (filters.activeTab !== FILTER_TABS.ALL) {
      filteredRecords = data.filter((application) => {
        const keyDateLabel = Object.entries(application.attributes.key_dates)[0][0];

        return keyDateLabel === filters.activeTab;
      });

      filteredRecords = filteredRecords.filter((application) => {
        const keyDateString = Object.entries(application.attributes.key_dates)[0][1];
        const keyDate = new Date(keyDateString);
        const validation = filters.startDate && filters.endDate && Object.prototype.toString.call(filters.startDate) && Object.prototype.toString.call(filters.endDate) === "[object Date]" && keyDate > filters.startDate && keyDate < filters.endDate;

        return validation;
      });

      return filteredRecords;
    } else {
      filteredRecords = data;
    }

    return filteredRecords;
};

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableData) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {HEAD_CELLS.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export const DATE_FORMAT = 'MM/DD/YYYY'

export default function EnhancedTable({ data, filters, isLoading  }: TableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TableData>('keyDate');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [rows, setRows] = React.useState<Array<TableData>>([]);

  React.useEffect(() => {
    const filteredData = getFilter(data, filters);
    const d = getRows(filteredData);
    const visibleRows = 
        [...d]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    setRows(visibleRows);
  }, [data.length > 0]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  if (isLoading || rows.length === 0) {
    return (<Card>Loading... </Card>)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {!!filters.startDate && !!filters.endDate && (<p>Results between {dayjs(filters.startDate).format(DATE_FORMAT)} and {dayjs(filters.endDate).format(DATE_FORMAT)}</p>)}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = selected.includes(parseInt(row.id, 10));
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, parseInt(row.id, 10))}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.clientName}</TableCell>
                    <TableCell align="right">{row.loanDetails}</TableCell>
                    <TableCell align="right">{row.keyDate}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.contact}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
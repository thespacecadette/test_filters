import { TableData } from "./types";

export const TAB_BUTTONS = {
    FIXED_RATE_EXPIRY: 'Fixed Rate Expiry',
    AUCTION_DATE: 'Auction Date',
    PREAPPROVAL_EXPIRY: 'Pre-approval Expiry',
    FINANCE_DUE: 'Finance Due',
    EST_SETTLEMENT_DATE: 'Estimated Settlement Date',
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof TableData;
    label: string;
    numeric: boolean;
  }
  
  
export const HEAD_CELLS: readonly HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
      id: 'clientName',
      numeric: false,
      disablePadding: true,
      label: 'Client Name',
    },
    {
      id: 'loanDetails',
      numeric: false,
      disablePadding: false,
      label: 'Loan Details',
    },
    {
      id: 'keyDate',
      numeric: false,
      disablePadding: false,
      label: 'Key Date',
    },
    {
      id: 'type',
      numeric: false,
      disablePadding: false,
      label: 'Type',
    },
    {
      id: 'contact',
      numeric: false,
      disablePadding: false,
      label: 'Contact',
    },
  ];
  
  
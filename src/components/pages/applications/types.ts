import { Application } from "../../../../mock_api_service/model/Application";

export interface TableData {
    id: string;
    clientName: string;
    loanDetails: string;
    keyDate: string;
    type: string;
    contact: string;
}
  
export interface TableProps {
    data: Array<Application>;
    isLoading: boolean;
    activeTab: string;
}


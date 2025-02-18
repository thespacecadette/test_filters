# Tech test for Finsure

1. Install and run `yarn`
2. Run `yarn mock-api` for BE
3. Run `yarn dev` for FE and open `http://localhost:8080`

## NOTES

### For Scenario 1
I couldn't call all records within last 30 days, as there's only 1 by default. If the data had current dates this would have worked. Mock data was from last year. Implementation would have been fast, and functionality would not need to be extended much to cater to this requirement. 

###  For Scenario 4
 - I've made it so it infinitey scrolls after 3 records due to limited data (and time limit on technical test).
 - I would move the filter functionality to the BE. 
 
 There's still a bug where the API service calls the paginated data, but the 
 page isn't rendering the new records. 
 This would have something to do with listening to the updated data and/or
 update the child component accordingly (when data changes)
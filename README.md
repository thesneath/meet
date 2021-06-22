_Feature 2: Show/hide an event's details_

**Scenario 1:** An event element is collapsed by default


        As a user, I should be able to see that the event elements are collapsed by default, so that the event list does not appear too cluttered and information dense.



*   **Given: **user hasn’t opened element
*   **When: **user opens app
*   **Then: **event element is collapsed

**Scenario 2:** User can expand an event to see its details


        As a user, I should be able to expand an event so that more information about a given event is easily visible



*   **Given: **user has not expanded element
*   **When: **user clicks “Show”
*   **Then: **event element expands

**Scenario 3:** User can collapse an event to hide its details


        As a user, I should be able to collapse an event so that I can more easily navigate the page after looking at the details of an event



*   **Given: **user has expanded event element
*   **When: **user clicks “Hide”
*   **Then: **event element collapses

_Feature 3: Specify number of events_

**Scenario 1:** When user hasn’t specified a number, 32 is the default number


        As a user, I should be able to see that the default number of displayed event items is 32 so that I know the maximum amount of event items visible on the page



*   **Given: **user has not specified a number
*   **When: **user opens app
*   **Then: **the default number of events is 32

**Scenario 2:** User can change the number of events they want to see


        As a user, I should be able to change the number of displayed events so that I can modify the display to fit my needs



*   **Given: **user is on the event list
*   **When: **user sets a new number of events 
*   **Then: **the number of possible displayed events matches the user defined number

_Feature 4: Use the app when offline_

**Scenario 1:** Show cached data when there’s no internet connection


        As a user, I should be able to see cached data when the app is used offline so that I can go back to previously viewed information, even without a connection. 



*   **Given: **user has used app before
*   **When: **user opens app with no internet connection
*   **Then: **app displays cached data

**Scenario 2:** Show error when user changes the settings (city, time range)


        As a user, I should be able to see an error when changing settings offline so that it is clear that a connection is necessary for that part of the app. 



*   **Given: **app is in use offline
*   **When: **user changes app settings 
*   **Then: **app shows an error 

    _Feature 5: Data visualization_


**Scenario 1:** Show a chart with the number of upcoming events in each city


        As a user, I should see a chart with the number of upcoming events in each city so that I can see how many events will be near me. 



*   **Given: **user is logged in
*   **When: **event list is displayed
*   **Then: **a chart with upcoming events is displayed
Feature: Specify number of events

  Scenario: When user hasn’t specified a number, 20 is the default number
    Given user has not specified a number
    When user opens the app
    Then the default number of events is 20

  Scenario: User can change the number of events they want to see
    Given app is open
    When user specifies a number of events
    Then the number of events in the list matches the user defined number

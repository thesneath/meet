Feature: Show/hide an event's details

  Scenario: An event element is collapsed by default
    Given user has not opened element
    When user opens app
    Then event element is collapsed

  Scenario: User can expand an event to see its details
    Given main page is open
    And user has not expanded an element
    When user clicks show details
    Then event element expands

  Scenario: User can collapse an event to hide its details
    Given user has expanded event element
    When user clicks hide
    Then event element collapses

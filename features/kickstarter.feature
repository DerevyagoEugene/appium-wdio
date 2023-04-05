@KickStarter
Feature: KickStarter App

  @test
  Scenario: Test KickStarter

    Given I'm on the main page
    
     When Swipe to Popular tab
     Then Popular tab is opened

     When I remember info of the second product
     Then Product is found in search

     When I open remembered product
     Then Correct product is opened
      And The number of days is the same

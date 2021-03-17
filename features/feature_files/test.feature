Feature: Testing Purpose

    Feature Description

    Background: Load the PSR Page to execute the tests
     Given I am on "PSR_Page" by using the data "admin_login"    
    

    Scenario: List PSR from source 'AS'
    When I choose the value "AS" from dropdown "psr_page_elements/source_dropdown"
    Then I want to verify that list "psr_page_elements/source_result_list" contains only the value "AS"

    Scenario: List PSR from Hospital 'COCID'
    When I choose the value "COCID" from dropdown "psr_page_elements/hospital_dropdown"
    Then I want to verify that list "psr_page_elements/hospital_result_list" contains only the value "COCID"

    
Feature: Testing Purpose

    Feature Description

Background: Load the PSR Page to execute the tests
    Given I want to fire API to "create_user_blaze" using "admin_user"
    Given I am on "Home_Page" by using the data "admin_login"    
    

    Scenario: Add ASUS Full HD Monitor to Cart
    When I click on a webelement "monitors_page_elements/monitors_link_button"
    And I want to store the value of the field "monitors_page_elements/ASUS_Full_HD_Price_Text" into a variable "ASUS_PRICE"
    And I click on a webelement "monitors_page_elements/ASUS_Full_HD_product_link"
    And I click on a webelement "monitors_page_elements/ASUS_Full_HD_Add_To_Cart_Button"
    And I click on a webelement "monitors_page_elements/CART_Menu_Link"
    Then I want to verify the value of element "monitors_page_elements/ASUS_Price_In_Cart" is same as the stored value "ASUS_PRICE"
    # Then I want to verify that list "psr_page_elements/source_result_list" contains only the value "AS"

    

    

    
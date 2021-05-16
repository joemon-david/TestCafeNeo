const {Given,When,Then} = require ('@cucumber/cucumber');
const project_data = require('../data_files/project.json');
const utils = require('../support/commonutils');
var log4js = require("../support/Logger")
var logger = log4js.getLogger('UI Step Definition')
const dataStore = require("../state_definitions/suite_data/DataStore")




Given('I launch the {string} Application', async function (application_name) {

    var url = project_data.URL_DATA.MH_Cure;
    logger.debug('URL ',url)
    await testController.navigateTo(url);
   });

   When('I enter the text {string} in the web element {string}', async function (text,identifier) {
       let extracted_identifier = utils.extract_element_locators(identifier);
       let sel = utils.create_selector(extracted_identifier);
   await testController.typeText(sel,text,{paste:true,replace:true});
  });  
  When('I click on a webelement {string}', async function (identifier) {
    let extracted_identifier = utils.extract_element_locators(identifier);
    let sel = utils.create_selector(extracted_identifier);    
    await testController.click(sel).setNativeDialogHandler(() => true);
   }); 

   When('I choose the value {string} from dropdown {string}',async function(value,identifier){
    let extracted_identifier = utils.extract_element_locators(identifier);
    let dropdown = utils.create_selector(extracted_identifier);      
       const options = dropdown.find('option');
       await testController.click(dropdown)
       .click(options.withText(value))
       .expect(dropdown.value).eql(value);
       
   });

   Then('I want to verify that list {string} contains only the value {string}',async function (identifier,value) {

    let extracted_identifier = utils.extract_element_locators(identifier);
    let element_list = utils.create_selector(extracted_identifier);    
    // const element_list = Selector(element);
    let count = await element_list.count;
    for(let i =0; i<count; i++)
    {
        await testController.expect(element_list.nth(i).innerText).eql(value);
    }
   });

   When('I want to store the value of the field {string} into a variable {string}', async function(identifier,key){
    let extracted_identifier = utils.extract_element_locators(identifier);
    let field = utils.create_selector(extracted_identifier); 
    let value = await field.textContent
    dataStore.setValue(key,value)
    logger.debug('Successfully set the detail to Data Store -> ',dataStore.getMap())

   });

   Then('I want to verify the value of element {string} is same as the stored value {string}', async function(identifier,key){
    let extracted_identifier = utils.extract_element_locators(identifier);
    let field = utils.create_selector(extracted_identifier); 
    let value = await field.textContent
    await testController.expect(dataStore.getValue(key)).contains(value,'Verify the '+identifier+' contains the value '+dataStore.getValue(key))
   

   });



   

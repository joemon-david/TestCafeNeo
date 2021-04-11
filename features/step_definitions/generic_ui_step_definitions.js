const {Given,When,Then} = require ('@cucumber/cucumber');
const project_data = require('../data_files/project.json');
const utils = require('../support/commonutils');




Given('I launch the {string} Application', async function (application_name) {

    var url = project_data.URL_DATA.MH_Cure;
    console.log('URL ',url)
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
    await testController.click(sel);
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



   

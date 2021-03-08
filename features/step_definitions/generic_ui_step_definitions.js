const {Given,When,Then} = require ('@cucumber/cucumber');
const { Selector } = require('../support/selector');
const project_data = require('../data_files/project.json');



Given('I launch the {string} Application', async function (application_name) {

    var url = project_data.URL_DATA.MH_Cure;
    console.log('URL ',url)
    await testController.navigateTo(url);
   });

   When('I enter the text {string} in the web element {string}', async function (text,identifier) {
   await testController.typeText(identifier,text,{paste:true,replace:true});
  });  
  When('I click on a webelement {string}', async function (identifier) {
    await testController.click(identifier);
   }); 

   When('I choose the value {string} from dropdown {string}',async function(value,element){
       const dropdown = Selector(element);
       const options = dropdown.find('option');
       await testController.click(dropdown)
       .click(options.withText(value))
       .expect(dropdown.value).eql(value);
       
   });

   Then('I want to verify that list {string} contains only the value {string}',async function (element,value) {

    const element_list = Selector(element);
    let count = await element_list.count;
    for(let i =0; i<count; i++)
    {
        await testController.expect(element_list.nth(i).innerText).eql(value);
    }
   });



   

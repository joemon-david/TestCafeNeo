const {Selector} = require('testcafe');
const {extract_variable_name,extract_element_locators} = require('./commonutils');

function select(selector){
    let extracted_selector = extract_variable_name(selector).toString();
    let final_selector;

    
    if(extracted_selector.includes('/'))
    {
        let selector_tokens = extracted_selector.split('/');
        final_selector = extract_element_locators(selector_tokens[0],selector_tokens[1]);         

    }else
    {
        final_selector =extracted_selector;
    }
    
    return Selector(final_selector).with({boundTestRun: testController});
}



exports.Selector = select;
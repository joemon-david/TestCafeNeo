const path = require('path');
const extract_variable_name = text => {
	let extracted
	if (text!== undefined && text.startsWith('${')) {
		extracted = text.replace('${', '').replace('}', '')
	} else {
		extracted = text
	}

	return extracted
};

const extract_element_locators = (locator_file_name,locator_name) => {

    let file_path = path.resolve('features','element_locators',locator_file_name);
    const file_data = require(file_path);
    return file_data[locator_name];
    
};

module.exports={
    extract_variable_name,
    extract_element_locators
};
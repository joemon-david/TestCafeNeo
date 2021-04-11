const path = require('path');
const typeCheck = require('type-check').typeCheck;
const base64 = require('base-64');
const utf8= require('utf8');
const {Selector} = require('testcafe');


const extract_variable_name = text => {
	let extracted
	if (text!== undefined && text.startsWith('${')) {
		extracted = text.replace('${', '').replace('}', '')
	} else {
		extracted = text
	}

	return extracted
};


const extract_element_locators = (locator_data) => {

    let loc_array = locator_data.toString().split('/')
    let file_path = path.resolve('features','element_locators',loc_array[0]+'.json');
    const file_data = require(file_path);
    return file_data[loc_array[1]];
    
};


const extract_data_value = (data_object,data_variable_name)=> {

	let data = data_variable_name;
	if(data_object[data_variable_name] !== undefined)
	{
		data = data_object[data_variable_name];
		if(checkDataType(data)=='Object')
		{
			const keys = Object.keys(data);
			for(const key of keys)
			{
				if(data[key] !== undefined && data[key].startsWith('base64'))
				{
					let extracted = data[key].replace('base64(', '').replace(')', '')
					let base64_value = encodeBase64(extracted);
					data[key] = base64_value;
				}
			}
		}
	}

	return data;

};

const checkDataType = (data) => {
    let type = undefined;

    const data_types = ['Number','String','Array','Object']; 
    for(let i=0;i<data_types.length;i++)
    {
        let checkType = data_types[i];
        if(typeCheck(checkType,data))
        {
            type = checkType;
            break;
        }
    }   

    return type;
}

const encodeBase64 = data =>{
	let bytes = utf8.encode(data);
	let encoded = base64.encode(bytes);
	return encoded;
}
const create_selector =  locator => {
	let selector;
    if(locator===undefined)
    return '';
	let element_locator = locator.toString()
	if (element_locator.includes('.withText(')) {
		let locators = locator.split('.withText(')
		let text = locators[1].replace(')', '')
		selector = Selector(locators[0]).withText(text).with({ boundTestRun: testController });
		console.log(locators[0], text)
	} else {
		selector = Selector(locator).with({ boundTestRun: testController });
	}

	return selector
};

module.exports={
    extract_variable_name,
    extract_element_locators,
	extract_data_value,
	create_selector
};
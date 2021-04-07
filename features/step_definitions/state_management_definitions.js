const { Given, When, Then } = require('@cucumber/cucumber')
const {ClientFunction} = require('testcafe');
const path = require('path');

const cwd = process.cwd();
const template_path =cwd +'/features/state_definitions/templates';
const locators_path = cwd +'/features/state_definitions/locators';
const data_path = cwd +'/features/state_definitions/data';
// const project_template = require('../state_definitions/generic_state_template.json')
// const project_locator = require('../state_definitions/generic_state_locator.json')
// const project_state_data = require('../state_definitions/generic_state_data.json')
const project_data = require('../data_files/project.json')
var URL = project_data.URL_DATA.MH_Cure
const { Selector } = require('testcafe')




Given(
	'I am on {string} by using the data {string}',
	async function (state, data) {
		const ui_template_data = require(path.join(template_path,state+'.json'));
		const global_template_data = require(path.join(template_path,'Global_State.json'));
		const ui_locator_object = require(path.join(locators_path,state+'.json'));
		const global_state_locator = require(path.join(locators_path,'Global_State.json'));
		const data_object = require(path.join(data_path,data+'.json'));

		
		console.log('Template Data :', ui_template_data)

		if (ui_template_data.navigate_to_url !== undefined) {
			URL = ui_template_data.navigate_to_url;
			await testController.navigateTo(URL)
		} else {
			console.log(` ${state} state doesnot have a navigate_to_url step !!! `)
		}
		// Checks whether this state have any global state included
		if (ui_template_data.global_state !== undefined) {
			// At present we will support ony a single global state.
			const global_state_name = ui_template_data.global_state
			const global_state_object =
			global_template_data[global_state_name].steps
			const global_locator_object =
			global_state_locator[global_state_name]			
			await execute_state_steps(
				global_state_object,
				global_locator_object,
				data_object
			);
		}
		if (ui_template_data.steps !== undefined) {					
			const state_step_object = ui_template_data.steps
			console.log(
				`state_step_object:${state_step_object}\n locator_object:${ui_locator_object} \n data_object:${data_object}`
			)
			await execute_state_steps(
				state_step_object,
				ui_locator_object,
				data_object
			)
		} else {
			console.log('!!! No steps to execute in the state ', state)
		}
	}
)

const execute_state_steps = async (
	state_step_object,
	locator_object,
	data_object
) => {
	for (const step of state_step_object) {
		console.log('Executing the step ', step)
		const loc_variable = extract_variable_name(step.element_selector)
		let locator = locator_object[loc_variable]
		console.log(step.element_selector,' -> ',locator)
		locator = create_selector(locator)
		let test_data = ''
		if (step.data !== undefined) {
			const data_variable = extract_variable_name(step.data)
			test_data = data_object[data_variable]
		}
		console.log('Using the Data -> ', test_data)

		switch (step.action) {
			case 'type_text':
				await testController.typeText(locator, test_data, {
					paste: true,
					replace: true,
				})
				break;
			case 'click':
				await testController.click(locator);
				break;
			case 'hover':
				await testController.hover(locator);
				break;
			case 'press_enter':
				await testController.pressKey('enter');                
				break;
			case 'verify_text':
				await testController.expect(locator.innerText).contains(test_data,`verify the text ${test_data} contains in the page`)
				break;
			case 'refresh_page':
				// await testController.eval(() => location.reload(true));
				const reloadPage = ClientFunction(() => location.reload(true), { boundTestRun: testController });
				await reloadPage();
				break;
		}
	}
    
};

const extract_variable_name = text => {
	let extracted
	if (text!== undefined && text.startsWith('${')) {
		extracted = text.replace('${', '').replace('}', '')
	} else {
		extracted = text
	}

	return extracted
};

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

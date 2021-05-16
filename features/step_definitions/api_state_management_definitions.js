const {Given,When,Then} = require ('@cucumber/cucumber');
const { Selector } = require('../support/selector');
const api = require("../api_support/axios_helper");
const path = require('path');
const cwd = process.cwd();
const utils = require("../support/commonutils")
const dataStore = require("../state_definitions/suite_data/DataStore")


const api_template_path =cwd +'/features/state_definitions/api_templates';
const api_data_path =cwd +'/features/state_definitions/api_data';

Given('I want to fire API to {string} using {string}',async function (template,data){
    const api_template_data = require(path.join(api_template_path,template+'.json'));
    const api_data = require(path.join(api_data_path,data+'.json'));
    let config_data = createAPIRequestWithData(api_template_data,api_data);
    let response = await api.sendPostRequest(config_data);
    // console.log(response);
    dataStore.setValue(template+'_'+data+'_response',response)


});

const createAPIRequestWithData = (template_object,data_object) => {


    let url_var = utils.extract_variable_name(template_object.config_data.url);
    let method_var = utils.extract_variable_name(template_object.config_data.method);
    let headers_var =  utils.extract_variable_name(template_object.config_data.headers);
    let data_var = utils.extract_variable_name(template_object.config_data.data);

    let url= utils.extract_data_value(data_object,url_var);
    let method = utils.extract_data_value(data_object,method_var);
    let headers = utils.extract_data_value(data_object,headers_var);
    let data = utils.extract_data_value(data_object,data_var);



    var config_data = {
        "url":url,
        "method":method,
        "headers":headers,
        "data":data

    };
    // console.log(config_data);

    return config_data;

};
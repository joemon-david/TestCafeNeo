const axios = require('axios').default;



    const sendGetRequest = async function(){

    }

    // const sendPostRequest = async function(config)
    // {
    //   axios(config)
    //    .then(function (response){
    //     console.log(JSON.stringify(response.data));
    //    }).catch(function (error) {
    //     console.log(error);
    //   });
    // }

    const sendPostRequest = async function (config)
    {
      let resp;
      await axios(config)
       .then(function (response){
        console.log(response.data);
        resp = response.config
        
       }).catch(function (error) {
        console.log(error);
        resp = error;
      });

      return resp;
    }



module.exports = {sendGetRequest,
  sendPostRequest};
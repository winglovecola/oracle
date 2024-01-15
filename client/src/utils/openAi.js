//chatGPT
const keyObj = {
  k1: 'sk-cw4aPposJn4PhyQ3IZWc',
  k2: 'T3BlbkFJ0x7OpsC5KOzCnj8SA4jC',
};

async function chatGptApi(search) {
  let chatGptApiUrl = 'https://api.openai.com/v1/chat/completions';
  let cak = keyObj.k1 + keyObj.k2;
  let fetchData = {
    model: 'gpt-3.5-turbo',
    messages: [{
      "role": "user",
      "content": search
    }],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  let fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + cak,
    },
    body: JSON.stringify(fetchData),
  };
  //loading icon
  /*
    let loadText = '';
  if ($(elementID)) {
    loadText = '';
    $(elementID).html ('<div id="loading-div"><img id="loading-icon" src="./assets/images/loading2.gif">' + loadText + '</div>');
  } */
  let chatGptRes = await fetch(chatGptApiUrl, fetchOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log("data: ", data);
      //loading data into page
      //textTrimed = data.choices[0].message.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
      return data;
    });
  return chatGptRes;
}
export default chatGptApi;

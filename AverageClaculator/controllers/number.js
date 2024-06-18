const axios = require('axios');

const Numbers = async (req, res) => {
  let currentWindow = [];
  let previousWindow = [];
  const windowSize = 10;
  let bearerToken = '';

  const data = {
    companyName: process.env.companyName,
    clientID: process.env.clientID,
    clientSecret:  process.env.clientSecret,
    ownerName:  process.env.ownerName,
    ownerEmail:  process.env.ownerEmail,
    rollNo:  process.env.rollNo
  };
  const baseURL=process.eventNames.baseURL;
  try {
    //  to fetch the Bearer token
    const authResponse = await axios.post(`http://20.244.56.144/test/${auth}`, data);
    bearerToken = authResponse.data.access_token;
  
    const { numberid } = req.params;
    let endpoint;

    if (numberid === 'e') {
      endpoint = `${baseURL}/even`;
    } else if (numberid === 'p') {
      endpoint = `${baseURL}/primes`;
    } else if (numberid === 'f') {
      endpoint = `${baseURL}/fibo`;
    }else if (numberid === 'r') {
        endpoint = `${baseURL}/rand`;
      }  
    else {
      return res.status(400).json({ msg: 'Invalid numberid' });
    }

    const result = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
    const number = result.data.numbers;
  
    currentWindow.push(number);
    if (currentWindow.length > windowSize) {
      const movedValue = currentWindow.shift();
      previousWindow.push(movedValue);

      if (previousWindow.length > windowSize) {
        previousWindow.shift();
      }
    }

    const calculateAverage = (array) => {
      if (array.length === 0) return 0;
      const sum = array.reduce((a, b) => a + b, 0);
      return sum / array.length;
    };

    const avg = calculateAverage(number);
    const previousAverage = calculateAverage(previousWindow);

    res.status(200).json({
      number,
      windowPrevState: previousWindow,
      windowCurrentState: currentWindow,
      avg
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = Numbers;

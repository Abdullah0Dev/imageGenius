require('dotenv').config(); // should be at the very top!!!
const Replicate  = require("replicate");
const replicate = new Replicate();


const generateImageInitialize = async (props = {}) => {
    // get the props and the optional once....
    const input = {} // -> prompt + width, and hight :
    input.prompt = props.prompt; // -> required
    input.width = props.width; // required
    input.height = props.height; // required
    input.num_outputs = props.num_outputs || 1 ; // optional => default is 1
    try {
        const output = await replicate.run("bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f", { input });
       console.log(output)
    //    return the data
    return output;
    } catch (error) {
        console.log(error);
    }
}

const generateImageController = async (req, res) => {
   try {
    // initialize the body data
    const {prompt, width, height, num_outputs} = req.body;
    // call the initializer function
    const response = await generateImageInitialize({prompt, width, height, num_outputs});
     res.status(200).json(response);        
   } catch (error) {
    // handle error
    res.status(500).json({ error: 'An error occurred while generating the image.' });

   }
}

module.exports = { generateImageController }
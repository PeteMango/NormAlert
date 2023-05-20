require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world, from olympihacks");
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// {
//     "message": "ive done all you told me to do, how do i calm myself down?",
//     "context": "[{role: \"user\" , message: \"i need help, my leg is amputated\"}, {role: \"openAI\", message: \"If you or someone else is experiencing an amputated limb, here's what you can do:\n\n1. Call emergency services immediately or ask someone else to call for you.\n\n2. If possible, elevate the affected limb above the level of the heart to help reduce bleeding.\n\n3. Apply pressure to the wound with a clean, dry cloth or sterile dressing.\n\n4. If you have a tourniquet, apply it immediately between the wound and the heart. Make sure to only use a tourniquet as a last resort if you can't stop the bleeding with direct pressure.\n\n5. Keep the person or yourself still, calm, and quiet while waiting for emergency services to arrive.\n\nRemember, time is of the essence in amputated limb emergencies. Seek medical care immediately.\"}]"
//   }
app.post("/first-aid", async (req, res) => {
    try {
        const { message, context } = req.body;
        // console.log(message);
        // console.log(typeof context);
        context.push({"role": "user", "message": message});
        // console.log(context);
        // console.log(typeof JSON.parse(context));
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "you are a bot that provides the user essential first aid advice for a emergency medical response application.",
                },
                { role: "user", content: message },
                { role: "assistant", content: toString(context) },
            ],
        });
        const response = completion.data.choices[0].message.content;
        context.push({"role": "openAI", "message": response});
        // console.log(context);
        // console.log(response);
        const add = {
            ...completion.data.choices[0],
            context: context, // Adding the `context` field to the `add` object
        };
        console.log(add);
        res.status(200).json(add);
        // res.status(200).json(add);
        // res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

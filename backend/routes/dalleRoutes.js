import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";  

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({  
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        });

        const image = aiResponse.data[0].b64_json; 

        res.status(200).json({
            success: true,
            photo: image
        });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;

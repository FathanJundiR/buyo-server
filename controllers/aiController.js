const { GoogleGenerativeAI } = require("@google/generative-ai");
class AiController {
  static async askAi(req, res, next) {
    try {
      const { priority, price, purpose } = req.body;
      const gemini = new GoogleGenerativeAI(process.env.GEMINI_KEY);
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Give me only one name of the best laptop under Rp. ${price} for ${purpose}, priority is the ${priority} and have windows operating system, from any brand`;

      const result = await model.generateContent(prompt);
      const response = result.response;

      const text = response.text();

      res.status(200).json(text);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AiController;

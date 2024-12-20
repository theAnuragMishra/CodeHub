const AsyncErrorHandler = require("../../ErrorHandlers/async_error_handler");
const Feedback = require("../../model/feedbackModel");
const Joi = require("joi");

const UserFeedBack = AsyncErrorHandler(async (req, res, next) => {
    const { name, email, message } = req.body;
    
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        message: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid input",
            error: error.details[0].message,
        });
    }

    try {
        const newFeedback = await Feedback.create({
            name, email, message
        })

        await newFeedback.save();

        //Success Response
        res.status(200).json({ success: true, message: "Feedback submitted successfully" });
    } catch (error) {
        next(error);
    }

});

module.exports = UserFeedBack;
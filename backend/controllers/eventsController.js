import { Event } from '../models/eventsSchema.js';

// Create a new event
export const createEvent = async (req, res, next) => {
    console.log(req.body); // Debugging log to check request body

    const { name } = req.body; // Ensure we use "name" as per schema

    try {
        if (!name) {
            return res.status(400).json({ error: "Event name is required!" });
        }

        // Creating a new event
        const newEvent = await Event.create({ name });

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event: newEvent
        });
    } catch (err) {
        next(err);
    }
};

// Get all events
export const getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find();

        res.status(200).json({
            success: true,
            events,
        });
    } catch (err) {
        next(err);
    }
};

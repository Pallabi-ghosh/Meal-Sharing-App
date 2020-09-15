const express = require("express");
const router = express.Router();
const knex = require("../database");


// api/reservations/	GET	Returns all review	GET api/reservations/

router.get("/", async(request, response) => {
    try {
        // knex syntax for selecting things. Look up the documentation for knex for further info
        const numberOfGuests = await knex("Reservation").select("number_of_guests");
        response.json(numberOfGuests);
    } catch (error) {
        throw error;
    }
});


// api/reservations/	POST	Adds a new reservation	POST api/reservations/

router.post("/", async(request, response) => {
    createReservation({
            body: request.body,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const createReservation = async({ body }) => {
    const { number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email } = body;
    return await knex("Reservation").insert({
        number_of_guests: number_of_guests,
        meal_id: meal_id,
        created_date: created_date,
        contact_phonenumber: contact_phonenumber,
        contact_name: contact_name,
        contact_email: contact_email,
    });
};



// api/reservations/{id}	GET	Returns reservation by id	GET api/reservations/2

router.get("/:id", async(request, response) => {
    getReservation({
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const getReservation = async({ id }) => {
    const contact = await knex.from("Reservation").select("*").where({
        id: id,
    });
    if (contact.length === 0) {
        throw new HttpError("Bad request", `Contact not found: ID ${id}!`, 404);
    }
};



// api/reservations/{id}	PUT	Updates the reservation by id	PUT api/reservations/2

router.put("/:id", async(request, response) => {
    updateReservation({
            body: request.body,
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});


const updateReservation = async({ body, id }) => {
    const { number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email } = body;
    const contact = await knex.from("Reservation").select("*").where({
        id: id,
    });
    if (contact.length === 0) {
        throw new HttpError("Bad request", `Contact not found: ID ${id}!`, 404);
    }
    const queryDto = {
        number_of_guests: number_of_guests,
        meal_id: meal_id,
        created_date: created_date,
        contact_phonenumber: contact_phonenumber,
        contact_name: contact_name,
        contact_email: contact_email,
    };
    if (Object.keys(queryDto).length !== 0) {
        return await knex("Reservation")
            .where({
                id: id,
            })
            .update(queryDto);
    } else return "Nothing updated!";
};



// api/reservations/{id}	DELETE	Deletes the reservation by id	DELETE api/reservations/2

router.delete("/:id", async(request, response) => {
    deleteReservation({
            deleteId: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});


const deleteReservation = async({ deleteId }) => {
    try {
        if (!deleteId) {
            throw new HttpError("Bad request", "Id not found", 400);
        }
        return knex("Reservation")
            .where({
                id: deleteId,
            })
            .del();
    } catch (error) {
        throw (error);
    }
};

module.exports = router;
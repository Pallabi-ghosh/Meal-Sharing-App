const express = require("express");
const router = express.Router();
const knex = require("../database");




// api/meals/	GET	Returns all meals	GET api/meals/
console.log("meals hit");

router.get("/", async(request, response) => {
    try {
        const { maxPrice, availableReservations, title, createdAfter, limit, } = request.query;
        const onlyMeals = await knex("meal").select("*");
        console.log(onlyMeals);
        // Get meals that has a price smaller than maxPrice
        if (maxPrice) {

            try {
                const mealsLessThanMaxPrice = await knex("meal")
                    .where("price", "<", maxPrice)
                    .then((data) => {
                        response.json(data);
                    });
            } catch (error) {
                throw error;
            }
            // Get meals that still has available reservations
        } else if (availableReservations === "true") {

            try {
                const mealsFromDb = await knex("meal").select("*")
                    .sum({ max_reservations: "reservation.number_of_guests" })
                    .groupBy("meal.id", "created_date")
                    .having("max_reservations", "<", SUM("number_of_guests"))
                    .then((data) => {
                        if (data.length === 0) {
                            response.send("sorry no reservations available");
                        } else response.json(data);
                    });
            } catch (error) {
                throw error;
            }
            // Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde
        } else if (title) {

            try {
                const mealsMatchingTitlte = await knex("meal")
                    .where("title", "like", "%" + title + "%")
                    .then((data) => {
                        response.json(data);
                    });
            } catch (error) {
                throw error;
            }
            // Get meals that has been created after the date
        } else if (createdAfter) {

            try {
                const CreatedAfter = await knex("meal")
                    .where("created_date", ">", createdAfter)
                    .then((mealsCreatedAfter) => {
                        response.json(mealsCreatedAfter);
                    });
            } catch (error) {
                throw error;
            }
            // Only specific number of meals
        } else if (limit) {

            try {
                const mealsData = await knex("meal")
                    .where("limit", ">", limit)
                    .then((mealsLimit) => {
                        response.json(mealsLimit);
                    });
            } catch (error) {
                throw error;
            }
        } else if (Object.keys(request.query).length === 0) {

            response.json(onlyMeals);
        }
    } catch (error) {
        console.log(error);
        return "something went wrong, try again";
    }
});



// api/meals/	POST	Adds a new meal	POST api/meals/

router.post("/", async(request, response) => {
    createMeal({
            body: request.body,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const createMeal = async({ body }) => {
    const { id, title, description, location, when, max_reservations, price, created_date } = body;
    return await knex("Meal").insert({
        id: id,
        title: title,
        location: location,
        description: description,
        when: when,
        max_reservations: max_reservations,
        price: price,
        created_date: created_date,
    });
};

// api/meals/{id}	GET	Returns meal by id	GET api/meals/2

router.get("/:id", async(request, response) => {
    console.log("11")
    getMeal({
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const getMeal = async({ id }) => {
    const contact = await knex.from("Meal").select("*").where({
        id: id,
    });
    if (contact.length === 0) {
        throw new HttpError("Bad request", `Contact not found: ID ${id}!`, 404);
    }
};



// api/meals/{id}	PUT	Updates the meal by id	PUT api/meals/2

router.put("/:id", async(request, response) => {
    updateMeal({
            body: request.body,
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});


const updateMeal = async({ body, id }) => {
    const { title, description, location, when, max_reservations, price, created_date } = body;
    const contact = await knex.from("Meal").select("*").where({
        id: id,
    });
    if (contact.length === 0) {
        throw new HttpError("Bad request", `Contact not found: ID ${id}!`, 404);
    }
    const queryDto = {
        title: title,
        location: location,
        description: description,
        when: when,
        max_reservations: max_reservations,
        price: price,
        created_date: created_date,
    };
    if (Object.keys(queryDto).length !== 0) {
        return await knex("Meal")
            .where({
                id: id,
            })
            .update(queryDto);
    } else return "Nothing updated!";
};



// api/meals/{id}	DELETE	Deletes the meal by id	DELETE meals/2

router.delete("/:id", async(request, response) => {
    deleteMeal({
            deleteId: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});


const deleteMeal = async({ deleteId }) => {
    try {
        if (!deleteId) {
            throw new HttpError("Bad request", "Id not found", 400);
        }
        return knex("Meal")
            .where({
                id: deleteId,
            })
            .del();
    } catch (error) {
        throw (error);
    }
};



module.exports = router;
const express = require("express");
const router = express.Router();
const knex = require("../database");


// api/review/	GET	Returns all review	GET api/review/

router.get("/", async(request, response) => {
    try {
        // knex syntax for selecting things. Look up the documentation for knex for further info
        const reviewTitles = await knex("Review").select("title");
        response.json(reviewTitles);
    } catch (error) {
        throw error;
    }
});

// api/review/	POST	Adds a new meal	POST api/review/

router.post("/", async(request, response) => {
    createReview({
            body: request.body,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const createReview = async({ body }) => {
    const { title, description, meal_id, stars, created_date } = body;
    return await knex("Review").insert({
        title: title,
        description: description,
        meal_id: meal_id,
        stars: stars,
        created_date: created_date,
    });
};

// api/review/{id}	GET	Returns review by id	GET api/review/2

router.get("/:id", async(request, response) => {
    getReview({
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});

const getReview = async({ id }) => {
    const contact = await knex.from("Review").select("*").where({
        id: id,
    });
    if (contact.length === 0) {
        throw new HttpError("Bad request", `Contact not found: ID ${id}!`, 404);
    }
};



// api/review/{id}	PUT	Updates the review by id	PUT api/review/2

router.put("/:id", async(request, response) => {
    updateReview({
            body: request.body,
            id: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});


const updateReview = async({ body, id }) => {
    const { title, description, meal_id, stars, created_date } = body;
    const contact = await knex.from("Review").select("*").where({
        id: id,
    });
    if (contact.length === 0) {
        throw new HttpError("Bad request", `Contact not found: ID ${id}!`, 404);
    }
    const queryDto = {
        title: title,
        description: description,
        meal_id: meal_id,
        stars: stars,
        created_date: created_date,
    };
    if (Object.keys(queryDto).length !== 0) {
        return await knex("Review")
            .where({
                id: id,
            })
            .update(queryDto);
    } else return "Nothing updated!";
};



// api/review/{id}	DELETE	Deletes the review by id	DELETE review/2

router.delete("/:id", async(request, response) => {
    deleteReview({
            deleteId: request.params.id,
        })
        .then((result) => response.json(result))
        .catch((error) => {
            response.status(400).send("Bad request").end();
            console.log(error);
        });
});


const deleteReview = async({ deleteId }) => {
    try {
        if (!deleteId) {
            throw new HttpError("Bad request", "Id not found", 400);
        }
        return knex("Review")
            .where({
                id: deleteId,
            })
            .del();
    } catch (error) {
        console.log(error);
        return "something went wrong, try again";
    }
};

module.exports = router;
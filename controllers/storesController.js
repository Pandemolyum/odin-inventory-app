import {
    getAllStores,
    getStoreByID,
    insertStore,
    updateStore,
    deleteStore,
} from "../db/queries.js";

// VALIDATION
import { body, validationResult, matchedData } from "express-validator";

const validateStore = [
    body("store_name")
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Store name must be between 1 and 255 characters"),
    body("store_brand")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 1, max: 127 })
        .withMessage("Brand must be between 1 and 127 characters."),
    body("address")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage("Store name must be between 1 and 255 characters"),
    body("city")
        .optional({ checkFalsy: true })
        .trim()
        .isAlpha("en-US", { ignore: " " })
        .withMessage("City must only contain letters and spaces.")
        .isLength({ min: 1, max: 100 })
        .withMessage("City must be between 1 and 100 characters"),
    body("country")
        .optional({ checkFalsy: true })
        .trim()
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Country must only contain letters and spaces.")
        .isLength({ min: 1, max: 100 })
        .withMessage("Country must be between 1 and 100 characters"),
];

function validateInput(req, res, view) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render(view, {
            errors: errors.array(),
        });
    }

    return matchedData(req);
}

// FUNCTIONS
async function renderStores(req, res) {
    const stores = await getAllStores();

    res.render("stores.ejs", { stores: stores });
}

async function getNewStoreForm(req, res) {
    res.render("storeForm.ejs");
}

const createStore = [
    validateStore,
    async (req, res) => {
        const formData = validateInput(req, res, "storeForm.ejs");

        if (formData) {
            await insertStore(
                formData.store_name,
                formData.store_brand,
                formData.address,
                formData.city,
                formData.country,
            );
            res.redirect("/stores");
        }
    },
];

async function getStoreForm(req, res) {
    const store = await getStoreByID(req.params.id);
    res.render("storeForm.ejs", { store: store });
}

const editStore = [
    validateStore,
    async (req, res) => {
        const formData = validateInput(req, res, "storeForm.ejs");

        if (formData) {
            await updateStore(
                formData.store_name,
                formData.store_brand,
                formData.address,
                formData.city,
                formData.country,
                req.params.id,
            );
            res.redirect("/stores");
        }
    },
];

async function removeStore(req, res) {
    await deleteStore(req.params.id);
    res.redirect("/stores");
}

export {
    renderStores,
    getNewStoreForm,
    createStore,
    getStoreForm,
    editStore,
    removeStore,
};

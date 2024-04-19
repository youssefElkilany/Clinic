const joi = require('joi');
const  { generalFields } = require ('../../middelware/validation.js')

const registerSlot = {
    body: joi.object().required().keys({
        keys:joi.number().required(),
    }),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({
        Authorization:joi.string().required()
    })
}

const updateReservation = {
    body: joi.object().required().keys({
        keys:joi.number().required(),
    }),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({
        Authorization:joi.string().required()
    })
}

const cancelReservation = {
    body: joi.object().required().keys({
        keys:joi.number().required(),
    }),
    params: joi.object().required().keys({}),
    query: joi.object().required().keys({
        Authorization:joi.string().required()
    })
}

module.exports = {registerSlot,updateReservation,cancelReservation}

// module.exports = router
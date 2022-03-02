const userGet = (req, res) => {
    res.json({
        msg: "GET API - CONTROLLER"
    })
}

const userPost = (req, res) => {
    res.json({
        msg: "POST API - - CONTROLLER"
    })
}

const userPut = (req, res) => {
    res.json({
        msg: "PUT API - - CONTROLLER"
    })
}

const userPatch = (req, res) => {
    res.json({
        msg: "PATCH API - - CONTROLLER"
    })
}

const userDelete = (req, res) => {
    res.json({
        msg: "DELETE API - - CONTROLLER"
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}
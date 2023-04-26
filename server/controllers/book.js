class Controller {
    static async uploadFiles(req, res, next) {
        try {
            let newData = req.files.map(e => {
                e.userId = req.User.id
                e.userEmail = req.User.email
                return e
            })
            console.log(newData, "<<<<<<<<");
            res.status(200).json({ message: "Successfully uploaded files" });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller;
const { Router } = require("express");
const controller = require("./controller")
const router = Router();

// router.get("/", (req, res) => {
//     res.send("using api route");
// })
router.post("/login", controller.loginuser);
router.get("/", controller.getallusers);
router.get("/:id",controller.getusersbyid);
router.post("/", controller.addnewuser);
router.post("/update/:id", controller.updateuser);
router.post("/addpost", controller.creatediscussion);
router.post("/posts", controller.getallposts);
router.post("/addlike", controller.addlikes);
router.post("/dislike", controller.dislike);
router.post("/addcomments", controller.addcomments);
router.post("/deletecomments", controller.deletecomments)

// router. delete("/:id", controller.removeStudent);

module.exports = router;

const client = require("./db");
const queries = require("./queries");


//login user by email and password
const loginuser = (req, res) => {
    const {email, password} = req.body;
    client.query(queries.loginuser, [email, password], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    }); 
};


// getting all users for database
const getallusers = (req, res) => {
    client.query(queries.getallusers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// getting user by primary id
const getusersbyid = (req, res) => {
    const id = parseInt(req.params.id);
    client.query(queries.getusersbyid, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// add new users
const addnewuser = (req, res) => {
    const {name, mobile_no, email, password} = req.body;
    //check if mobile and email already exist.
    client.query(queries.checkEmailExists, [mobile_no, email], (error, results) => {
        // console.log(results.rows)
        if (results.rows.length){
        // res.status(200).json(results.rows);
            res.send("Email is Already Taken");
        }else{
            // res.status(200).json(results.rows);
            client.query(queries.addnewuser, [name, mobile_no, email, password], (error, results) => {
                if (error) throw error;
                res.status(200).json(results.rows);
                // console.log(results.rows)
            }); 
        }
    });
};

//update own user profile
const updateuser = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, mobile_no, email, password} = req.body;
    // console.log(req.body)
            // res.status(200).json(results.rows);
    client.query(queries.updateuser, [id, name, mobile_no, email, password], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        // console.log(results.rows)
    }); 
};

//Create a Discussion
const creatediscussion = (req, res) => {
    const {user_id, text, image, hashtags} = req.body;
    client.query(queries.creatediscussion, [user_id, text, image, hashtags], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    }); 
};

//getting all posts
const getallposts = (req, res) => {
    client.query(queries.getallposts, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    }); 
};

//addlikes
const addlikes = (req, res) => {
    // const id = parseInt(req.params.id);
    const {user_id, discussion_id} = req.body;
    client.query(queries.addlikes,[user_id, discussion_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    }); 
};

//remove likes from post
const dislike = (req, res) => {
    const {user_id, discussion_id} = req.body;
    client.query(queries.dislike, [user_id, discussion_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    }); 
};

//Add comments on post
const addcomments = (req, res) => {
    const {user_id, discussion_id, text} = req.body;
    client.query(queries.addcomments, [user_id, discussion_id, text], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    }); 
};

//remove comments from post
const deletecomments = (req, res) => {
    const {user_id, discussion_id} = req.body;
    client.query(queries.deletecomments, [user_id, discussion_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    }); 
};


module.exports = {
    loginuser,
    getallusers,
    getusersbyid,
    addnewuser,
    updateuser,
    creatediscussion,
    getallposts,
    addlikes,
    dislike,
    addcomments,
    deletecomments,
};
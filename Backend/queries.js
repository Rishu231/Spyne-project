const loginuser = "SELECT * FROM public.users Where email = $1 and password = $2";
const getallusers = "SELECT * FROM public.users";
const getusersbyid = "SELECT * FROM public.users where id = $1";
const checkEmailExists = "SELECT * FROM users WHERE mobile_no = $1 OR email = $2";
const addnewuser = "INSERT INTO public.users (name, mobile_no, email, password) VALUES ($1, $2, $3, $4)";
const updateuser = "UPDATE public.users SET name = $2, mobile_no = $3, email = $4, password = $5 where id = $1";
const creatediscussion = "INSERT INTO public.discussions (user_id, text, image, hashtags) VALUES ($1, $2, $3, $4)";
const getallposts = "SELECT b.id, a.name, a.mobile_no, a.email, b.text, b.image, b.hashtags, COALESCE(c.likes, 0) AS likes, COALESCE(array_agg(json_build_object( 'comment_id', d.id, 'comment_text', d.text, 'comment_user_id', d.user_id, 'comment_user_name', e.name)) FILTER (WHERE d.text IS NOT NULL), '{}') AS comments FROM public.discussions AS b INNER JOIN public.users AS a ON b.user_id = a.id LEFT JOIN (SELECT discussion_id, COUNT(*) AS likes FROM public.likes GROUP BY discussion_id) AS c ON b.id = c.discussion_id LEFT JOIN public.comments AS d ON b.id = d.discussion_id LEFT JOIN public.users AS e ON d.user_id = e.id GROUP BY a.name, a.mobile_no, a.email, b.text, b.image, b.hashtags, b.id, c.likes ORDER BY b.created_on DESC LIMIT 100;"
const checkalreadylikes = "SELECT * FROM public.likes where user_id = $1 and discussion_id = $2";
const addlikes = "INSERT INTO public.likes (user_id, discussion_id) VALUES ($1, $2)";
const dislike = "DELETE FROM public.likes WHERE user_id = $1 and discussion_id = $2";
const addcomments = "INSERT INTO public.comments (user_id, discussion_id, text) VALUES ($1, $2, $3)";
const deletecomments = "DELETE FROM public.comments where user_id = $1 and discussion_id = $2";


module.exports = {
    loginuser,
    getallusers,
    getusersbyid,
    checkEmailExists,
    addnewuser,
    updateuser,
    creatediscussion,
    getallposts,
    checkalreadylikes,
    addlikes,
    dislike,
    addcomments,
    deletecomments,
};
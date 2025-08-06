const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
var authRequired = require("../middleware/middleware");
const checkIfLogin = require("../middleware/middleware");
const { check } = require("express-validator");
const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });
const cloudinary = require("cloudinary").v2;


import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'de02snsex', 
        api_key: '667354649864489', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();

// router.get("*", checkIfLogin);

//Level 3
// post request

router.post("/update-profile", upload.single("avatar"), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);

  cloudinary.v2.uploader.upload("home", { upload_preset: "my_pre" });
  console.log(result, error);
});

//Level 2
// Get request

router.get("/signout", authController.authUser_signout_get);

router.get("/", checkIfLogin, authController.authUser_welcome_get);

router.get("/login", checkIfLogin, authController.authUser_login_get);

router.get("/signup", checkIfLogin, authController.authUser_signup_get);

// Post request

router.post(
  "/signup",
  [
    check("email", "please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  checkIfLogin,
  authController.authUser_signup_post
);

router.post("/login", authController.authUser_login_post);

//-------------------------------

// Level 1
// Get request

router.get("/home", checkIfLogin, authRequired, userController.user_index_get);
router.get(
  "/edit/:id",
  checkIfLogin,
  authRequired,
  userController.user_edit_get
);
router.get(
  "/view/:id",
  checkIfLogin,
  authRequired,
  userController.user_view_get
);

// Post request

router.post("/search", checkIfLogin, userController.user_search_post);

//Put request:

router.put("/edit/:id", checkIfLogin, userController.user_put);

// Delete request

router.delete("/edit/:id", checkIfLogin, userController.user_delete);

module.exports = router;

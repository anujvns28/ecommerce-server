const OTP = require("../model/Otp");
const User = require("../model/User");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt")
const { mailSend } = require("../utility/mailSender");
const Profile = require("../model/Profile");

exports.sendOtp = async(req,res) => {
    try{
    // fetching email
    const {email} = req.body;

    if(!email){
        return res.status(500).json({
            success:false,
            message:"Email is requird"
        })
    }

    const user = User.findOne({email:email})
    if(user){
        return res.status(500).json({
            success:false,
            message:"User is alredy reguistered"
        })
    }

    const otp = otpGenerator.generate(6, {
         upperCaseAlphabets: false,
         specialChars: false ,
         lowerCaseAlphabets:false,
    });

    const otpBody = {
        email:email,
        otp:otp
    }

    const data = await OTP.create(otpBody);
    
    // send email
    await mailSend(email,"Email Varifaction",otp)

    return res.status(200).json({
        success:true,
        message:"Otp genrated successfully",
        data:data
    })

    }catch(error){
     console.log(error)
     return res.status(500).json({
        success:false,
        message:"Error occerured in sending otp",
     }) 
    }
}

// signup
exports.signUp = async(req,res) => {
    try{
    //fetchin data
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
      } = req.body

      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !otp ||
        !accountType
      ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        })
      }

       // Check if password and confirm password match
    if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        })
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists. Please sign in to continue.",
        })
      }

     //recent otp
     const recentOtp = await OTP.findOne({email:email}).sort({createdAt:-1})
     
     console.log(recentOtp)
    if (recentOtp.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    } else if (otp !== recentOtp.otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    }

 // Hash the password
 const hashedPassword = await bcrypt.hash(password, 10)

 const profileDetails = await Profile.create({
    gender: null,
    dateOfBirth: null,
    about: null,
    contactNumber: null,
  })

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    accountType: accountType,
    additionalDetails: profileDetails._id,
    image: "",
  })

  return res.status(200).json({
    success: true,
    user,
    message: "User registered successfully",
  })

    }catch(error){
        console.log(error)
        return res.status(500).json({
           success:false,
           message:"Error occerured in Signup form",
        })   
    }
}

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body
  
      // Check if email or password is missing
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
  
      // Find user with provided email
      const user = await User.findOne({ email })
  
      // If user not found with provided email
      if (!user) {
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        })
      }
  
      //  Compare Password
      if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )

        res.status(200).json({
          success: true,
          user,
          token,
          message: `User Login Success`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }
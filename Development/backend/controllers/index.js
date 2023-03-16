const User = require("../models/User");
const bcrypt = require("bcrypt");

const getHome = (req, res) => {
  res.render("home");
};

const registeruser = async(req,res)=>{
  const saltPassword = await bcrypt.genSalt(12);
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);
  req.body.password = securePassword;
  User.create(req.body,(err,user)=>{
    if(err)
    {
      return res.status(500).json({
        data:{},
        success: false,
        error: "Email is already registered",
      });
    }
    else
    {
      return res.render("home",{data:user});
    }
  })
  
}

const loginuser = async(req,res)=>{
  try{
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({email:email});
  const isMatch = await bcrypt.compare(password,user.password);

  if(isMatch)
  {
    user.password = null;
    password = null;
    return res.json({
      data:user,
      success:true,
      error:""
    });
  }
  else
  {
    return res.json({
      data:{},
      success:false,
      error: "Invalid login credentials!!"
    });
  }
}
catch(error)
{
  return res.status(404).send({
      data:{},
      success:false,
      error: "Internal Server Error"
  });
}

}
module.exports = { getHome,registeruser,loginuser};

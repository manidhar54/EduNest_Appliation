const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone, department, address, profilePic } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        message: "User already exists",
      });

    if (role === 'admin') {
      return res.status(400).json({ message: 'Admin accounts cannot be self-registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      phone: phone || '',
      department: department || '',
      address: address || '',
      profilePic: profilePic || '',
    });

    await user.save();

    // return user data (excluding password)
    res.status(201).json({
      message: "Registration Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        department: user.department,
        address: user.address,
        profilePic: user.profilePic,
        feePaid: user.feePaid,
        active: user.active,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user)
      return res.status(400).json({
        message: "Invalid Credentials",
      });

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch)
      return res.status(400).json({
        message: "Invalid Credentials",
      });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        department: user.department,
        address: user.address,
        profilePic: user.profilePic,
        feePaid: user.feePaid,
        active: user.active,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

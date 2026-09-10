const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').lean();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = { ...req.body };
    // never allow password to be updated here
    delete updates.password;
    const user = await User.findByIdAndUpdate(id, updates, { new: true, select: '-password' }).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

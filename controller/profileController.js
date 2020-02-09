const Profile = require("../model/Profile");

/******************* Add Profile Items ********************/

//add Profile
exports.addProfile = async (req, res) => {
  const newProfile = {
    user: req.user._id,
    dateOfBirth: req.body.dateOfBirth,
    userName: req.user.userName,
    gender: req.body.gender,
    website: req.body.website,
    firstLanguage: req.body.firstLanguage,
    secondaryLanguage: req.body.secondaryLanguage,
    place: req.body.place,
    avatar: req.user.avatar,
    name: req.user.name,
    email: req.user.email
  };
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: newProfile },
      { new: true, upsert: true }
    );
    if (!profile) {
      profile = new Profile(newProfile);
      await profile.save();
      res.send(profile);
    }
    await profile.save();
    res.send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
};

/******************* Edit Profile Items ********************/
exports.editProfile = async (req, res) => {
  const userName = await Profile.findOne({ userName: req.body.userName });
  if (userName) {
    if (userName.userName === req.body.userName)
      return res.status(400).json({
        errors: [
          { msg: "Username already exists. Please choose another username." }
        ]
      });
  }
  try {
    const updates = Object.keys(req.body);
    const profile = await Profile.findOne({ user: req.user._id });
    updates.map(update => (profile[update] = req.body[update]));
    await profile.save();
    res.send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.addProfileImage = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (req.files.coverPhoto) profile.coverPhoto = req.files.coverPhoto[0].path;
    if (req.files.avatar) profile.avatar = req.files.avatar[0].path;
    await profile.save();
    res.send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
};

/******************* Delete Profile Items ********************/

/******************* Get Profile Items ********************/
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user._id
    });
    if (!profile)
      return res.status(400).json({
        errors: [{ msg: "Please check profile" }]
      });
    res.send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({})
      .select({
        name: 1,
        website: 1,
        userName: 1,
        coverPhoto: 1,
        avatar: 1
      })
      .sort({ createdAt: -1 });

    res.send(profiles);
  } catch (error) {
    res.status(500).send();
  }
};
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("user", [
      "name",
      "userName",
      "avatar"
    ]);
    res.send(profile);
  } catch (error) {
    res.status(500).send();
  }
};

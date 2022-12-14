const { Users, Thoughts } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const allUsers = await Users.find();
      return res.json(allUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const newUser = await Users.create(req.body);
      return res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getOneUser(req, res) {
    try {
      const oneUser = await Users.findOne({ _id: req.params.userId });

      if (!oneUser) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      return res.json(oneUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const updatedUser = await Users.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      return res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const deletedUser = await Users.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!deletedUser) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      const deletedThoughts = await Thoughts.deleteMany({
        _id: { $in: deletedUser.thoughts },
      });

      return res.json({ message: "User and associated thoughts deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const friendAddsUser = await Users.findOneAndUpdate(
        {
          _id: req.params.friendId,
        },
        {
          $addToSet: { friends: req.params.userId },
        },
        { runValidators: true, new: true }
      );
      if (!friendAddsUser) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      const userAddsFriend = await Users.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $addToSet: { friends: req.params.friendId },
        },
        { runValidators: true, new: true }
      );
      if (!userAddsFriend) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      return res.json({
        message: `${friendAddsUser.username} and ${userAddsFriend.username} are now friends`,
        userAddsFriend,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const friendRemovesUser = await Users.findOneAndUpdate(
        {
          _id: req.params.friendId,
        },
        {
          $pull: { friends: req.params.userId },
        },
        { runValidators: true, new: true }
      );
      if (!friendRemovesUser) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      const userRemovesFriend = await Users.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $pull: { friends: req.params.friendId },
        },
        { runValidators: true, new: true }
      );
      if (!userRemovesFriend) {
        return res.status(404).json({ message: "No user with this ID" });
      }
      return res.json({
        message: `${friendRemovesUser.username} and ${userRemovesFriend.username} are no longer friends`,
        userRemovesFriend,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

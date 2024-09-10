const Movie = require("../models/movies");
const customError = require("../utils/customError");
//  ===========controller to find all the bookmarked movies ================

const allBookmarks = async (req, res) => {
  const { userId } = req.user;
  const bookmarks = await Movie.find({ bookmarksBy: userId });
  res.status(200).json({ data: bookmarks });
};

//controller to add a movie to bookmark=================
const addBookmark = (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const bookmarkedShows = Movie.findOneAndUpdate(
    { _id: id },
    { $push: { bookmarkBy: userId } }
  );

  if (!bookmarkedShows) {
    return next(customError(`No movie with the ID: ${id}`, 400));
  }

  res.status(200).json({ message: "Movie BookMarked!" });
};

// =========controller to remove a movie from bookmark=================

const removeBookmark = async (req, res) => {
  const { id } = req.params;

  const { userId } = req.user;

  const bookmarkedShows = await Movie.findOneAndUpdate(
    { _id: id },
    { $pull: { bookmarkBy: userId } }
  );

  if (!bookmarkedShows) {
    return next(customError(`No movie with ID  ${id}`, 400));
  }
  res.status(200).json({ message: "Bookmarked Removed" });
};

module.exports = { allBookmarks, addBookmark, removeBookmark };

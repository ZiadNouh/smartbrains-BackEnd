const handleImage = (req, res, db) => {
  const { id } = req.body;

  // Ensure that id is a valid integer
  if (!Number.isInteger(id)) {
    return res.status(400).json("Invalid id");
  }

  // Update the "entries" column for the user with the specified ID
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      // Send the updated entry count as a response
      res.json(entries[0]);
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res.status(500).json("Internal server error"); // Handle the error gracefully
    });
};

module.exports = {
  handleImage,
};

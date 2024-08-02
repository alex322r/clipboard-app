import db from "../db.js";

const Delete = {
  deleteAll: (callback) => {
    db.run("DELETE FROM clipboard", callback);
  },
};

export default Delete;

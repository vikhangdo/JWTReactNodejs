import db from "../models/models/index.js";
const getGroupWithRoles = async (users) => {
  let roles = await db.group.findOne({
    where: { id: users.groupId },
    attributes: ["id", "name", "description"],
    include: [
      {
        model: db.role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    ],
  });

  return roles ? roles : {};
};

export default getGroupWithRoles;

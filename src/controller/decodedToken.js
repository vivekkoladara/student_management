const Jwt = require("jsonwebtoken");

const FetchUserId = (token) => {
  const tokenn = token.split(" ")[1];

  const decToken = Jwt.decode(tokenn);

  // console.log("token => ", decToken);
  // console.log("studID => ", decToken?.student_id);
  return decToken?.student_id;
};

module.exports = { FetchUserId };

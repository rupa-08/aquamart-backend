const isCustomer = (request, response, callback) => {
  let user = request.auth_user;
  let role = user.role;

  if (String(role).toLowerCase() === "customer") {
    callback();
  } else {
    callback({
      status: 403,
      msg: "Unauthorized to access",
    });
  }
};

const isAdmin = (request, response, callback) => {
  let user = request.auth_user;
  let role = user.role;

  if (String(role).toLowerCase() === "admin") {
    callback();
  } else {
    callback({
      status: 403,
      msg: "Unauthorized to access.",
    });
  }
};

const isSeller = (request, response, callback) => {
  let user = request.auth_user;
  let role = user.role;

  if (String(role).toLowerCase() === "seller") {
    callback();
  } else {
    callback({
      status: 403,
      msg: "Unauthorized to access.",
    });
  }
};

const isSellerOrAdmin = (request, response, callback) => {
  let user = request.auth_user;
  let role = user.role;

  if (
    String(role).toLowerCase() === "seller" ||
    String(role).toLowerCase() === "admin"
  ) {
    callback();
  } else {
    callback({
      status: 403,
      msg: "Unauthorized to access.",
    });
  }
};

const isSellerOrCustomer = (request, response, callback) => {
  let user = request.auth_user;
  let role = user.role;

  if (
    String(role).toLowerCase() === "seller" ||
    String(role).toLowerCase() === "customer"
  ) {
    callback();
  } else {
    callback({
      status: 403,
      msg: "Unauthorized to access.",
    });
  }
};

const isAdminOrCustomer = (request, response, callback) => {
  let user = request.auth_user;
  let role = user.role;

  if (String(role).toLowerCase() !== "seller") {
    callback();
  } else {
    callback({
      status: 403,
      msg: "Unauthorized to access.",
    });
  }
};

module.exports = {
  isCustomer,
  isAdmin,
  isSeller,
  isSellerOrAdmin,
  isSellerOrCustomer,
  isAdminOrCustomer,
};

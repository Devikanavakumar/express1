module.exports = (req, res, next) => {
  const { name, quantity, price } = req.body;
  let errors = [];

  if (!name && !quantity && !price) errors.push("Please enter the Product name, Quantity,Price");
  else if (!name && !quantity) errors.push("Please enter Product name and Quantity");
  else if (!name && !price) errors.push("Please enter Product name and Price");
  else if (!quantity && !price) errors.push("Please enter Quantity and Price");
  else if (!name) errors.push("Please enter the Product name");
  else if (!quantity) errors.push("Please enter the Quantity you needed");
  else if (!price) errors.push("Please enter the Price");

  if (quantity && quantity < 1) errors.push("Quantity must be greater than 0");
  if (price && price < 50) errors.push("Price must be greater than 50");

  if (errors.length > 0) {
    return res.render("product", {
      errors,
      success: null,
      name,
      quantity,
      price
    });
  }

  next();
};
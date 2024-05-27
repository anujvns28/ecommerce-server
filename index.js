const express = require('express');
const { dbConnection } = require('./config/database');
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload')
require("dotenv").config()

const authRoutes = require("./routes/atuh")
const categoriesRoutes = require("./routes/categories");
const subCategoriesRoutes = require("./routes/subCategories");


const port = process.env.PORT || 4000;

// database connection
dbConnection();
//middleware
app.use(express.json());

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);
//mounting
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoriesRoutes)
app.use("/api/v1/subCategory",subCategoriesRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


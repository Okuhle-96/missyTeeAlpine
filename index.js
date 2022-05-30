const supertest = require("supertest");
const PgPromise = require("pg-promise");
const express = require("express");
const assert = require("assert");
const fs = require("fs");
require("dotenv").config();

const API = require("./api");
const { default: axios } = require("axios");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://postgres:pg123@localhost:5432/postgres";
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);

const garments = require("./garments.json");

const PORT = process.env.PORT || 3000;

API(app, db);

app.get("/api/garments", function (req, res) {
  const gender = req.query.gender;
  const season = req.query.season;

  const filteredGarments = garments.filter((garment) => {
    if (gender != "All" && season != "All") {
      return garment.gender === gender && garment.season === season;
    } else if (gender != "All") {
      return garment.gender === gender;
    } else if (season != "All") {
      return garment.season === season;
    }
    return true;
  });

  res.json({
    garments: filteredGarments,
  });
});

app.get("/api/garments/price/:price", function (req, res) {
  const maxPrice = Number(req.params.price);
  const filteredGarments = garments.filter((garment) => {
    if (maxPrice > 0) {
      return garment.price <= maxPrice;
    }
    return true;
  });

  res.json({
    garments: filteredGarments,
  });
});

app.listen(PORT, function () {
  console.log(`App started on port ${PORT}`);
});

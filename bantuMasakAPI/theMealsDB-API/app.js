const express = require("express");
const axios = require("axios");

const app = express();

// Menampilkan semua resep
app.get("/recipes", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/random",
      {
        params: {
          apiKey: "9dbcf9a7510148f2a3ae5d0e135451e6",
          number: 10, // Jumlah resep yang ingin ditampilkan
        },
      }
    );

    const recipes = response.data.recipes;
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Menambah resep
app.post("/recipes", async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    const response = await axios.post("https://api.spoonacular.com/recipes", {
      apiKey: "9dbcf9a7510148f2a3ae5d0e135451e6",
      title,
      ingredients,
      instructions,
    });

    const recipe = response.data;
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Menampilkan resep by id
app.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: "9dbcf9a7510148f2a3ae5d0e135451e6",
        },
      }
    );

    const recipe = response.data;
    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Menampilkan resep berdasarkan bahan atau nama makanan
app.get("/recipes/search", async (req, res) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          apiKey: "9dbcf9a7510148f2a3ae5d0e135451e6",
          query,
          number: 10, // Jumlah resep yang ingin ditampilkan
        },
      }
    );

    const recipes = response.data.results;
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Menghapus resep
app.delete("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.delete(
      `https://api.spoonacular.com/recipes/${id}`,
      {
        params: {
          apiKey: "9dbcf9a7510148f2a3ae5d0e135451e6",
        },
      }
    );

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

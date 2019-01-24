import axios from "axios";
import {
  key
} from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      alert("Something went wrong :(")
      console.log(error);
    }
  }

  calcTime() {
    // Assuming we need 15 min for each 3 ingredients 
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ["tablespoon", "tablespoons", "ounces,", "ounce", "teaspoons", "teaspoon", "cups", "pounds"];
    const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound"];
    const units = [...unitsShort, "kg", "g"];
    const newIngredients = this.ingredients.map(curr => {
      // Uniform Units
      let ingredient = curr.toLowerCase();
      unitsLong.forEach((curr, index) => {
        ingredient = ingredient.replace(curr, unitsShort[index]);
      });

      // Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex(el => units.includes(el));

      let objIng;
      if (unitIndex > -1) {
        // there is a unit
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+")).toFixed(2);
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+")).toFixed(2);
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" ")
        };

      } else if (parseInt(arrIng[0], 10)) {
        // there is No unit but 1st element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" ")
        };
      } else if (unitIndex === -1) {
        // there is No unit and no number in first position
        objIng = {
          count: 1,
          unit: "",
          ingredient
        };
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }

  updateServings(type) {
    // Servings
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;
    // Ingredients
    this.ingredients.forEach(ing => {
      ing.count *= (newServings / this.servings)
    })

    this.servings = newServings;
  }
}
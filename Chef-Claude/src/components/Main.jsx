import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import {getRecipeFromMistral } from "../ai"

export default function Main() {

  const [ingredients, setIngredients] = React.useState(["all the main spices", "pasta", "ground beef", "tomato paste"])
  const [recipe, setRecipe] = React.useState(false)
  const recipeSection = React.useRef(null)

  React.useEffect(() => {
    if(recipe !=="" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
  }, [recipe])

  async function getRecipe() {
    // const recipeMarkdown = await getRecipeFromMistral(ingredients)
    // console.log(recipeMarkdown)
    setRecipe(prevRecipe => !prevRecipe)
  }

  // const recipeAPIkey = import.meta.env.VITE_API_KEY;

  function addIngredient(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newIngredient = formData.get("ingredient")
    setIngredients(prev => [...prev, newIngredient])
  }

  return (
    <main>
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          aria-label="Add ingredient"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>
      {ingredients.length > 0 && 
        <IngredientsList 
          ingredients={ingredients} 
          getRecipe={getRecipe}
          recipeRef={recipeSection}
        />
      }

      {recipe && <ClaudeRecipe />}
    </main>
  )
}
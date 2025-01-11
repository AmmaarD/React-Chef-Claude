import React, { useState } from "react"

export default function Main () {
  
  const [ingredients, setIngredients] = React.useState([])
    
  const ingredientsListItems = ingredients.map(ingredient => (
      <li key={ingredient}>{ingredient}</li>
  ))

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newIngredient = formData.get("ingredient")
    setIngredients(prev => [...prev, newIngredient])
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="add-ingredient-form">
        <input 
          type="text" 
          aria-label="Add ingredient"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      <ul>
        {ingredientsListItems}
      </ul>
    </main>
  )
}
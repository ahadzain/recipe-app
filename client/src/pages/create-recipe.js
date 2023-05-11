import { useState } from 'react'
import './create-recipe.css'
import '../App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useGetUserID } from '../hooks/useGetUserID'
import { useCookies } from 'react-cookie';

export const CreateRecipe = () => {

    const userID = useGetUserID()

    const navigate = useNavigate()

    const [cookies, _] = useCookies(["access_token"]);

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        recipeOwner: userID
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({ ...recipe, [name]: value });
    }

    const addIngredientField = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
    }

    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[index] = value;
        setRecipe({ ...recipe, ingredients })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post("http://localhost:3001/recipes", 
            recipe,
            { headers: {authorization: cookies.access_token }});
            alert("Reciper created");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container create-recipe">
                <h2>Create Your Recipe</h2>
                <form onSubmit={handleSubmit}>
                    <div className='create-recipe-form'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" onChange={handleChange} />
                        <label htmlFor="ingredients">Ingredients:</label>
                        {recipe.ingredients.map((ingredient, index) => (
                            <input 
                                key={index}
                                type="text" 
                                id="ingredients" 
                                name="ingredients" 
                                value={ingredient} 
                                onChange={(event) => handleIngredientChange(event, index)} 
                            />
                        ))}
                        <button type='button' onClick={addIngredientField}>Add Ingredient</button>
                        <label htmlFor="instruction">Instructions:</label>
                        <textarea type="text" id="instructions" name="instructions" rows="4" onChange={handleChange} />
                        <label htmlFor="imageUrl">Image Url:</label>
                        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
                        <label htmlFor="cookingTime">Cooking Time:</label>
                        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />
                        <button type='submit'>Create Recipe</button>
                    </div>
                </form>
            </div>
        </>
    )
}
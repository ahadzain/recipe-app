import axios from "axios"
import { useEffect, useState } from "react"
import { useGetUserID } from "../hooks/useGetUserID"
import { useCookies } from 'react-cookie';
import '../App.css'
import './home.css'

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    const [cookies, _] = useCookies(["access_token"]);

    const userID= useGetUserID();

    useEffect( ()=> {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (error) {
                console.log(error);
            }
        }

        fetchRecipe();
        if(cookies.access_token) fetchSavedRecipe();
        
    }, [])

    const handleSaveBtn = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", 
            { recipeID, userID },
            { headers: {authorization: cookies.access_token }})
            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            console.log(error);
        }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id)

    return (
        <>
            <div className="container home">
                <h2>RECIPES</h2>
                <ul>
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="recipe">
                            <li>
                                <h2>{recipe.name}</h2>
                                <button onClick={ () => handleSaveBtn(recipe._id)} disabled={isRecipeSaved(recipe._id)} >
                                    {isRecipeSaved(recipe._id) ? "Saved" : "Save" }
                                </button>
                                <p>{recipe.instructions}</p>
                                <div className="recipe-img">
                                    <img src={recipe.imageUrl} alt={recipe.name} />
                                </div>
                                <p>Cooking tie: {recipe.cookingTime} (minutes)</p>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
}
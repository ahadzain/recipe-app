import axios from "axios";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import '../App.css'
import './home.css'

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([])
    const userID = useGetUserID();
    
    useEffect( () => {
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
                setSavedRecipes(response.data.savedRecipes)
            } catch (error) {
                console.log(error);
            }
        }

        fetchSavedRecipe();
    }, [])
    return (
        <>
            <div className="container home">
                <h2>RECIPES</h2>
                <ul>
                    {savedRecipes.map((recipe) => (
                        <div key={recipe._id} className="recipe">
                            <li>
                                <h2>{recipe.name}</h2>
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
    );
    
}
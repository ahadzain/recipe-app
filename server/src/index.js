import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from './routes/users.js'
import { recipesRouter } from "./routes/recipe.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use( "/auth", userRouter )
app.use( "/recipes", recipesRouter )

mongoose.connect("mongodb+srv://abdulahad:BbCGcYLycY1AhMYQ@recipes.wspaa5e.mongodb.net/")

app.listen(3001, ()=> console.log("SERVER STARTED!"));

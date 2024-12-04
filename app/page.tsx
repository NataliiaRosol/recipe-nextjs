'use client'
import { useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import RecipeItem from "./components/RecipeItem";
import Link from "next/link";


interface GlobalContextType {
  recipeList: Recipe[];
  setRecipeList: (value: Recipe[])=> void;
  loading: boolean;
  setLoading: boolean;
}
interface Recipe {
  strMeal: string;
  idMeal: number;
  strMealThumb: string;
}

export default function Home() {

  const context = useContext(GlobalContext);

 /* 
  async function fetchOneRec(){
    const oneRec = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772');
    const data = await oneRec.json();
    console.log(data);
  }

  useEffect(()=> {
    fetchOneRec()
  }, [])
*/

  // Перевірка, що контекст не є null
  if (!context) {
    return <div>Error: GlobalContext is not provided</div>;
  }

  const { recipeList, setRecipeList, loading, setLoading } = context;
  console.log(recipeList);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-blue-950 text-3xl font-bold">Loading... Please wait</p>
          </div>;
      </div>
    ) 
  }

  return (
    <>
      <h1 className="text-center font-bold text-5xl text-blue-950 my-10">Recipes</h1>
      <div className="container mx-auto flex flex-wrap justify-center gap-10">
        
        {
          recipeList.map((recipeItem, index) => (
            <Link href={`${recipeItem.idMeal}`} key={recipeItem.idMeal} >
              <RecipeItem recipeName={recipeItem.strMeal} recipeId={recipeItem.idMeal} recipeImg={recipeItem.strMealThumb}/>
            </Link>
          ))
          
        }
      </div>
    </>
  );
}

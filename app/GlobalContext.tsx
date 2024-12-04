'use client'

import { createContext, useEffect, useState } from "react";

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

export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalState({ children }: { children: React.ReactNode }) {
  

  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchRecipeList() {
    try {
      setLoading(true);
      // Отримуємо всі категорії
      const categoriesResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const categoriesData = await categoriesResponse.json();
      // console.log(categoriesData);
      
  
      const allRecipes = [];
  
      for (const category of categoriesData.categories) {
        // Отримуємо рецепти для кожної категорії
        const recipesResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`);
        // console.log(recipesResponse);
        
        const recipesData = await recipesResponse.json();
        // console.log(recipesData);
        
        const beefMeal = recipesData.meals[0];  
        // console.log(beefMeal.strArea); - undefind
        // Додаємо рецепти до загального масиву
        allRecipes.push(...recipesData.meals);
      }
  
      // console.log('All recipes:', allRecipes);
      
      setRecipeList(allRecipes);
      return allRecipes;
    } catch (error) {
      console.error('Error fetching all recipes:', error);
    }
    finally {
      setLoading(false)
    }
  
  }

  useEffect(()=>{
    fetchRecipeList();
  }, [])


  return (
    <GlobalContext.Provider value={{recipeList, setRecipeList, loading, setLoading}}>
      {children}
    </GlobalContext.Provider>
  )
}


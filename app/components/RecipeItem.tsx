import React from 'react'

type Props = {
  recipeName: string;
  recipeId: number;
  recipeImg: string;
}

const RecipeItem = ({recipeName, recipeId, recipeImg}: Props) => {
  // console.log(recipeName);
  
  return (
    <div className='flex flex-col items-center  w-80 overflow-hidden'>
      <div className="rounded-xl">  
        <img src={recipeImg} alt="" className='w-full rounded-xl object-contain'/>
      </div>

      <div className="self-start my-3">
        <h2 className="text-2xl font-bold">{recipeName}</h2>
        <p>ID: {recipeId}</p>
      </div>
    </div>
  
  )
}

export default RecipeItem
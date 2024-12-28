import Image from 'next/image'
import { Clock, Users } from 'lucide-react'
import { getRecipe, getRecipes } from '@/utils/api'
import type { DetailedRecipe } from '@/types/recipe'
import Link from 'next/link'

export async function generateStaticParams() {
  const recipes = await getRecipes()
  return recipes.map((recipe: DetailedRecipe) => ({
    id: recipe.id.toString(),
  }))
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe: DetailedRecipe = await getRecipe(parseInt(params.id))


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href= "/recipe">
      <button 
     className="mb-6 flex items-center text-blue-600 hover:text-blue-800 focus:outline-none" >
        <span className="mr-2">Go Back</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        </Link>
        <div className="relative h-96 w-full mb-8">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
        
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-1">
            <Clock className="h-5 w-5" />
            <span>{recipe.readyInMinutes} minutes</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-5 w-5" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="prose max-w-none mb-8">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id} className="flex items-center gap-2">
                <span className="font-medium">
                  {ingredient.amount} {ingredient.unit}
                </span>
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
          />
        </div>
      </div>
    </main>
  )
}

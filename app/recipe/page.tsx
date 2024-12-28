import { getRecipes } from '@/utils/api'
import { RecipeCard } from '@/components/recipe-card'
import type { Recipe } from '@/types/recipe'
import { NavBar } from '@/components/navbar'

export const revalidate = 3600

export default async function Home() {
  const recipes = await getRecipes()

  return (
    <div>
    <NavBar/>
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Delicious Recipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
    </div>
  )
}


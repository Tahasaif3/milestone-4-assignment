import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Recipe } from '../types/recipe'

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2">{recipe.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2" 
             dangerouslySetInnerHTML={{ __html: recipe.summary }} 
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{recipe.readyInMinutes}min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="text-sm">{recipe.servings} servings</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}


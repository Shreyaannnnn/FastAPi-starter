'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { itemsAPI } from '@/lib/api'

const itemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
})

type ItemForm = z.infer<typeof itemSchema>

interface ItemFormProps {
  item?: { id: number; title: string; description?: string }
  onSuccess?: () => void
  onCancel?: () => void
}

export function ItemForm({ item, onSuccess, onCancel }: ItemFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemForm>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: item?.title || '',
      description: item?.description || '',
    },
  })

  const onSubmit = async (data: ItemForm) => {
    setIsLoading(true)
    setError('')

    try {
      if (item) {
        await itemsAPI.update(item.id, data)
      } else {
        await itemsAPI.create(data)
      }
      onSuccess?.()
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to save item')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{item ? 'Edit Item' : 'Create Item'}</CardTitle>
        <CardDescription>
          {item ? 'Update your item details' : 'Add a new item to your collection'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              {...register('title')}
              type="text"
              placeholder="Item title"
              disabled={isLoading}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              {...register('description')}
              type="text"
              placeholder="Description (optional)"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (item ? 'Update' : 'Create')}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 
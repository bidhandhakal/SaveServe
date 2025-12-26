'use server'

import prisma from '@/lib/db'
import { revalidatePath, unstable_cache } from 'next/cache'

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string

    // Create post with direct author relation - faster than upsert
    await prisma.post.create({
        data: {
            title,
            content,
            published: true,
            author: {
                connectOrCreate: {
                    where: { email: 'test@example.com' },
                    create: {
                        email: 'test@example.com',
                        name: 'Test User',
                    },
                },
            },
        },
    })

    revalidatePath('/')
}

export const getPosts = unstable_cache(
    async () => {
        return await prisma.post.findMany({
            where: { published: true },
            include: {
                author: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    },
    ['posts'],
    { revalidate: 60, tags: ['posts'] }
)

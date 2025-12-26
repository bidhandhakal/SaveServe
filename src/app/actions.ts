'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const email = 'test@example.com' // Hardcoded for demo simplicity

    // simple upsert to ensure user exists
    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Test User',
        },
    })

    await prisma.post.create({
        data: {
            title,
            content,
            authorId: user.id,
            published: true,
        },
    })

    revalidatePath('/')
}

export async function getPosts() {
    return await prisma.post.findMany({
        where: { published: true },
        include: {
            author: true,
        },
        orderBy: {
            createdAt: 'desc',
        }
    })
}

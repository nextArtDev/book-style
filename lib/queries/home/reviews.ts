import { Review, User } from '@prisma/client'
import { prisma } from '../../prisma'

// export type ReviewWithUserImage =
//   | (Review & { User: (User & { image: { url: string } }) | null })[]
//   | null

// export async function getHotReviews(): Promise<ReviewWithUserImage> {
//   try {
//     const hotReviews = await prisma.review.findMany({
//       orderBy: { rating: 'asc' },
//       take: 5,
//       include: {
//         User: { include: { image: { select: { url: true } } } },
//       },
//     })
//     return hotReviews
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }

export type ReviewWithUserImage = {
  id: number
  comment: string
  rating: number
  contributorId: string | null
  productId: string | null
  User: { image: { url: string } | null; name: string } | null

  // Other properties from the Review entity that you want to include
}

export async function getHotReviews(): Promise<ReviewWithUserImage[]> {
  try {
    const hotReviews = await prisma.review.findMany({
      orderBy: { rating: 'asc' },
      take: 5,
      select: {
        id: true,
        comment: true,
        rating: true,
        contributorId: true,
        productId: true,
        User: {
          select: {
            name: true,
            image: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    })

    return hotReviews
  } catch (error) {
    console.log(error)
    throw error
  }
}

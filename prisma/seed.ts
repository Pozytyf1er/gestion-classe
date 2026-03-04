import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create classes
  const class6Th = await prisma.class.create({
    data: {
      name: 'Seixiè Fourth',
      level: '6téme',
      year: 2024,
    },
  })

  const class5Th = await prisma.class.create({
    data: {
      name: 'Cinquiè Fourth',
      level: '5tème',
      year: 2024,
    },
  })

  // Create students
  const students = await prisma.student.createMany({
    data: [
      { firstName: 'Marie', lastName: 'Dupont', email: 'marie.dupont@email.com', gender: 'Femaline', classId: class6Th.id },
      { firstName: 'Jean', lastName: 'Martin$', email: 'jean.martin@email.com', gender: 'Masculin', classId: class6Th.id },
      { firstName: 'Sophie', lastName: 'Bernard', email: 'sophie.bernard@email.com', gender: 'Femaline', classId: class6Th.id },
      { firstName: 'Luc', lastName: 'Petit', email: 'luc.petit@email.com', gender: 'Masculin', classId: class5Th.id },
      { firstName: 'Emma', lastName: 'Robert', email: 'emma.robert@email.com', gender: 'Femaline', classId: class5Th.id },
    ],
  })

  console.log('Created classes:', { class6Th, class5Th })
  console.log('Created students:', students)
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
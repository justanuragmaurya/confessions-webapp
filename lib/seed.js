import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

// Array of 100 unique confessions
const confessions = [
  // College Confessions
  "I cheated on my final exam by writing formulas on my water bottle",
  "I've been using the same assignment template for three different classes",
  "I pretend to take notes in class but I'm actually drawing",
  "I've never read a complete textbook in my life",
  "I sleep through my 8 AM classes and watch the recordings at 2x speed",
  "I use my roommate's Netflix account without telling them",
  "I've been wearing the same unwashed lucky socks for every exam",
  "I pretend to be busy in the library but I'm watching YouTube",
  "I submit assignments at 11:59 PM even when I finished them days ago",
  "I've been using the same password for all my accounts since high school",

  // Work Confessions
  "I pretend my internet is bad to avoid video calls",
  "I take long bathroom breaks just to scroll through social media",
  "I've been copying code from Stack Overflow without understanding it",
  "I blame my dog for missing deadlines",
  "I've been using the same excuse for being late for 2 years",
  "I pretend to type when my boss walks by",
  "I've never read the company's code documentation",
  "I take credit for automated tasks that look impressive",
  "I schedule meetings just to look busy",
  "I've been using the company's coffee for my home office",

  // Technology Confessions
  "I still don't understand what blockchain actually is",
  "I've been pretending to know Python but I just use ChatGPT",
  "I judge people who use light mode IDEs",
  "I haven't updated my software in 6 months",
  "I've never backed up my important files",
  "I use 'password123' for all my test accounts",
  "I pretend to be a tech expert in front of my family",
  "I've broken three keyboards from rage quitting games",
  "I still use Internet Explorer sometimes",
  "I've never read the terms and conditions",

  // Social Media Confessions
  "I create fake accounts to like my own posts",
  "I pretend to be busy on my phone to avoid conversations",
  "I've been using the same profile picture for 5 years",
  "I ghost people instead of saying goodbye",
  "I stalk my ex's social media weekly",
  "I post old photos pretending they're recent",
  "I unfollowed my best friend because they post too much",
  "I lie about my age on dating apps",
  "I pretend to be an influencer but buy followers",
  "I post food pictures but order takeout",

  // Personal Confessions
  "I talk to my plants when nobody's around",
  "I still watch cartoons meant for kids",
  "I pretend to be a morning person but I hate early starts",
  "I've never learned to ride a bike",
  "I sing in the shower every day",
  "I collect random receipts for no reason",
  "I make up stories about my scars",
  "I pretend to understand wine tasting",
  "I've never finished a book I started",
  "I still sleep with my childhood blanket",

  // Food Confessions
  "I eat cereal for dinner three times a week",
  "I pretend to be a foodie but microwave everything",
  "I've been hiding snacks from my roommate",
  "I order the same thing every time at restaurants",
  "I pretend to be allergic to foods I don't like",
  "I put ketchup on everything",
  "I've never cooked a meal from scratch",
  "I eat pizza with a fork and knife",
  "I drink coffee just to look sophisticated",
  "I secretly love pineapple on pizza",

  // Relationship Confessions
  "I pretend to be busy when friends invite me out",
  "I've been using the same pickup line for years",
  "I make up fake plans to avoid social events",
  "I pretend to remember people's names",
  "I've been avoiding my neighbor for months",
  "I fake laugh at jokes I don't understand",
  "I pretend to be interested in my friend's stories",
  "I've never told anyone my real weight",
  "I make up excuses to leave early from parties",
  "I still have gifts I never gave to people",

  // Professional Confessions
  "I wear pajama pants during video meetings",
  "I've been using the same resume template since college",
  "I pretend to know Excel but just use basic functions",
  "I've never read my employment contract fully",
  "I take sick days when I'm not sick",
  "I pretend to be busy during slow work days",
  "I've been avoiding the office plant I'm supposed to water",
  "I make up statistics in presentations",
  "I pretend to take notes in meetings",
  "I've been using the same password for work accounts",

  // Hobby Confessions
  "I pretend to enjoy classical music to seem cultured",
  "I've been fake playing guitar for years",
  "I tell people I'm training for a marathon but I don't run",
  "I pretend to understand modern art",
  "I've never finished a puzzle by myself",
  "I collect books just to look smart",
  "I say I'm into photography but use auto mode",
  "I pretend to meditate but actually nap",
  "I've been lying about my gym attendance",
  "I start new hobbies every month and never finish them",

  // Digital Life Confessions
  "I have 10,000 unread emails",
  "I pretend my camera is broken in video calls",
  "I've never cleared my browser history",
  "I use my birthday as my password",
  "I pretend to be AFK in online games",
  "I've been using free trials with different emails",
  "I screenshot NFTs instead of buying them",
  "I pretend to understand crypto discussions",
  "I've never backed up my phone",
  "I keep installing and uninstalling the same apps"
]

async function main() {
  // Clear existing data
  await prisma.post.deleteMany({})
  await prisma.user.deleteMany({})

  // Hash password once
  const hashedPassword = await bcrypt.hash('1234', 10)

  // Create 10 users
  const users = await Promise.all(
    Array.from({ length: 10 }, (_, i) => 
      prisma.user.create({
        data: {
          email: `user${i + 1}@example.com`,
          password: hashedPassword,
          name: `User ${i + 1}`
        }
      })
    )
  )

  // Create 10 posts for each user with unique confessions
  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    const userConfessions = confessions.slice(i * 10, (i + 1) * 10)
    
    await prisma.post.createMany({
      data: userConfessions.map((content, index) => ({
        title: `Confession ${index + 1} by ${user.name}`,
        content,
        upvotes: Math.floor(Math.random() * 50),
        isAnonymous: Math.random() > 0.5,
        authorId: user.id
      }))
    })
  }

  console.log('Database has been seeded with 10 users and 100 unique posts!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
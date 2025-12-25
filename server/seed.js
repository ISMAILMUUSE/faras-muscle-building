import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Blog from './models/Blog.js';

dotenv.config();

const products = [
  {
    name: 'Whey Protein',
    description: 'Premium whey protein isolate for maximum muscle recovery and growth. Fast-absorbing formula with 25g of protein per serving.',
    benefits: [
      'Supports muscle recovery',
      'Promotes muscle growth',
      'Fast absorption',
      'High-quality protein source'
    ],
    ingredients: [
      'Whey Protein Isolate',
      'Natural Flavors',
      'Stevia',
      'Cocoa Powder'
    ],
    howToUse: 'Mix one scoop (30g) with 8-10 oz of cold water or milk. Consume within 30 minutes after your workout or as a meal replacement.',
    warnings: 'Consult a healthcare professional before use if you are pregnant, nursing, or have a medical condition. Not intended for individuals under 18.',
    category: 'Protein',
    price: 49.99,
    comparePrice: 59.99,
    images: ['/images/whey-protein.jpg'], // Place image in client/public/images/
    inStock: true,
    stockQuantity: 50,
    featured: true,
    rating: 4.8,
    numReviews: 127,
  },
  {
    name: 'Creatine Monohydrate',
    description: 'Pure creatine monohydrate powder to enhance strength, power, and muscle mass. The most researched supplement in sports nutrition.',
    benefits: [
      'Increases strength and power',
      'Supports muscle mass gains',
      'Improves exercise performance',
      'Enhances recovery'
    ],
    ingredients: [
      'Creatine Monohydrate (100% Pure)'
    ],
    howToUse: 'Loading phase: Take 20g per day (4 servings of 5g) for 5-7 days. Maintenance: Take 5g per day mixed with water or your favorite beverage.',
    warnings: 'Stay hydrated while using creatine. Consult a healthcare professional before use if you have kidney issues.',
    category: 'Creatine',
    price: 24.99,
    comparePrice: 29.99,
    images: ['/images/creatine.jpg'],
    inStock: true,
    stockQuantity: 75,
    featured: true,
    rating: 4.9,
    numReviews: 203,
  },
  {
    name: 'Pre-Workout',
    description: 'Powerful pre-workout formula designed to boost energy, focus, and endurance. Get the most out of every training session.',
    benefits: [
      'Increased energy and focus',
      'Enhanced endurance',
      'Improved workout performance',
      'Better muscle pumps'
    ],
    ingredients: [
      'Caffeine Anhydrous',
      'Beta-Alanine',
      'Citrulline Malate',
      'Betaine Anhydrous',
      'Taurine'
    ],
    howToUse: 'Mix one scoop with 8-10 oz of cold water 20-30 minutes before your workout. Do not exceed one serving per day.',
    warnings: 'Contains caffeine. Not recommended for individuals sensitive to caffeine or those under 18. Do not use if pregnant or nursing.',
    category: 'Pre-Workout',
    price: 39.99,
    comparePrice: 49.99,
    images: ['/images/pre-workout.jpg'],
    inStock: true,
    stockQuantity: 40,
    featured: true,
    rating: 4.7,
    numReviews: 156,
  },
  {
    name: 'BCAA',
    description: 'Branched-chain amino acids to support muscle recovery and reduce fatigue. Perfect for training days and recovery.',
    benefits: [
      'Reduces muscle fatigue',
      'Supports muscle recovery',
      'Preserves muscle mass',
      'Enhances endurance'
    ],
    ingredients: [
      'L-Leucine',
      'L-Isoleucine',
      'L-Valine',
      'Natural Flavors'
    ],
    howToUse: 'Mix one scoop (10g) with 8-10 oz of water. Take during or after your workout, or between meals.',
    warnings: 'Consult a healthcare professional before use if you have a medical condition.',
    category: 'BCAA',
    price: 29.99,
    comparePrice: 34.99,
    images: ['/images/bcaa.jpg'],
    inStock: true,
    stockQuantity: 60,
    featured: false,
    rating: 4.6,
    numReviews: 98,
  },
  {
    name: 'Mass Gainer',
    description: 'High-calorie mass gainer with quality protein and complex carbs. Perfect for hardgainers looking to build size and strength.',
    benefits: [
      'Supports weight gain',
      'High-quality calories',
      'Muscle building support',
      'Post-workout recovery'
    ],
    ingredients: [
      'Whey Protein Concentrate',
      'Maltodextrin',
      'Oats',
      'Natural Flavors',
      'Vitamins & Minerals'
    ],
    howToUse: 'Mix 2 scoops (150g) with 16 oz of water or milk. Take 1-2 times per day, preferably post-workout or between meals.',
    warnings: 'Not intended for weight reduction. Consult a healthcare professional before use.',
    category: 'Mass Gainer',
    price: 54.99,
    comparePrice: 64.99,
    images: ['/images/mass-gainer.jpg'],
    inStock: true,
    stockQuantity: 30,
    featured: false,
    rating: 4.5,
    numReviews: 87,
  },
  {
    name: 'Recovery Supplement',
    description: 'Comprehensive recovery formula with essential nutrients to support muscle repair and reduce soreness after intense training.',
    benefits: [
      'Faster muscle recovery',
      'Reduces muscle soreness',
      'Supports immune function',
      'Enhances sleep quality'
    ],
    ingredients: [
      'L-Glutamine',
      'Magnesium',
      'Zinc',
      'Vitamin D',
      'Tart Cherry Extract'
    ],
    howToUse: 'Take 2 capsules with water after your workout or before bed. Best taken on an empty stomach.',
    warnings: 'Consult a healthcare professional before use if you are taking medications or have a medical condition.',
    category: 'Recovery',
    price: 34.99,
    comparePrice: 39.99,
    images: ['/images/recovery.jpg'],
    inStock: true,
    stockQuantity: 45,
    featured: false,
    rating: 4.6,
    numReviews: 112,
  },
];

const blogPosts = [
  {
    title: 'The Ultimate Guide to Protein Timing for Muscle Growth',
    excerpt: 'Learn when and how to consume protein for optimal muscle recovery and growth. Science-backed strategies for athletes.',
    content: `# The Ultimate Guide to Protein Timing for Muscle Growth

Protein is the building block of muscle, but timing matters. Research shows that consuming protein within 30 minutes to 2 hours after your workout can significantly enhance muscle protein synthesis.

## Post-Workout Window

The anabolic window is real, but it's wider than many think. Consuming 20-30g of high-quality protein within 2 hours post-workout is optimal for muscle recovery.

## Daily Protein Requirements

For active individuals:
- **Sedentary**: 0.8g per kg body weight
- **Active**: 1.2-1.6g per kg body weight
- **Athletes**: 1.6-2.2g per kg body weight

## Best Protein Sources

1. Whey Protein - Fast-absorbing, ideal post-workout
2. Casein Protein - Slow-digesting, great before bed
3. Plant Proteins - Excellent for those with dietary restrictions

## Tips for Maximum Results

- Distribute protein intake throughout the day
- Include protein in every meal
- Don't skip post-workout nutrition
- Stay consistent with your protein intake

Remember, consistency is key. Focus on meeting your daily protein goals rather than obsessing over exact timing.`,
    author: 'FARAS Team',
    category: 'Nutrition',
    published: true,
  },
  {
    title: 'Creatine: Everything You Need to Know',
    excerpt: 'Discover the science behind creatine supplementation and how it can enhance your strength and muscle gains.',
    content: `# Creatine: Everything You Need to Know

Creatine is one of the most researched and effective supplements for strength and muscle building.

## What is Creatine?

Creatine is a naturally occurring compound found in muscle cells. It helps produce energy during high-intensity exercise.

## Benefits

- **Increased Strength**: Studies show 5-15% improvement in strength
- **Muscle Mass**: Supports lean muscle gains
- **Performance**: Enhances power output during training
- **Recovery**: May reduce muscle damage and inflammation

## How to Take Creatine

### Loading Phase (Optional)
- 20g per day for 5-7 days
- Split into 4 servings of 5g

### Maintenance Phase
- 3-5g per day
- Timing doesn't matter significantly
- Mix with water, juice, or your protein shake

## Safety

Creatine is safe for healthy individuals when used as directed. Stay well-hydrated and consult a healthcare professional if you have kidney issues.

## Bottom Line

Creatine monohydrate is the gold standard. It's affordable, effective, and safe. If you're serious about building strength and muscle, creatine should be in your supplement stack.`,
    author: 'FARAS Team',
    category: 'Supplements',
    published: true,
  },
  {
    title: '5 Essential Recovery Strategies for Athletes',
    excerpt: 'Maximize your recovery between workouts with these proven strategies for better performance and faster results.',
    content: `# 5 Essential Recovery Strategies for Athletes

Recovery is just as important as training. Here are five strategies to optimize your recovery:

## 1. Sleep Quality

Aim for 7-9 hours of quality sleep per night. Sleep is when your body repairs muscle tissue and releases growth hormone.

## 2. Nutrition Timing

Post-workout nutrition is crucial:
- Protein within 2 hours
- Carbohydrates to replenish glycogen
- Hydration with electrolytes

## 3. Active Recovery

Light movement on rest days promotes blood flow and reduces soreness:
- Walking
- Yoga
- Light stretching
- Foam rolling

## 4. Stress Management

High stress levels can impair recovery:
- Meditation
- Deep breathing
- Time in nature
- Hobbies outside of training

## 5. Supplementation

Consider these recovery supplements:
- **BCAAs**: Reduce muscle fatigue
- **Glutamine**: Support immune function
- **Magnesium**: Improve sleep quality
- **Omega-3s**: Reduce inflammation

## The Bottom Line

Recovery isn't passive. Be intentional about your recovery strategies, and you'll see better results from your training.`,
    author: 'FARAS Team',
    category: 'Recovery',
    published: true,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/faras-supplements');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Blog.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@faras.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('✅ Admin user created');

    // Create products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Create blog posts
    const createdPosts = await Blog.insertMany(blogPosts);
    console.log(`✅ Created ${createdPosts.length} blog posts`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();


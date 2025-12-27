import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Blog from './models/Blog.js';

dotenv.config();

// Helper function to generate slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Only the 10 specified products with KES pricing
const products = [
  {
    name: 'Whey Protein Powder',
    slug: generateSlug('Whey Protein Powder'),
    description: 'Fast-absorbing protein that supports muscle repair and lean muscle growth.',
    benefits: [
      'Supports muscle growth',
      'Speeds up recovery',
      'Helps meet daily protein intake'
    ],
    ingredients: [
      'Whey Protein Isolate',
      'Natural Flavors',
      'Stevia',
      'Cocoa Powder'
    ],
    howToUse: 'Mix 1 scoop with water or milk after workouts.',
    warnings: 'Consult a healthcare professional before use if you are pregnant, nursing, or have a medical condition. Not intended for individuals under 18.',
    category: 'Protein',
    price: 7250, // Average of KES 6,500-8,000
    images: ['/whey.png'],
    inStock: true,
    stockQuantity: 50,
    featured: true,
    rating: 4.8,
    numReviews: 127,
  },
  {
    name: 'Mass Gainer',
    slug: generateSlug('Mass Gainer'),
    description: 'High-calorie blend for hard gainers to increase size and mass.',
    benefits: [
      'High-calorie intake',
      'Increases body weight',
      'Supports muscle size'
    ],
    ingredients: [
      'Whey Protein Concentrate',
      'Maltodextrin',
      'Oats',
      'Natural Flavors',
      'Vitamins & Minerals'
    ],
    howToUse: '1–2 servings daily between meals or post-workout.',
    warnings: 'Not intended for weight reduction. Consult a healthcare professional before use.',
    category: 'Protein',
    price: 8500, // Average of KES 7,500-9,500 (3kg)
    images: ['/massgainer.jpg'],
    inStock: true,
    stockQuantity: 30,
    featured: true,
    rating: 4.7,
    numReviews: 95,
  },
  {
    name: 'Creatine Monohydrate',
    slug: generateSlug('Creatine Monohydrate'),
    description: 'Improves strength, power, and workout performance.',
    benefits: [
      'Increases strength',
      'Improves muscle fullness',
      'Enhances workout performance'
    ],
    ingredients: [
      'Creatine Monohydrate (100% Pure)'
    ],
    howToUse: '5g daily with water.',
    warnings: 'Stay hydrated while using creatine. Consult a healthcare professional before use if you have kidney issues.',
    category: 'Strength',
    price: 3500, // Average of KES 3,000-4,000 (300g)
    images: ['/creating.webp'],
    inStock: true,
    stockQuantity: 75,
    featured: true,
    rating: 4.9,
    numReviews: 203,
  },
  {
    name: 'BCAA',
    slug: generateSlug('BCAA'),
    description: 'Reduces muscle breakdown and soreness.',
    benefits: [
      'Reduces muscle soreness',
      'Prevents muscle loss',
      'Improves endurance'
    ],
    ingredients: [
      'L-Leucine',
      'L-Isoleucine',
      'L-Valine',
      'Natural Flavors'
    ],
    howToUse: 'Before or during workouts.',
    warnings: 'Consult a healthcare professional before use if you have a medical condition.',
    category: 'Recovery',
    price: 4250, // Average of KES 3,500-5,000 (300g)
    images: ['/BCAA.jpg'],
    inStock: true,
    stockQuantity: 60,
    featured: false,
    rating: 4.6,
    numReviews: 98,
  },
  {
    name: 'Pre-Workout',
    slug: generateSlug('Pre-Workout'),
    description: 'Boosts energy, endurance, and focus.',
    benefits: [
      'Increased energy',
      'Better focus',
      'Improved endurance'
    ],
    ingredients: [
      'Caffeine Anhydrous',
      'Beta-Alanine',
      'Citrulline Malate',
      'Betaine Anhydrous',
      'Taurine'
    ],
    howToUse: 'Take 20–30 minutes before training.',
    warnings: 'Contains caffeine. Not recommended for individuals sensitive to caffeine or those under 18. Do not use if pregnant or nursing.',
    category: 'Strength',
    price: 5250, // Average of KES 4,000-6,500 (300g)
    images: ['/pre-workout.webp'],
    inStock: true,
    stockQuantity: 40,
    featured: true,
    rating: 4.7,
    numReviews: 156,
  },
  {
    name: 'Post-Workout Recovery',
    slug: generateSlug('Post-Workout Recovery'),
    description: 'Protein, carbs, and electrolytes for fast recovery.',
    benefits: [
      'Faster recovery',
      'Reduces muscle soreness',
      'Replenishes nutrients'
    ],
    ingredients: [
      'Whey Protein',
      'Dextrose',
      'Electrolytes',
      'BCAAs',
      'Glutamine'
    ],
    howToUse: 'Immediately after workouts.',
    warnings: 'Consult a healthcare professional before use if you have a medical condition.',
    category: 'Recovery',
    price: 6500, // Average of KES 5,500-7,500 (1kg)
    images: ['/post-workout.jpg'],
    inStock: true,
    stockQuantity: 45,
    featured: false,
    rating: 4.6,
    numReviews: 112,
  },
  {
    name: 'Casein Protein',
    slug: generateSlug('Casein Protein'),
    description: 'Slow-digesting protein for overnight muscle repair.',
    benefits: [
      'Prevents muscle breakdown',
      'Supports night recovery',
      'Ideal before sleep'
    ],
    ingredients: [
      'Micellar Casein',
      'Natural Flavors',
      'Stevia',
      'Cocoa Powder'
    ],
    howToUse: '1 scoop before bed.',
    warnings: 'Consult a healthcare professional before use if you are pregnant, nursing, or have a medical condition.',
    category: 'Protein',
    price: 8000, // Average of KES 7,000-9,000 (1kg)
    images: ['/casein.png'],
    inStock: true,
    stockQuantity: 35,
    featured: false,
    rating: 4.5,
    numReviews: 89,
  },
  {
    name: 'Testosterone Support',
    slug: generateSlug('Testosterone Support'),
    description: 'Supports natural testosterone and strength.',
    benefits: [
      'Supports strength',
      'Improves recovery',
      'Boosts energy levels'
    ],
    ingredients: [
      'Zinc',
      'Magnesium',
      'Vitamin D',
      'Tribulus Terrestris',
      'Fenugreek Extract',
      'D-Aspartic Acid'
    ],
    howToUse: 'Once daily with meals.',
    warnings: 'Consult a healthcare professional before use, especially if you have hormonal conditions or are taking medications.',
    category: 'Strength',
    price: 4500, // Average of KES 3,500-5,500 (60 capsules)
    images: ['/testtosteronw.webp'],
    inStock: true,
    stockQuantity: 55,
    featured: false,
    rating: 4.4,
    numReviews: 76,
  },
  {
    name: 'Omega-3 Fish Oil',
    slug: generateSlug('Omega-3 Fish Oil'),
    description: 'Supports joints, reduces inflammation.',
    benefits: [
      'Reduces soreness',
      'Supports joint mobility',
      'Improves heart health'
    ],
    ingredients: [
      'Fish Oil',
      'EPA',
      'DHA',
      'Vitamin E'
    ],
    howToUse: '1–2 capsules daily.',
    warnings: 'Consult a healthcare professional before use if you are taking blood-thinning medications or have bleeding disorders.',
    category: 'Vitamins',
    price: 3250, // Average of KES 2,500-4,000 (120 capsules)
    images: ['/omega.webp'],
    inStock: true,
    stockQuantity: 80,
    featured: false,
    rating: 4.6,
    numReviews: 134,
  },
  {
    name: 'Multivitamins',
    slug: generateSlug('Multivitamins'),
    description: 'Supports immunity, metabolism, and muscle function.',
    benefits: [
      'Prevents deficiencies',
      'Supports metabolism',
      'Improves training performance'
    ],
    ingredients: [
      'Vitamin A',
      'Vitamin C',
      'Vitamin D',
      'Vitamin E',
      'B-Complex Vitamins',
      'Minerals (Zinc, Magnesium, Iron)'
    ],
    howToUse: '1 tablet daily.',
    warnings: 'Do not exceed recommended dosage. Consult a healthcare professional before use if you are taking other medications.',
    category: 'Vitamins',
    price: 3250, // Average of KES 2,500-4,000 (90 tablets)
    images: ['/multivitamins.webp'],
    inStock: true,
    stockQuantity: 100,
    featured: false,
    rating: 4.5,
    numReviews: 167,
  },
];

const blogPosts = [
  {
    title: 'The Ultimate Guide to Protein Timing for Muscle Growth',
    slug: generateSlug('The Ultimate Guide to Protein Timing for Muscle Growth'),
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
    author: 'FARAS NUTRITION Team',
    category: 'Nutrition',
    published: true,
  },
  {
    title: 'Creatine: Everything You Need to Know',
    slug: generateSlug('Creatine: Everything You Need to Know'),
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
    author: 'FARAS NUTRITION Team',
    category: 'Supplements',
    published: true,
  },
  {
    title: '5 Essential Recovery Strategies for Athletes',
    slug: generateSlug('5 Essential Recovery Strategies for Athletes'),
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
    author: 'FARAS NUTRITION Team',
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
    try {
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);
      if (createdProducts.length > 0) {
        console.log('Sample product:', createdProducts[0].name);
      }
    } catch (error) {
      console.error('❌ Error creating products:', error.message);
      if (error.errors) {
        console.error('Validation errors:', JSON.stringify(error.errors, null, 2));
      }
      // Try creating products one by one to see which one fails
      console.log('Attempting to create products one by one...');
      for (const product of products) {
        try {
          const created = await Product.create(product);
          console.log(`✅ Created: ${created.name}`);
        } catch (err) {
          console.error(`❌ Failed to create ${product.name}:`, err.message);
        }
      }
    }

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

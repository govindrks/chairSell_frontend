import chairOne from '../assets/chairs/chair-1.jpeg'
import chairTwo from '../assets/chairs/chair-2.jpeg'
import chairThree from '../assets/chairs/chair-3.jpeg'
import chairFour from '../assets/chairs/chair-4.jpeg'
import chairFive from '../assets/chairs/chair-5.jpeg'
import chairSix from '../assets/chairs/chair-6.jpeg'

export const chairProducts = [
  {
    id: 'chair-1',
    name: 'Aureline Mesh',
    collection: 'Studio Mesh',
    tagline: 'Breathable support with a bright, polished executive profile.',
    description:
      'Designed for long desk sessions with a light frame, airy backrest, and a silhouette that keeps your workspace feeling open.',
    price: 18999,
    originalPrice: 27999,
    finish: 'Pearl grey finish',
    material: 'Mesh and alloy base',
    useCase: 'Daily work setup',
    features: ['Adjustable headrest', 'Adaptive lumbar', 'Smooth caster glide'],
    image: chairOne,
  },
  {
    id: 'chair-2',
    name: 'Verve Executive',
    collection: 'Lounge Support',
    tagline: 'Softly sculpted cushioning with a calm, premium desk presence.',
    description:
      'A generous seat and supportive back made for home offices that need a little more softness without losing structure.',
    price: 24999,
    originalPrice: 36999,
    finish: 'Warm stone tone',
    material: 'Foam comfort seat',
    useCase: 'Executive workspace',
    features: ['Deep seat comfort', 'Recline support', 'Wide armrest stance'],
    image: chairTwo,
  },
  {
    id: 'chair-3',
    name: 'Halo White Frame',
    collection: 'Air Light',
    tagline: 'A crisp white silhouette that keeps modern rooms feeling fresh.',
    description:
      'Minimal, sleek, and posture-aware, this chair brings a clean gallery feel to study corners and studio desks.',
    price: 21499,
    originalPrice: 32999,
    finish: 'White frame detail',
    material: 'Ventilated mesh shell',
    useCase: 'Creative studio desk',
    features: ['Tall back support', 'Seat height adjust', 'Balanced tilt motion'],
    image: chairThree,
  },
  {
    id: 'chair-4',
    name: 'Noir Motion Pro',
    collection: 'Gaming Edge',
    tagline: 'Bold contours and focused support for immersive work or play.',
    description:
      'An athletic seat profile with supportive padding and a dramatic shape that anchors streaming rooms and gaming corners.',
    price: 22999,
    originalPrice: 34999,
    finish: 'Graphite black',
    material: 'Cushioned performance seat',
    useCase: 'Gaming and streaming',
    features: ['High back shell', 'Segmented cushioning', 'Stable metal base'],
    image: chairFour,
  },
  {
    id: 'chair-5',
    name: 'Monarch Recline',
    collection: 'Signature Comfort',
    tagline: 'Plush, commanding seating with a richer executive attitude.',
    description:
      'A statement chair for deeper comfort, featuring fuller padding, pronounced shoulders, and a confident office look.',
    price: 26999,
    originalPrice: 41999,
    finish: 'Midnight upholstery',
    material: 'Premium leatherette',
    useCase: 'Founder office setup',
    features: ['Recline lock', 'Padded arm support', 'Extended seat comfort'],
    image: chairFive,
  },
  {
    id: 'chair-6',
    name: 'Lumen Task Chair',
    collection: 'Hybrid Office',
    tagline: 'Balanced ergonomics with a cleaner silhouette for everyday flow.',
    description:
      'A versatile work chair that pairs upright posture support with a soft, understated design for modern interiors.',
    price: 17499,
    originalPrice: 25999,
    finish: 'Cloud grey accent',
    material: 'Mesh back and fabric seat',
    useCase: 'Flexible home office',
    features: ['Neck support', 'Responsive seat pan', 'Quiet rolling base'],
    image: chairSix,
  },
]

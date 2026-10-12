import { Mission } from '../types';

export const CURATED_MISSIONS: Mission[] = [
  {
    id: 'mission-cleanup-park',
    title: 'Park Perimeter Litter Sweep',
    description: 'Walk the perimeter of a nearby public park or greenway and remove discarded plastic, wrappers, and debris from contaminating the soil.',
    category: 'cleanup',
    difficulty: 'Easy',
    durationMinutes: 20,
    xpReward: 60,
    safetyTips: [
      'Always wear puncture-resistant gloves or use a litter grabber.',
      'Never pick up broken glass, medical needles, or unknown chemicals; notify park rangers instead.',
      'Wash your hands thoroughly with soap and water after completing your walk.',
      'Stay visible to pedestrians and avoid steep roadside curbs.'
    ],
    actionSteps: [
      'Grab a reusable bag or sturdy trash receptacle and protective gloves.',
      'Walk a safe loop around the public park or green trail.',
      'Collect small non-hazardous litter (bottle caps, snack wrappers, plastic bottles).',
      'Sort recyclable items into appropriate recycling bins and dispose of residual waste.'
    ],
    impactMetricLabel: 'Litter pieces removed',
    impactUnit: 'pieces',
    suggestedDefaultImpact: 15,
    isAiGenerated: false,
  },
  {
    id: 'mission-cleanup-drain',
    title: 'Neighborhood Storm Drain Clearing',
    description: 'Clear plastic wrappers, fallen leaves, and trash trapped around neighborhood street drains before runoff carries them into rivers and oceans.',
    category: 'cleanup',
    difficulty: 'Medium',
    durationMinutes: 30,
    xpReward: 90,
    safetyTips: [
      'Wear bright or high-visibility clothing when working near curbs or streets.',
      'Never reach into or remove heavy sewer grates; only sweep surface litter around the exterior.',
      'Be alert for traffic and do not step into active roadway lanes.',
      'Wear gardening gloves to protect fingers from sharp twigs or hidden metal.'
    ],
    actionSteps: [
      'Identify 2 to 3 storm drains on your neighborhood block or walking route.',
      'Clear accumulated plastic cups, bags, and decaying debris blocking surface flow.',
      'Bag the waste securely to prevent wind from blowing it back into gutters.',
      'Ensure the drain surface allows unobstructed rainwater entry.'
    ],
    impactMetricLabel: 'Storm drains cleared',
    impactUnit: 'drains',
    suggestedDefaultImpact: 3,
    isAiGenerated: false,
  },
  {
    id: 'mission-bio-pollinators',
    title: 'Native Pollinator Garden Survey',
    description: 'Find a patch of flowering bushes, meadow flowers, or a garden bed and observe insect pollinators at work to document local ecosystem health.',
    category: 'biodiversity',
    difficulty: 'Easy',
    durationMinutes: 15,
    xpReward: 50,
    safetyTips: [
      'Maintain a calm, respectful distance of at least 2 feet from bees and wasps.',
      'If you have insect sting allergies, carry prescribed medication (e.g. EpiPen) and observe with a companion.',
      'Do not swat or trap insects; observe passively with your eyes or camera.'
    ],
    actionSteps: [
      'Locate a blooming patch of flowers in sunlight.',
      'Stand still for 10 minutes and watch for bumblebees, honeybees, butterflies, and hoverflies.',
      'Count how many distinct species of pollinator visit the flowers.',
      'Note which flower color or shape attracts the most insect activity.'
    ],
    impactMetricLabel: 'Pollinators observed',
    impactUnit: 'pollinators',
    suggestedDefaultImpact: 6,
    isAiGenerated: false,
  },
  {
    id: 'mission-bio-birds',
    title: 'Urban Bird Song & Sighting Safari',
    description: 'Tune into nature by listening for bird calls in your neighborhood trees and spotting local wild bird species in their habitat.',
    category: 'biodiversity',
    difficulty: 'Medium',
    durationMinutes: 25,
    xpReward: 75,
    safetyTips: [
      'Keep your eyes on walking trails while looking up into the canopy to avoid tripping over roots.',
      'Never disturb nesting areas, eggs, or fledglings on the ground.',
      'Do not feed human food (bread, chips) to wild birds as it causes nutritional harm.'
    ],
    actionSteps: [
      'Head outside to a tree-lined street, park, or courtyard in the morning or late afternoon.',
      'Spend 15 minutes listening silently and spotting movements in branches and grass.',
      'Identify at least 3 distinct bird species (e.g., robin, sparrow, crow, finch, pigeon).',
      'Record their physical features (beak shape, feather coloration, flight pattern).'
    ],
    impactMetricLabel: 'Bird species identified',
    impactUnit: 'species',
    suggestedDefaultImpact: 3,
    isAiGenerated: false,
  },
  {
    id: 'mission-plant-bark',
    title: 'Native Tree Bark & Canopy Identification',
    description: 'Learn to read the forest around you by examining the bark textures, leaf shapes, and canopy patterns of 3 distinct mature trees.',
    category: 'plant-id',
    difficulty: 'Easy',
    durationMinutes: 20,
    xpReward: 60,
    safetyTips: [
      'Learn to identify and avoid Poison Ivy/Poison Oak (three leaflets with pointed tips).',
      'Watch out for thorny branches or biting ants on tree trunks.',
      'Do not peel living bark or carve into trunks, which exposes trees to fungal infection.'
    ],
    actionSteps: [
      'Walk through a local wooded park or leafy neighborhood.',
      'Find 3 mature trees with noticeably different bark textures (e.g., smooth, deeply furrowed, peeling).',
      'Examine their leaf margins (toothed, smooth, or lobed) and leaf arrangement on twigs.',
      'Take a close-up photo of each tree for your personal field journal.'
    ],
    impactMetricLabel: 'Trees identified & cataloged',
    impactUnit: 'trees',
    suggestedDefaultImpact: 3,
    isAiGenerated: false,
  },
  {
    id: 'mission-plant-wildflower',
    title: 'Wildflower & Undergrowth Flora Mapping',
    description: 'Discover native groundcover and wild herbaceous plants growing in park edges, field borders, or urban sidewalks.',
    category: 'plant-id',
    difficulty: 'Medium',
    durationMinutes: 30,
    xpReward: 80,
    safetyTips: [
      'Never consume wild berries, mushrooms, or leaves—many common plants are toxic.',
      'Check ankles and pants for ticks after walking in tall grasses or woodland brush.',
      'Stay on public right-of-ways and do not trespass onto private land.'
    ],
    actionSteps: [
      'Stroll along a meadow, trail border, or community garden fringe.',
      'Spot 4 different non-cultivated wild plants or wild herbs.',
      'Observe petal counts, flower symmetry, stem shape (square vs. round), and leaf veins.',
      'Sketch or snap a photo of the most interesting bloom you encounter.'
    ],
    impactMetricLabel: 'Wild plants documented',
    impactUnit: 'plants',
    suggestedDefaultImpact: 4,
    isAiGenerated: false,
  },
  {
    id: 'mission-waste-zero-picnic',
    title: 'Zero-Waste Outdoor Commute & Walk',
    description: 'Spend at least 30 minutes outdoors completing your routine errands or walk with zero single-use plastics or disposable packaging.',
    category: 'waste-reduction',
    difficulty: 'Easy',
    durationMinutes: 30,
    xpReward: 70,
    safetyTips: [
      'Carry adequate water in a reusable container, especially in warm weather.',
      'Use pedestrian crosswalks and pay attention to ambient sounds when crossing roads.',
      'Secure reusable bottles and containers so they do not fall out while walking.'
    ],
    actionSteps: [
      'Pack a reusable stainless steel water bottle, a cloth tote bag, and a pocket handkerchief.',
      'Go on a 30-minute walk or outdoor errand without accepting any single-use plastic bags, cups, or straws.',
      'Take notice of the disposable waste generated along your route.',
      'Log each single-use plastic item you successfully avoided today.'
    ],
    impactMetricLabel: 'Single-use items avoided',
    impactUnit: 'items avoided',
    suggestedDefaultImpact: 4,
    isAiGenerated: false,
  },
  {
    id: 'mission-waste-trail-cleanup',
    title: 'Deep Nature Trail Micro-Waste Audit',
    description: 'Embark on a dedicated hiking trail or woodland path to hunt for micro-litter (bottle caps, plastic shreds, cigarette butts) that harm wildlife.',
    category: 'waste-reduction',
    difficulty: 'Hard',
    durationMinutes: 45,
    xpReward: 120,
    safetyTips: [
      'Tell a friend or family member where you are walking and your expected return time.',
      'Carry a mobile phone with full charge and sufficient water.',
      'Wear sturdy closed-toe hiking shoes to protect feet on uneven terrain.',
      'Stay strictly on marked paths to avoid soil erosion and trampling delicate saplings.'
    ],
    actionSteps: [
      'Hike along a dedicated dirt trail, nature reserve, or wooded park path.',
      'Focus your eyes on the trail edges where small micro-litter tends to hide under brush.',
      'Carefully collect small plastics, packaging remnants, and non-biodegradable debris.',
      'Carry all collected waste out in your trash bag and dispose in a trailhead bin.'
    ],
    impactMetricLabel: 'Micro-waste pieces removed',
    impactUnit: 'pieces',
    suggestedDefaultImpact: 20,
    isAiGenerated: false,
  },
  {
    id: 'mission-mindful-canopy',
    title: 'Canopy Bathing & Natural Soundscape Walk',
    description: 'Unplug from screens and immerse your senses under tree cover. Practice mindful listening to natural wind, rustling leaves, and outdoor ambience.',
    category: 'mindfulness',
    difficulty: 'Easy',
    durationMinutes: 15,
    xpReward: 40,
    safetyTips: [
      'Find a safe, dry spot away from vehicle roads and low-hanging dead branches.',
      'Apply sunscreen and insect repellent before resting in shaded woodland areas.',
      'Keep your belongings secured and within reach.'
    ],
    actionSteps: [
      'Silence your phone notifications and step outside into a shaded, tree-lined space.',
      'Sit or stand still beneath the tree canopy for 10 full minutes.',
      'Close your eyes and identify 5 distinct non-mechanical sounds (wind in leaves, birds, insects, water, footsteps on gravel).',
      'Take 10 deep, slow breaths of fresh outdoor air.'
    ],
    impactMetricLabel: 'Mindful outdoor minutes logged',
    impactUnit: 'minutes',
    suggestedDefaultImpact: 15,
    isAiGenerated: false,
  }
];

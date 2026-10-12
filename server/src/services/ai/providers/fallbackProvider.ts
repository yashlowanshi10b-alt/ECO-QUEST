import { IAiMissionProvider, GenerateMissionOptions, GeneratedMission, MissionCategory, MissionDifficulty } from '../types.js';

interface FallbackTemplate {
  title: string;
  description: string;
  category: MissionCategory;
  safetyTips: string[];
  actionSteps: string[];
  impactMetricLabel: string;
  impactUnit: string;
  suggestedDefaultImpact: number;
}

const ENVIRONMENT_TEMPLATES: Record<string, FallbackTemplate[]> = {
  park: [
    {
      title: 'Public Park Perimeter Sweep',
      description: 'Explore the boundaries of your local municipal park to clear windblown wrappers and discarded microplastics before they wash into local turf ecosystems.',
      category: 'cleanup',
      safetyTips: [
        'Wear puncture-resistant gardening gloves and use a trash grabber if available.',
        'Do not touch broken glass, metal shards, or hazardous objects directly.',
        'Stay visible on paved trails and stay alert for cyclists.'
      ],
      actionSteps: [
        'Grab a sturdy reusable collection bag or recycled bin.',
        'Walk a continuous loop around the outer park perimeter.',
        'Collect surface litter (snack packaging, bottle caps, stray straws).',
        'Sort recyclables into park recycling bins and dispose of residual waste.'
      ],
      impactMetricLabel: 'Litter items removed',
      impactUnit: 'items',
      suggestedDefaultImpact: 15,
    },
    {
      title: 'Pollinator Floral Watch',
      description: 'Locate flowering shrubbery or flower beds in the park and catalog active native bees, hoverflies, and butterflies maintaining plant diversity.',
      category: 'biodiversity',
      safetyTips: [
        'Observe from a peaceful distance of at least 2 feet to avoid disturbing pollinators.',
        'Do not touch, trap, or swat at active insects.',
        'Stay on marked pedestrian paths to protect delicate soil beds.'
      ],
      actionSteps: [
        'Find a sunny bed of open blooms or native flowering bushes.',
        'Stand motionless for 10 minutes observing insect flight patterns.',
        'Count distinct species of pollinators visiting nectar sources.',
        'Sketch or mentally note the physical markings of the most active visitor.'
      ],
      impactMetricLabel: 'Pollinators observed',
      impactUnit: 'pollinators',
      suggestedDefaultImpact: 8,
    }
  ],
  forest: [
    {
      title: 'Ancient Tree Bark & Canopy Survey',
      description: 'Hike through woodland paths to identify distinct mature native tree species by their bark fissures, canopy patterns, and fallen leaves.',
      category: 'plant-id',
      safetyTips: [
        'Stay strictly on marked trail ways to prevent woodland soil erosion.',
        'Check pants and socks for ticks upon exiting tall grassy borders.',
        'Do not strip or carve into live tree trunks, which harms tree defenses.'
      ],
      actionSteps: [
        'Walk along a shaded forest trail examining mature tree trunks.',
        'Identify 3 different trees with distinct bark textures (smooth, furrowed, peeling).',
        'Inspect the leaf litter to determine if leaves are simple, compound, or needle-like.',
        'Log their physical characteristics and canopy heights in your outdoor journal.'
      ],
      impactMetricLabel: 'Forest trees cataloged',
      impactUnit: 'trees',
      suggestedDefaultImpact: 3,
    },
    {
      title: 'Leave No Trace Trail Cleanup',
      description: 'Clean along hiking trail borders where micro-debris from snacks and water bottles tends to collect under roots and brush.',
      category: 'cleanup',
      safetyTips: [
        'Wear sturdy footwear with good traction on uneven dirt and roots.',
        'Carry adequate drinking water and protect against sun and insects.',
        'Notify trail rangers if you encounter large fly-tipping waste.'
      ],
      actionSteps: [
        'Hike a scenic 1-mile trail section with a dedicated waste bag.',
        'Scan the 3-foot margin on either side of the trail for hidden plastic.',
        'Carefully collect bottle caps, foil wrappers, and discarded labels.',
        'Pack out all collected debris to trailhead recycling or trash bins.'
      ],
      impactMetricLabel: 'Trail micro-waste removed',
      impactUnit: 'pieces',
      suggestedDefaultImpact: 12,
    }
  ],
  neighborhood: [
    {
      title: 'Block-by-Block Storm Drain Sweep',
      description: 'Walk your neighborhood streets and clear fallen leaves and plastic debris blocking storm drain grates before rains wash them into local streams.',
      category: 'cleanup',
      safetyTips: [
        'Always wear high-visibility or bright clothing when working along curbs.',
        'Never enter or lift heavy street sewer grates; only sweep exterior debris.',
        'Watch for approaching vehicles and step safely onto the sidewalk.'
      ],
      actionSteps: [
        'Walk your residential block inspecting street-level storm drain grates.',
        'Use gloves to remove trapped plastic wrappers, bottles, and rotting leaves.',
        'Bag the accumulated debris securely so wind does not scatter it.',
        'Confirm clear surface water flow into the drain.'
      ],
      impactMetricLabel: 'Storm drains cleared',
      impactUnit: 'drains',
      suggestedDefaultImpact: 3,
    },
    {
      title: 'Sidewalk Flora & Micro-Greenery Hunt',
      description: 'Discover the resilience of urban ecology by locating wild native flora and mosses thriving in pavement cracks, brick walls, and curb edges.',
      category: 'plant-id',
      safetyTips: [
        'Keep one eye on pedestrian foot traffic and property boundaries.',
        'Never consume wild plants or berries found in urban sidewalk borders.',
        'Wash hands with soap after your neighborhood nature walk.'
      ],
      actionSteps: [
        'Walk along your street inspecting sidewalk seams and garden borders.',
        'Identify 4 distinct plant varieties growing in micro-habitats.',
        'Observe how plants establish roots and retain moisture without cultivation.',
        'Record leaf shape, flower color, and location in your field notes.'
      ],
      impactMetricLabel: 'Urban flora species spotted',
      impactUnit: 'plants',
      suggestedDefaultImpact: 4,
    }
  ],
  beach: [
    {
      title: 'Shoreline Plastic Tide Line Cleanup',
      description: 'Walk the high-tide line of a beach, lakefront, or riverbank and recover floating plastics before wave action breaks them down.',
      category: 'cleanup',
      safetyTips: [
        'Stay mindful of tide schedules, sudden waves, and slippery wet rocks.',
        'Wear footwear to protect feet from sharp shells or hidden debris.',
        'Avoid disturbing resting coastal shorebirds or nesting dunes.'
      ],
      actionSteps: [
        'Walk along the natural strandline where seafoam and flotsam accumulate.',
        'Collect small plastic pieces, bottle caps, ropes, and polystyrene foam.',
        'Separate recyclable bottles from non-recyclable ocean debris.',
        'Dispose of ocean waste in shoreline bins.'
      ],
      impactMetricLabel: 'Waterway debris pieces gathered',
      impactUnit: 'pieces',
      suggestedDefaultImpact: 18,
    }
  ],
  backyard: [
    {
      title: 'Backyard Biodiversity Bio-Blitz',
      description: 'Turn your yard or garden patch into a research habitat by documenting every insect, bird, and fungus living in your immediate surroundings.',
      category: 'biodiversity',
      safetyTips: [
        'Carefully lift stones or logs and replace them gently to preserve habitats.',
        'Avoid stinging insects and wear garden gloves when exploring leaf piles.',
        'Observe wildlife without handling or causing distress.'
      ],
      actionSteps: [
        'Select a 10x10 foot area of your yard, balcony planter, or garden.',
        'Examine soil, underside of leaves, and tree bark for invertebrate life.',
        'Count distinct species of beetles, earthworms, spiders, or visiting birds.',
        'Write down your observations to track your yard’s seasonal biodiversity.'
      ],
      impactMetricLabel: 'Backyard species cataloged',
      impactUnit: 'species',
      suggestedDefaultImpact: 5,
    }
  ],
  urban: [
    {
      title: 'Urban Soundscape & Tree Canopy Walk',
      description: 'Unplug your headphones and walk through your city or town center, isolating natural sounds (birds, wind, rustling trees) from city traffic noise.',
      category: 'mindfulness',
      safetyTips: [
        'Use designated pedestrian crossings and remain aware of street traffic.',
        'Stay in well-lit public corridors during daytime or early evening.',
        'Keep valuables safely stored while practicing mindful awareness.'
      ],
      actionSteps: [
        'Turn off mobile notifications and walk through an urban tree-lined corridor.',
        'Listen intentionally for 15 minutes to distinguish bird calls above ambient motor noise.',
        'Locate 3 street trees providing shade canopy to pedestrians.',
        'Take 10 deep breaths reflecting on nature’s cooling role in urban centers.'
      ],
      impactMetricLabel: 'Mindful outdoor minutes logged',
      impactUnit: 'minutes',
      suggestedDefaultImpact: 20,
    }
  ]
};

export class FallbackMissionProvider implements IAiMissionProvider {
  readonly name = 'Curated Offline Fallback';

  async generate(options: GenerateMissionOptions): Promise<GeneratedMission> {
    const envKey = options.environment && ENVIRONMENT_TEMPLATES[options.environment] 
      ? options.environment 
      : 'park';

    const templates = ENVIRONMENT_TEMPLATES[envKey] || ENVIRONMENT_TEMPLATES.park;
    
    // Pick template based on focus area if specified, else rotate
    let matched = templates[0];
    if (options.focusArea) {
      const found = templates.find(t => t.category === options.focusArea);
      if (found) matched = found;
    }

    const duration = options.durationMinutes || 25;
    const difficulty: MissionDifficulty = options.difficulty || 'Easy';

    // Scale XP with duration and difficulty
    const difficultyMultiplier = difficulty === 'Hard' ? 1.4 : difficulty === 'Medium' ? 1.2 : 1.0;
    const calculatedXp = Math.round((40 + duration * 1.5) * difficultyMultiplier);

    const id = `fallback-mission-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    return {
      id,
      title: matched.title,
      description: matched.description,
      category: matched.category,
      difficulty,
      durationMinutes: duration,
      xpReward: calculatedXp,
      safetyTips: matched.safetyTips,
      actionSteps: matched.actionSteps,
      impactMetricLabel: matched.impactMetricLabel,
      impactUnit: matched.impactUnit,
      suggestedDefaultImpact: matched.suggestedDefaultImpact,
      isAiGenerated: false,
      modelAttribution: 'Offline Curated Fallback (No Cloud Key / Offline)',
      generatedAt: new Date().toISOString(),
    };
  }
}

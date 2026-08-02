import { ThemeConfig } from '../types';

export const THEMES_DATA: ThemeConfig[] = [
  {
    id: 'ancient_india',
    title: 'Ancient India: Mythic Clash',
    subtitle: 'Royal Forts, Golden Mandala Elements & Regal Craftsmanship',
    description: 'Inspired by ancient royal games of kings (Pachisi, Moksha Patam, and Mughal archers). Features rich golden filigree, warm sandstone hues, saffron silks, and intricate stone carvings.',
    colors: {
      primary: '#D97706', // Saffron Gold
      secondary: '#991B1B', // Royal Crimson
      accent: '#059669', // Emerald Jade
      background: '#2A1810', // Deep Sandstone Charcoal
      cardBg: '#3D2316', // Carved Wood / Palace Marble
      text: '#FEF3C7', // Ivory Gold
      player1Color: '#F59E0B', // Saffron Fire
      player2Color: '#10B981', // Royal Emerald
    },
    uiStyle: 'Intricate brass and carved sandstone frames, glowing mandala accents, warm velvet modal backgrounds, and ornate scrollwork borders.',
    fonts: {
      display: 'Cinzel / Samarkan style serif with royal sharp serifs',
      body: 'Plus Jakarta Sans / Inter with clean legibility',
    },
    iconsStyle: 'Hand-carved brass emblems, lotus motifs, crossed scimitars, royal seals, and elephant/peacock insignias.',
    musicStyle: 'Traditional sitar, tabla rhythms, bansuri flute melodies, layered with majestic orchestral brass swells.',
    sfxStyle: 'Resonant temple gongs, wooden tile clacks, metallic blade shimmers, and roaring arena crowd cheers.',
    backgroundsDescription: 'Palace courtyards with shimmering reflection pools, sunset over sandstone forts, and royal durbar halls with silk canopy draping.',
    characterStyle: 'Stylized 3D low-poly royal warriors, archers, and mystical guardians adorned with turbans, armor, and golden armlets.',
    previewImagePrompt: 'Ancient Indian palace court arena, golden lotus motifs, saffron and royal crimson banner lighting, high quality game UI'
  },
  {
    id: 'futuristic_arena',
    title: 'Futuristic Arena: Cyber Duo 3099',
    subtitle: 'Neon Cyberpunk Grid, Holographic UI & Synthetic Energy',
    description: 'Set in a high-octane sci-fi esports colosseum. Sleek glassmorphic HUDs, glowing neon trails, angular carbon fiber surfaces, and synthwave visuals.',
    colors: {
      primary: '#06B6D4', // Cyber Cyan
      secondary: '#EC4899', // Neon Magenta
      accent: '#8B5CF6', // Plasma Violet
      background: '#0F172A', // Midnight Carbon
      cardBg: '#1E293B', // Dark Glass Slate
      text: '#F1F5F9', // Pure Hologram White
      player1Color: '#00F0FF', // Electric Cyan
      player2Color: '#FF007A', // Hot Magenta
    },
    uiStyle: 'Clean hexagonal grids, semi-transparent holographic glass, glowing scanlines, reactive neon borders, and digital particle sparks.',
    fonts: {
      display: 'Orbitron / Rajdhani bold futuristic display',
      body: 'Space Grotesk / Inter clean tech font',
    },
    iconsStyle: 'Laser vectors, circuit nodes, power core symbols, neon badges, and angular cyber weaponry.',
    musicStyle: 'High-tempo Synthwave, Electro-House, pulse basslines, futuristic synth arpeggios, and energetic cyber beats.',
    sfxStyle: 'Laser zaps, plasma impacts, mechanical servo whirs, digital countdown tones, and synth victory fanfare.',
    backgroundsDescription: 'Suspended holographic platforms above a neon metropolis skyline, dark carbon arenas with interactive floor light grids.',
    characterStyle: 'Cybernetic avatars, robot contenders, and armored pilots with glowing visors, jetpacks, and energy trails.',
    previewImagePrompt: 'Futuristic cyberpunk esports arena, glowing cyan and magenta neon UI HUD, dark slate background, sci-fi game UI'
  },
  {
    id: 'cartoon_sports',
    title: 'Cartoon Sports Festival',
    subtitle: 'Vibrant Playful World, Chunky Buttons & Satisfying Physics',
    description: 'A bouncy, joyful, and highly accessible universe filled with expressive animal athletes, oversized sports gear, comic book popups, and squishy physics.',
    colors: {
      primary: '#3B82F6', // Vivid Royal Blue
      secondary: '#EF4444', // Energetic Cherry Red
      accent: '#10B981', // Grass Green
      background: '#FEF3C7', // Warm Creamy Sunshine
      cardBg: '#FFFFFF', // Clean White Card
      text: '#1E293B', // Dark Slate
      player1Color: '#2563EB', // Blue Champion
      player2Color: '#DC2626', // Red Rival
    },
    uiStyle: 'Chunky 3D pill buttons, thick dark outlines (comic book style), tactile drop shadows, squishy button press animations, and colorful confetti sprays.',
    fonts: {
      display: 'Fredoka / Titan One rounded playful typeface',
      body: 'Nunito / Plus Jakarta Sans soft rounded font',
    },
    iconsStyle: 'Expressive hand-drawn sporting icons: star trophies, whistle badges, bouncing balls, foam fingers, and smiling banners.',
    musicStyle: 'Upbeat funk-pop, cheerful brass horns, energetic whistling tunes, and rhythmic acoustic basslines.',
    sfxStyle: 'Boing spring jumps, rubber squeaks, whistle blows, comical pop sounds, and enthusiastic stadium crowd chants.',
    backgroundsDescription: 'Sunlit stadium grass fields, beach volleyball sands, colorful indoor gymnasiums, and floating balloon-decorated parks.',
    characterStyle: 'Chubby, lovable 3D animal athletes (Bear, Fox, Penguin, Panda) wearing jerseys, sweatbands, and silly expressions.',
    previewImagePrompt: 'Vibrant cartoon sports stadium, chunky colorful UI elements, cheerful sunny atmosphere, mobile game UI'
  }
];

import { ChecklistCategory } from '../types';

export const CHECKLISTS_DATA: ChecklistCategory[] = [
  {
    id: 'assets',
    title: '1. Asset Checklist',
    description: 'Ensure all 2D, 3D, material, particle, and texture assets are created and imported.',
    items: [
      { id: 'ast_1', task: '30 Mini-Game Icon Badges', details: '512x512 transparent PNGs with consistent category border trims', completed: true },
      { id: 'ast_2', task: '3 Theme Asset Bundles', details: 'Ancient India (Sandstone/Gold), Cyberpunk (Neon/Slate), Cartoon Sports (Vivid)', completed: true },
      { id: 'ast_3', task: 'Player Avatars & Crowns', details: '16 unique avatar icons + 3 victory crown models', completed: true },
      { id: 'ast_4', task: 'Game Objects & Props', details: 'Pucks, Tanks, Air Hockey Paddles, Sumo Rings, Soccer Caps, Lasers, Bombs', completed: true },
      { id: 'ast_5', task: 'Particle FX Library', details: 'Goal Explosions, Confetti Canons, Spark Hits, Smoke Dust, Tire Skid Marks', completed: true }
    ]
  },
  {
    id: 'animations',
    title: '2. Animation Checklist',
    description: 'Verify smooth 60 FPS character, UI tweening, and environment animations.',
    items: [
      { id: 'anm_1', task: 'UI Button Press Tweens', details: 'Squishy scale down on touch press (0.92x) with elastic bounce on release', completed: true },
      { id: 'anm_2', task: 'Match Countdown Sequence', details: '3, 2, 1, GO! scale pop with camera zoom-in effect', completed: true },
      { id: 'anm_3', task: 'Victory & Reward Confetti', details: 'Screen confetti shower + coin flying trajectory into top header', completed: true },
      { id: 'anm_4', task: 'Character Victory Loops', details: 'Jumping, waving, or flexing victory animations for P1 and P2 avatars', completed: true },
      { id: 'anm_5', task: 'Tile & Board Flip FX', details: 'Smooth 90-degree snap rotations and card flip shaders', completed: true }
    ]
  },
  {
    id: 'audio',
    title: '3. Audio Checklist',
    description: 'Acoustic SFX, pitch variance, and dynamic background music loops.',
    items: [
      { id: 'aud_1', task: '3 Theme Background Music Tracks', details: 'Seamlessly looping MP3s (Sitar/Tabla, Synthwave, Funk-Pop)', completed: true },
      { id: 'aud_2', task: 'Core UI Sound Pool', details: 'Button clicks, tab swooshes, modal open chimes, coin pickup clink', completed: true },
      { id: 'aud_3', task: 'Physics Impact Sound Bank', details: 'Puck bounces, tank cannon blasts, puck goal swish, sumo thuds', completed: true },
      { id: 'aud_4', task: 'Randomized Pitch Shifter', details: 'Vary SFX pitch by +/- 5% to eliminate repetitive audio fatigue', completed: true },
      { id: 'aud_5', task: 'AudioMixer Master / BGM / SFX Groups', details: 'Independent volume sliders connected to player settings save file', completed: true }
    ]
  },
  {
    id: 'ui',
    title: '4. UI Checklist',
    description: 'Screen adaptation, notch padding, touch targets, and contrast compliance.',
    items: [
      { id: 'ui_1', task: 'Safe Area Notch Adapter', details: 'Verified on iPhone Dynamic Island and Android camera punch-holes', completed: true },
      { id: 'ui_2', task: '44px+ Minimum Touch Targets', details: 'All gameplay buttons comply with mobile touch guidelines', completed: true },
      { id: 'ui_3', task: 'Dual Player Screen Partition', details: 'P1 top half rotated 180 degrees or side-by-side for face-to-face play', completed: true },
      { id: 'ui_4', task: 'WCAG AA Color Contrast Audit', details: 'Checked text legibility on dark and light theme background cards', completed: true },
      { id: 'ui_5', task: 'Multi-Resolution Scaling Test', details: 'Tested on 16:9, 19.5:9 phone ratios and 4:3 tablet aspect ratios', completed: true }
    ]
  },
  {
    id: 'testing',
    title: '5. Testing Checklist',
    description: 'Comprehensive QA, multi-touch verification, and low-end memory stress tests.',
    items: [
      { id: 'tst_1', task: 'Multi-Touch Simultaneous Stress Test', details: 'Verify 10 simultaneous touch points across P1 and P2 halves', completed: true },
      { id: 'tst_2', task: 'Low-End Device Matrix Test', details: 'Tested on Samsung Galaxy A12 (2GB RAM) and Xiaomi Redmi 9A', completed: true },
      { id: 'tst_3', task: 'Offline Mode Persistence Test', details: 'Play 20 matches with Airplane Mode enabled; verify zero crashes and save consistency', completed: true },
      { id: 'tst_4', task: 'Interrupted Play & Pause Recovery', details: 'Test incoming phone calls, home button minimize, and task switcher recovery', completed: true },
      { id: 'tst_5', task: 'Ad Network & IAP Sandbox Validation', details: 'Verify Rewarded Video 2x coin grant and No-Ads purchase removal', completed: true }
    ]
  },
  {
    id: 'optimization',
    title: '6. Performance Optimization Checklist',
    description: 'Sustained 60 FPS, draw call minimization, and zero garbage collection spikes.',
    items: [
      { id: 'opt_1', task: 'Sprite Atlasing Combination', details: 'Draw calls reduced from 110+ down to < 22 calls per frame', completed: true },
      { id: 'opt_2', task: 'Garbage Collection (GC) Audit', details: 'Zero allocations in Update() methods across all 30 mini-games', completed: true },
      { id: 'opt_3', task: 'URP Shader Lightweight Pass', details: 'Disabled heavy post-processing bloom/shadows on low-end quality tier', completed: true },
      { id: 'opt_4', task: 'Physics Fixed Timestep Calibration', details: 'Set Fixed Delta Time to 0.02s (50Hz) with Layer Collision Matrix filtering', completed: true },
      { id: 'opt_5', task: 'Texture Compression (ASTC 6x6 / ETC2)', details: 'Total APK size compressed under 65 MB', completed: true }
    ]
  },
  {
    id: 'launch',
    title: '7. Play Store Launch Checklist',
    description: 'Google Play Store requirements, privacy policy, target API level, and app bundle.',
    items: [
      { id: 'lch_1', task: 'Android App Bundle (.aab) Build', details: 'Compiled 64-bit ARM64 release bundle targeting API Level 34', completed: true },
      { id: 'lch_2', task: 'Google Play Console Metadata & Store Listing', details: 'App Title, 80-char Short Description, Full Description, Feature Graphic 1024x500', completed: true },
      { id: 'lch_3', task: 'Device Screenshots Suite', details: '8 phone screenshots (1080x1920) + 4 7-inch & 10-inch tablet screenshots', completed: true },
      { id: 'lch_4', task: 'Privacy Policy & Data Safety Form', details: 'Disclosed Ad identifiers (AAID) and local offline save data declaration', completed: true },
      { id: 'lch_5', task: 'Internal Testing Track Rollout', details: 'Deployed build to 15 internal tester devices before production release', completed: true }
    ]
  }
];

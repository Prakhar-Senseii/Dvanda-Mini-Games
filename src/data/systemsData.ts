export interface SystemDocSection {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  details: {
    heading: string;
    content: string;
    bulletPoints?: string[];
    codeOrConfig?: string;
  }[];
}

export const SYSTEMS_DATA: SystemDocSection[] = [
  {
    id: 'home_ui',
    title: 'Home Screen UI Architecture',
    iconName: 'Layout',
    summary: 'Sleek, instantaneous 1-tap menu layout designed for immediate 2-player local battle entry without friction.',
    details: [
      {
        heading: 'Layout Hierarchy & Component Placement',
        content: 'The home screen uses a dual-side player avatar header (Player 1 Left / Player 2 Right) with a prominent central "QUICK MATCH" button and a responsive 2-column or horizontal mini-game carousel.',
        bulletPoints: [
          'Top Bar: Player 1 Avatar (Red), Coin Balance, Gem Balance, Settings Gear, Player 2 Avatar (Blue)',
          'Central Action Area: Big "2 PLAYERS (SAME DEVICE)" Primary Button with glowing animated border',
          'Secondary Modes: "TOURNAMENT MODE" (Cup Series) & "BOT PRACTICE (1 Player vs AI)"',
          'Mini-Game Grid Carousel: Filterable by category (Sports, Arcade, Board, Puzzle, etc.)',
          'Bottom Navigation Dock: Home | Daily Quests | Lucky Wheel | Achievements | Shop'
        ]
      },
      {
        heading: 'Mobile Responsive Adapters',
        content: 'Supports automatically detecting device orientation and aspect ratios (16:9, 19.5:9 notch phones, and 4:3 Android tablets). Safe-Area Insets are applied dynamically using Unity Screen.safeArea.',
        bulletPoints: [
          'Automatic Notch & Camera Punch-hole padding (Canvas Scaler set to Match Width Or Height = 0.5)',
          'Dynamic grid columns: 2 columns on portrait phones, 4-5 columns on landscape tablets',
          'Haptic tactile feedback on all menu button presses using Android VibrationEffect API'
        ]
      }
    ]
  },
  {
    id: 'navigation_flow',
    title: 'Navigation Flow & Screen Transitions',
    iconName: 'GitMerge',
    summary: 'Non-blocking, asynchronous scene loading hierarchy using a persistent Core App State Controller.',
    details: [
      {
        heading: 'Screen Graph Hierarchy',
        content: '1. Splash Screen (1.2s asset preload) -> 2. Main Lobby -> 3. Game Selection Modal -> 4. Match Controls Overlay -> 5. Active Game Scene -> 6. Victory & Coin Reward Overlay.',
        bulletPoints: [
          'Splash Screen: Loads SaveData, init Firebase/Unity Ads, warms up Object Pool',
          'Main Lobby: Instant tab switching without reload (UI Canvas group alpha fades)',
          'Match Setup Overlay: Choose rounds (1, 3, or 5 wins), select Theme skin, choose Player handicap',
          'In-Game Overlay: Split Pause Button (requires BOTH P1 and P2 confirmation to pause)',
          'Victory Screen: Winner celebration, rematch button, coin doubler (Rewarded Ad), home button'
        ]
      }
    ]
  },
  {
    id: 'player_progression',
    title: 'Player Progression & Leveling',
    iconName: 'Award',
    summary: 'XP-based leveling engine rewarding play time, winning streaks, and mastering different categories.',
    details: [
      {
        heading: 'XP Formula & Tier Progression',
        content: 'Players gain XP from every completed match (Win = 100 XP, Draw = 50 XP, Loss = 30 XP, Flawless Victory Bonus = +50 XP).',
        bulletPoints: [
          'XP required for Level N: XP = 100 * (Level ^ 1.4)',
          'Level 1-10: Novice Duelist (Unlocks basic board & sports games)',
          'Level 11-25: Arena Master (Unlocks golden pucks, custom avatars, night themes)',
          'Level 26-50: Legend Supreme (Unlocks exclusive Mythic India & Cyberpunk themes, custom win animations)'
        ]
      }
    ]
  },
  {
    id: 'economy_rewards',
    title: 'Coins, Gems & Rewards Economy',
    iconName: 'Coins',
    summary: 'Balanced offline-first economy with daily spin wheels, streak bonuses, and zero pay-to-win mechanics.',
    details: [
      {
        heading: 'Currency Breakdown',
        content: 'Two non-inflationary currencies drive customization and cosmetic unlocks:',
        bulletPoints: [
          'Coins (Soft Currency): Earned by playing matches (20-50 per match). Used to buy avatars, puck skins, and theme palettes.',
          'Gems (Hard Currency): Earned via Achievements & Daily Missions. Used to unlock premium game categories or instant ad bypasses.',
          'Coin Doubler (Watch Ad): Multiplies match coins by 2x after any victory.',
          'Lucky Wheel: Free spin every 12 hours awarding 50 to 500 coins or 5-20 gems.'
        ]
      }
    ]
  },
  {
    id: 'achievements_missions',
    title: 'Achievements & Daily Missions',
    iconName: 'Target',
    summary: '30+ tiered achievements and a rotating 3-quest daily mission system to drive daily retention.',
    details: [
      {
        heading: 'Daily Missions (Resets every 24h)',
        content: '3 randomly generated daily tasks encouraging gameplay diversity:',
        bulletPoints: [
          '1. "Arcade Ace": Win 2 matches in Tank Duel or Laser Dodge (+150 Coins)',
          '2. "Speed Demon": Achieve a reaction time under 200ms in Speed Tap (+10 Gems)',
          '3. "Duel Master": Complete 5 total 2-player matches (+200 Coins)'
        ]
      },
      {
        heading: 'Achievement Tiers',
        content: 'Bronze, Silver, Gold, and Diamond tiers for long-term engagement (e.g. "Clash Veteran": Win 100 total matches).'
      }
    ]
  },
  {
    id: 'login_rewards',
    title: '7-Day Login Rewards Calendar',
    iconName: 'Calendar',
    summary: 'Sequential streak calendar with escalating rewards culminating in exclusive legendary theme skins.',
    details: [
      {
        heading: '7-Day Streak Rewards Breakdown',
        content: 'Day 1: 100 Coins | Day 2: 250 Coins | Day 3: 15 Gems | Day 4: Custom Avatar | Day 5: 500 Coins | Day 6: 30 Gems | Day 7: Mythic Saffron Theme Skin + 1000 Coins.'
      }
    ]
  },
  {
    id: 'statistics',
    title: 'Match Statistics & Analytics',
    iconName: 'BarChart2',
    summary: 'Comprehensive head-to-head records tracking P1 vs P2 rivalries and category performance.',
    details: [
      {
        heading: 'Tracked Metrics',
        content: 'Local player profiles maintain persistent rivalry history:',
        bulletPoints: [
          'Head-to-Head Win/Loss ratio (e.g. P1: 42 Wins (58%) vs P2: 30 Wins (42%))',
          'Favorite Mini-Game & Category Mastery (e.g. 85% Win rate in Arcade category)',
          'Average Reaction Time in millisecond-accurate reflex games',
          'Longest winning streak and total matches played together'
        ]
      }
    ]
  },
  {
    id: 'settings_accessibility',
    title: 'Settings & Accessibility Options',
    iconName: 'Sliders',
    summary: 'Inclusion-first accessibility suite ensuring smooth play on all screen sizes, hands, and vision needs.',
    details: [
      {
        heading: 'Settings Controls',
        content: 'Master Volume, SFX, BGM, Haptic Vibration Intensity (Off / Soft / Heavy), Target Frame Rate (30 FPS Battery Saver / 60 FPS Smooth).',
        bulletPoints: [
          'Colorblind Filters: Protanopia, Deuteranopia, Tritanopia UI palette shaders',
          'Touch Target Scaling: Increase button touch radius by +20% or +40% for larger fingers or small devices',
          'High Contrast UI Mode: Outlines active controls with thick high-contrast borders',
          'One-Handed / Side-by-Side Swap: Flip P1 and P2 controls for left-handed ergonomics'
        ]
      }
    ]
  },
  {
    id: 'monetization',
    title: 'Monetization Strategy (Ads + Premium)',
    iconName: 'DollarSign',
    summary: 'Ethical, high-eCPM monetization respecting player flow while maximizing ARPU.',
    details: [
      {
        heading: 'Ad Placement & Frequency Rules',
        content: 'Designed with Unity Ads & Google AdMob mediation rules:',
        bulletPoints: [
          'Rewarded Video Ads (Opt-in): 2x Coin Multiplier on Victory screen, Free Lucky Wheel Spin, Extra Life in solo mode.',
          'Interstitial Ads (Strict Capping): Triggered ONCE every 4 completed mini-game matches. NEVER during gameplay or between rapid 10-second games.',
          'Banner Ads: Optional subtle banner in non-game lobby menus only. Disabled completely during active split-screen play.',
          'No-Ads IAP ($2.99): Permanently removes all forced interstitial ads and awards 500 instant bonus gems.'
        ]
      }
    ]
  },
  {
    id: 'save_system',
    title: 'Save System & Cloud Sync',
    iconName: 'Database',
    summary: 'Ultra-fast binary/JSON local file save with AES-256 encryption and Google Play Games Cloud Sync fallback.',
    details: [
      {
        heading: 'Data Architecture & Encryption',
        content: 'Local save file stored in Application.persistentDataPath/user_profile.dat using JsonUtility serialized C# data contract.',
        bulletPoints: [
          'AES-256 Encryption prevents local coin tampering on rooted Android devices',
          'Automatic Backup: Atomic write pattern (write to .tmp then swap) to prevent corrupted saves during crashes',
          'Google Play Games Cloud Saved Games API integration for automatic cross-device sync'
        ]
      }
    ]
  },
  {
    id: 'expansion_system',
    title: 'Future Expansion & Modular Architecture',
    iconName: 'PackagePlus',
    summary: 'Plug-and-play Addressables pipeline allowing new mini-games to be added as asset bundles without app updates.',
    details: [
      {
        heading: 'ScriptableObject Mini-Game Registry',
        content: 'Every mini-game is encapsulated into a self-contained ScriptableObject definition containing its Prefab reference, metadata, rules, and audio clips.',
        bulletPoints: [
          'Addressable Assets: Download new seasonal mini-game packs over-the-air (OTA)',
          'Decoupled Controller: MiniGameBase C# class handles lifecycle (Init, Countdown, Start, Pause, End, Score) generically'
        ]
      }
    ]
  }
];

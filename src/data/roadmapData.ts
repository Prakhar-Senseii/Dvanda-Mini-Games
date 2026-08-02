import { MilestoneData } from '../types';

export const ROADMAP_DATA: MilestoneData[] = [
  {
    number: 1,
    title: 'Milestone 1: Core Framework Architecture',
    subtitle: 'Foundation, Engine Config, Project Structure & Singletons',
    estimatedWeeks: 2,
    summary: 'Establish the C# project skeleton, SOLID core singletons, persistent data contracts, theme manager, and audio poolers in Unity.',
    tasks: [
      'Initialize Unity 2022/2023 LTS project with Universal Render Pipeline (URP)',
      'Set target FPS = 60, VSync = off, and configure Android manifest settings',
      'Implement GameManager persistent state machine (Boot -> Lobby -> InGame -> Paused -> GameOver)',
      'Create SaveSystem with AES-256 encryption & atomic write safeguards',
      'Build AudioManager with SFX/BGM AudioMixer groups and voice pooling',
      'Set up ThemeManager ScriptableObject architecture for instant theme swaps'
    ],
    folderStructure: [
      'Assets/Scripts/Core/ (GameManager, AppState)',
      'Assets/Scripts/Save/ (SaveSystem, SaveDataContract, Encryption)',
      'Assets/Scripts/Audio/ (AudioManager, SoundData, AudioPool)',
      'Assets/Scripts/Theme/ (ThemeManager, ThemeConfigSO)',
      'Assets/Scripts/Utilities/ (ObjectPooler, Singleton, ExtensionMethods)'
    ],
    scripts: ['GameManager.cs', 'SaveSystem.cs', 'AudioManager.cs', 'ThemeManager.cs', 'ObjectPooler.cs', 'PersistentSingleton.cs'],
    classes: ['GameManager : PersistentSingleton<GameManager>', 'SaveDataContract', 'AudioPoolItem', 'ThemeConfigSO : ScriptableObject'],
    prefabs: ['[CoreManagers].prefab', '[AudioSourcePool].prefab', '[CanvasRoot].prefab']
  },
  {
    number: 2,
    title: 'Milestone 2: User Interface & Navigation',
    subtitle: 'Responsive UI Canvas, Navigation Flow & Animated Menus',
    estimatedWeeks: 2,
    summary: 'Build responsive UI layouts, main lobby, player profile headers, modal popups, daily quest drawer, and theme selector.',
    tasks: [
      'Implement Canvas Scaler with Safe Area Inset adapter for notch/punch-hole displays',
      'Create Main Lobby UI with P1/P2 avatars, currency headers, and quick match CTA',
      'Build Mini-Game Selection Carousel with category filtering tabs',
      'Develop Match Setup Overlay (Round count, Theme picker, Handicap controls)',
      'Create Victory Overlay with coin animation rewards and 2x Ad button',
      'Integrate DOTween / LeanTween UI transition animations (fades, scale-bounces)'
    ],
    folderStructure: [
      'Assets/Scripts/UI/Lobby/ (LobbyController, CategoryTabBar, AvatarView)',
      'Assets/Scripts/UI/Modals/ (MatchSetupModal, SettingsModal, VictoryModal)',
      'Assets/Scripts/UI/Common/ (SafeAreaAdapter, UIButtonAnimator, CoinCounterAnimation)'
    ],
    scripts: ['LobbyController.cs', 'MatchSetupModal.cs', 'VictoryOverlayController.cs', 'SafeAreaAdapter.cs', 'UIButtonAnimator.cs'],
    classes: ['LobbyController : MonoBehaviour', 'MatchSettings', 'VictoryModalData', 'SafeAreaAdapter : MonoBehaviour'],
    prefabs: ['UIRootCanvas.prefab', 'LobbyView.prefab', 'MatchSetupModal.prefab', 'VictoryOverlay.prefab', 'MiniGameCardItem.prefab']
  },
  {
    number: 3,
    title: 'Milestone 3: Touch & Input Engine',
    subtitle: 'Multi-Touch Split-Screen Parser & Virtual Joystick System',
    estimatedWeeks: 1.5,
    summary: 'Develop high-performance multi-touch system handling simultaneous P1 and P2 touches on phone and tablet screens.',
    tasks: [
      'Implement TouchInputManager reading Input.touches or New Input System Multi-Touch API',
      'Partition screen touch coordinates into Player 1 Zone (Top/Left) and Player 2 Zone (Bottom/Right)',
      'Develop VirtualJoystick UI component with dynamic anchor positioning',
      'Build Slingshot trajectory parser for physics games (Finger Soccer, Dunk Battle)',
      'Implement Tap/Hold/Mash detection helpers with haptic feedback hooks'
    ],
    folderStructure: [
      'Assets/Scripts/Input/ (TouchInputManager, VirtualJoystick, SlingshotTouchHandler, ScreenZonePartition)'
    ],
    scripts: ['TouchInputManager.cs', 'VirtualJoystick.cs', 'SlingshotTouchHandler.cs', 'HapticFeedbackManager.cs'],
    classes: ['TouchInputManager : Singleton<TouchInputManager>', 'VirtualJoystick : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler'],
    prefabs: ['[TouchInputSystem].prefab', 'UI_VirtualJoystick_P1.prefab', 'UI_VirtualJoystick_P2.prefab']
  },
  {
    number: 4,
    title: 'Milestone 4: Mini-Game Framework & State Engine',
    subtitle: 'Abstract Base Controller, Match Lifecycle & Rules Engine',
    estimatedWeeks: 2,
    summary: 'Create the extensible base class and interface contract that powers all 30 mini-games consistently.',
    tasks: [
      'Create abstract MiniGameBase C# class with standardized lifecycle methods (Init, StartCountdown, OnTick, OnPause, OnGameOver)',
      'Implement ScoreTracker and RoundManager for 1, 3, or 5 round match sets',
      'Build MiniGameRegistry ScriptableObject list for dynamic game lookup and Addressables loading',
      'Develop generic HUD overlay (Score P1 vs P2, Match Timer, Pause Button)',
      'Create MiniGameFactory to instantiate game prefabs into clean isolated render viewports'
    ],
    folderStructure: [
      'Assets/Scripts/MiniGames/Framework/ (MiniGameBase, IMiniGame, ScoreTracker, RoundManager, MiniGameSO)'
    ],
    scripts: ['MiniGameBase.cs', 'IMiniGame.cs', 'ScoreTracker.cs', 'RoundManager.cs', 'MiniGameSO.cs', 'MiniGameFactory.cs'],
    classes: ['abstract class MiniGameBase : MonoBehaviour, IMiniGame', 'public struct MatchResult', 'public class MiniGameSO : ScriptableObject'],
    prefabs: ['MiniGameHUD.prefab', '[MiniGameContainer].prefab']
  },
  {
    number: 5,
    title: 'Milestone 5: 30 Mini-Games Production Pipeline',
    subtitle: 'Implementation of the 30 Mini-Games Across 9 Categories',
    estimatedWeeks: 8,
    summary: 'Build all 30 mini-games in batches according to their difficulty ranking, utilizing reusable components and object pools.',
    tasks: [
      'Batch 1 (Reaction & Simple Arcade): Speed Tap, Quick Draw, Math Speed Dash, Tug-of-War, Tap Drag Race',
      'Batch 2 (Sports & Board): Puck Clash Air Hockey, Finger Soccer, Sumo Bumper, Tactical Checkers, Hex Clash',
      'Batch 3 (Arcade & Fighting): Tank Duel, Laser Dodge, Coin Grabber, Sword Clash, Shield Banger, Boxing Slap',
      'Batch 4 (Racing & Puzzle): Micro Drift, Rocket Obstacle, Color Match Panic, Pattern Rush, Reflex Light',
      'Batch 5 (Party & Strategy): Bomb Potato, Balloon Pop Rush, Territory Grab, Tower Siege, Gravity Orb, Bridge Runner'
    ],
    folderStructure: [
      'Assets/Scripts/MiniGames/BoardGames/ (HexClash, Checkers, TileMaze)',
      'Assets/Scripts/MiniGames/Sports/ (PuckClash, FingerSoccer, SumoBumper, DunkBattle)',
      'Assets/Scripts/MiniGames/Arcade/ (TankDuel, LaserDodge, CoinGrabber, AsteroidBumper)',
      'Assets/Scripts/MiniGames/Fighting/ (SwordClash, ShieldBanger, BoxingSlap)',
      'Assets/Scripts/MiniGames/Racing/ (MicroDrift, TapDragRace, RocketObstacle)',
      'Assets/Scripts/MiniGames/Puzzle/ (MathDash, ColorPanic, PatternRush)',
      'Assets/Scripts/MiniGames/Reaction/ (SpeedTap, QuickDraw, ReflexLight)',
      'Assets/Scripts/MiniGames/Party/ (TugOfWar, BombPotato, BalloonPop)',
      'Assets/Scripts/MiniGames/Strategy/ (TerritoryGrab, TowerSiege, GravityOrb, BridgeRunner)'
    ],
    scripts: ['PuckClashController.cs', 'TankDuelController.cs', 'SpeedTapController.cs', 'TugOfWarController.cs', 'SumoBumperController.cs', 'MathDashController.cs'],
    classes: ['PuckClashController : MiniGameBase', 'TankDuelController : MiniGameBase', 'SpeedTapController : MiniGameBase'],
    prefabs: ['30 Mini-Game Prefabs (e.g. MG_PuckClash.prefab, MG_TankDuel.prefab, MG_SpeedTap.prefab, etc.)']
  },
  {
    number: 6,
    title: 'Milestone 6: Game Polish, Juice & Audio Feedback',
    subtitle: 'Screen Shake, Particle FX, Confetti, Haptics & Visual Feedback',
    estimatedWeeks: 2,
    summary: 'Inject maximum tactile game juice (feel-good screen shakes, hit pauses, particle showers, impact ripples, victory fanfare).',
    tasks: [
      'Implement CameraJuice system (Screen shake, hit stop / frame freeze on heavy strikes, zoom-in on match point)',
      'Create particle FX library (Goal bursts, sparks, tire smoke, confetti victory cannons)',
      'Layer adaptive music stems and high-quality sound effects into AudioMixer',
      'Add animated score numbers, coin popups, and match-point tension warnings'
    ],
    folderStructure: [
      'Assets/Scripts/Juice/ (CameraShake, FrameFreeze, ParticleAutoDestroy, UIJuiceAnimator)'
    ],
    scripts: ['CameraShake.cs', 'HitStopManager.cs', 'ParticleAutoPool.cs', 'UIJuiceAnimator.cs'],
    classes: ['CameraShake : MonoBehaviour', 'HitStopManager : Singleton<HitStopManager>'],
    prefabs: ['FX_GoalExplosion.prefab', 'FX_ConfettiShower.prefab', 'FX_ImpactSparks.prefab']
  },
  {
    number: 7,
    title: 'Milestone 7: Optimization & Low-End Device Tuning',
    subtitle: '60 FPS Target on 2-4 GB RAM Android Devices',
    estimatedWeeks: 2,
    summary: 'Profile memory allocations, draw calls, garbage collection spikes, and texture atlases for smooth 60 FPS performance.',
    tasks: [
      'Combine textures into Sprite Atlases (reduces draw calls from 120+ down to < 25)',
      'Audit GC Allocations: Replace LINQ and string concatenations in Update loops with cached buffers',
      'Optimize Physics 2D/3D settings: Increase Fixed Timestep to 0.02s (50 Hz) and use Layer Collision Matrix',
      'Configure URP Asset settings: Disable Realtime Shadows on low-end devices, use baked lightmaps or flat shading'
    ],
    folderStructure: [
      'Assets/Atlases/ (UIAtlas, GameSpritesAtlas)',
      'Assets/Settings/ (URP_LowQuality, URP_HighQuality)'
    ],
    scripts: ['FPSCounter.cs', 'DeviceQualityScaler.cs', 'MemoryTracker.cs'],
    classes: ['DeviceQualityScaler : MonoBehaviour'],
    prefabs: ['[QualityManager].prefab']
  },
  {
    number: 8,
    title: 'Milestone 8: Publishing & Play Store Launch',
    subtitle: 'Ad Integration, IAP, Play Services, Store Listing & Compliance',
    estimatedWeeks: 2,
    summary: 'Finalize Monetization SDKs, Google Play Games Services, App Bundle (AAB) builds, and Google Play Store metadata.',
    tasks: [
      'Integrate Unity Ads / Google AdMob mediation for Rewarded & Interstitial Ads',
      'Set up In-App Purchases (IAP) for No-Ads and Gem Bundles using Unity IAP',
      'Link Google Play Games Services for Cloud Save and Leaderboards',
      'Generate Android App Bundle (.aab) targeting API Level 34+ with ARM64 support',
      'Conduct Internal Testing Track rollout & final QA device matrix check'
    ],
    folderStructure: [
      'Assets/Scripts/Monetization/ (AdManager, IAPManager, PlayServicesWrapper)'
    ],
    scripts: ['AdManager.cs', 'IAPManager.cs', 'PlayServicesWrapper.cs'],
    classes: ['AdManager : PersistentSingleton<AdManager>', 'IAPManager : PersistentSingleton<IAPManager>'],
    prefabs: ['[MonetizationManager].prefab']
  }
];

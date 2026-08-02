export type CategoryType = 
  | 'Board Games'
  | 'Sports'
  | 'Arcade'
  | 'Fighting'
  | 'Racing'
  | 'Puzzle'
  | 'Reaction'
  | 'Party'
  | 'Strategy';

export interface MiniGameSpec {
  id: string;
  name: string;
  category: CategoryType;
  tagline: string;
  gameplay: string;
  controlsP1: string;
  controlsP2: string;
  winCondition: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1 = Easiest, 5 = Hardest
  estimatedDevDays: number;
  physicsComplexity: 'Low' | 'Medium' | 'High';
  requiredAssets: string[];
  requiredAnimations: string[];
  audioRequirements: string[];
  uiRequirements: string[];
  codeSnippetName?: string;
  isPlayableInDemo?: boolean;
}

export interface ThemeConfig {
  id: 'ancient_india' | 'futuristic_arena' | 'cartoon_sports';
  title: string;
  subtitle: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    cardBg: string;
    text: string;
    player1Color: string;
    player2Color: string;
  };
  uiStyle: string;
  fonts: {
    display: string;
    body: string;
  };
  iconsStyle: string;
  musicStyle: string;
  sfxStyle: string;
  backgroundsDescription: string;
  characterStyle: string;
  previewImagePrompt: string;
}

export interface MilestoneData {
  number: number;
  title: string;
  subtitle: string;
  estimatedWeeks: number;
  summary: string;
  tasks: string[];
  folderStructure: string[];
  scripts: string[];
  classes: string[];
  prefabs: string[];
}

export interface ArchitecturePattern {
  id: string;
  name: string;
  description: string;
  unityApplication: string;
  solidPrinciple: string;
  benefits: string[];
}

export interface CSharpScript {
  filename: string;
  description: string;
  category: 'Core' | 'Framework' | 'MiniGame' | 'Input' | 'Save/Data';
  code: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  description: string;
  items: { id: string; task: string; details: string; completed: boolean }[];
}

export interface PlayerStats {
  p1Wins: number;
  p2Wins: number;
  totalMatches: number;
  coinsEarned: number;
  favoriteCategory: string;
}

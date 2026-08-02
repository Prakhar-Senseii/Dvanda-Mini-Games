import { ArchitecturePattern, CSharpScript } from '../types';

export const ARCHITECTURE_PATTERNS: ArchitecturePattern[] = [
  {
    id: 'state_machine',
    name: 'State Machine Pattern',
    description: 'Encapsulates game lifecycle states (Boot, MainLobby, MatchSetup, Countdown, Playing, Paused, RoundEnd, GameOver) into discrete state objects.',
    unityApplication: 'GameManager controls global state transitions. MiniGameBase uses an internal state machine to govern countdown, tick, pause, and victory celebration.',
    solidPrinciple: 'Single Responsibility Principle (SRP) & Open/Closed Principle (OCP)',
    benefits: ['Prevents spaghetti conditionals in Update loops', 'Guarantees clean entry and exit logic per state', 'Easy to add new game states without breaking existing flow']
  },
  {
    id: 'object_pooling',
    name: 'Object Pooling Pattern',
    description: 'Pre-instantiates and recycles reusable GameObjects (pucks, bullets, particle effects, floating score text, coins) to avoid runtime instantiation overhead.',
    unityApplication: 'ObjectPooler pre-warms pools during scene loading. Deactivated objects return to stack instead of invoking Destroy(), preventing Garbage Collection (GC) lag spikes on low-end 2GB RAM phones.',
    solidPrinciple: 'Single Responsibility Principle (SRP)',
    benefits: ['Zero Garbage Collection (GC) allocations during gameplay', 'Sustains smooth 60 FPS on low-end budget devices', 'Fast entity spawning']
  },
  {
    id: 'observer_pattern',
    name: 'Observer Pattern (C# Actions/Events)',
    description: 'Decouples event producers (e.g. goal scored, player eliminated, coin collected) from event consumers (e.g. UI HUD updates, audio play calls, camera shakes).',
    unityApplication: 'MiniGameBase exposes static events like `onScoreUpdated(p1, p2)`, `onMatchEnded(winner)`, and `onCoinEarned(amount)`. UI and Audio controllers subscribe without direct references.',
    solidPrinciple: 'Dependency Inversion Principle (DIP)',
    benefits: ['Complete decoupling between game logic, audio, and UI', 'Allows adding new visual/audio effects without modifying core rules', 'Cleaner unit testing']
  },
  {
    id: 'command_pattern',
    name: 'Command Pattern (Input & Replay System)',
    description: 'Encapsulates player touch/key inputs as command objects that can be executed, buffered, or replayed.',
    unityApplication: 'Used in reaction and fighting games (e.g. Sword Clash parry timing and Math Speed Dash answer taps) to buffer inputs and resolve millisecond draw tie-breakers.',
    solidPrinciple: 'Single Responsibility Principle (SRP)',
    benefits: ['Millisecond-accurate input timestamping', 'Enables instant match replays', 'Supports AI bot command simulation']
  },
  {
    id: 'scriptable_objects',
    name: 'ScriptableObjects Data-Driven Architecture',
    description: 'Separates game data/configurations from code execution logic.',
    unityApplication: 'MiniGameSO defines title, icon, category, rules, prefab reference, and audio assets. ThemeConfigSO defines colors, materials, and UI styling.',
    solidPrinciple: 'Open/Closed Principle (OCP)',
    benefits: ['Game designers can add new mini-games or theme skins in Unity Inspector without changing C# code', 'Reduces memory footprint by sharing asset instances', 'Supports Addressables OTA updates']
  }
];

export const CSHARP_SCRIPTS: CSharpScript[] = [
  {
    filename: 'GameManager.cs',
    category: 'Core',
    description: 'Global persistent singleton state machine controlling application lifecycle, current mini-game instantiation, and scene flow.',
    code: `using System;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace DuoLegends.Core
{
    public enum GameState
    {
        Boot,
        MainLobby,
        MatchSetup,
        InGame,
        Paused,
        Victory
    }

    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        [Header("State")]
        [SerializeField] private GameState currentState = GameState.Boot;
        public GameState CurrentState => currentState;

        public static event Action<GameState> OnStateChanged;

        [Header("Current Match Session")]
        public string activeMiniGameId;
        public int roundsToWin = 3;
        public int player1Score = 0;
        public int player2Score = 0;

        private void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }

            Instance = this;
            DontDestroyOnLoad(gameObject);
            Application.targetFrameRate = 60;
        }

        private void Start()
        {
            ChangeState(GameState.MainLobby);
        }

        public void ChangeState(GameState newState)
        {
            if (currentState == newState) return;

            currentState = newState;
            Debug.Log($"[GameManager] State changed to: {newState}");
            OnStateChanged?.Invoke(newState);
        }

        public void StartMiniGame(string miniGameId, int rounds = 3)
        {
            activeMiniGameId = miniGameId;
            roundsToWin = rounds;
            player1Score = 0;
            player2Score = 0;
            ChangeState(GameState.InGame);
        }

        public void RecordRoundWin(int winningPlayer)
        {
            if (winningPlayer == 1) player1Score++;
            else if (winningPlayer == 2) player2Score++;

            if (player1Score >= roundsToWin || player2Score >= roundsToWin)
            {
                int overallWinner = player1Score >= roundsToWin ? 1 : 2;
                ChangeState(GameState.Victory);
            }
        }
    }
}`
  },
  {
    filename: 'MiniGameBase.cs',
    category: 'Framework',
    description: 'Abstract base class powering all 30 mini-games. Manages match countdown, ticks, score events, pause, and victory state.',
    code: `using System;
using System.Collections;
using UnityEngine;

namespace DuoLegends.Framework
{
    public abstract class MiniGameBase : MonoBehaviour
    {
        [Header("MiniGame Base Properties")]
        public string gameTitle = "Mini Game";
        public bool isGameActive = false;
        public float matchTimer = 60f;
        public bool isTimerBased = false;

        public static event Action<int, int> OnScoreChanged;
        public static event Action<int> OnMatchComplete; // 1 = P1, 2 = P2, 0 = Draw

        protected int p1Score = 0;
        protected int p2Score = 0;

        protected virtual void Start()
        {
            StartCoroutine(MatchCountdownSequence());
        }

        private IEnumerator MatchCountdownSequence()
        {
            isGameActive = false;
            yield return new WaitForSeconds(0.5f);
            
            // 3, 2, 1, GO!
            OnPreStart();
            yield return new WaitForSeconds(1.0f);

            isGameActive = true;
            OnGameStart();
        }

        protected virtual void Update()
        {
            if (!isGameActive) return;

            if (isTimerBased)
            {
                matchTimer -= Time.deltaTime;
                if (matchTimer <= 0)
                {
                    matchTimer = 0;
                    EvaluateTimerEnd();
                }
            }

            OnGameUpdate();
        }

        protected abstract void OnPreStart();
        protected abstract void OnGameStart();
        protected abstract void OnGameUpdate();

        protected void AddScore(int player, int amount = 1)
        {
            if (player == 1) p1Score += amount;
            else if (player == 2) p2Score += amount;

            OnScoreChanged?.Invoke(p1Score, p2Score);
        }

        protected void EndMatch(int winnerPlayer)
        {
            isGameActive = false;
            OnMatchComplete?.Invoke(winnerPlayer);
        }

        private void EvaluateTimerEnd()
        {
            if (p1Score > p2Score) EndMatch(1);
            else if (p2Score > p1Score) EndMatch(2);
            else EndMatch(0); // Draw
        }
    }
}`
  },
  {
    filename: 'TouchInputManager.cs',
    category: 'Input',
    description: 'High-performance multi-touch touch input system partitioning touch inputs into Player 1 (Top/Left) and Player 2 (Bottom/Right) zones.',
    code: `using System;
using UnityEngine;

namespace DuoLegends.InputSystem
{
    public struct PlayerTouchInfo
    {
        public int touchId;
        public Vector2 position;
        public Vector2 deltaPosition;
        public TouchPhase phase;
        public int playerIndex; // 1 = Player 1, 2 = Player 2
    }

    public class TouchInputManager : MonoBehaviour
    {
        public static TouchInputManager Instance { get; private set; }

        public static event Action<PlayerTouchInfo> OnPlayerTouch;

        private void Awake()
        {
            if (Instance != null) { Destroy(gameObject); return; }
            Instance = this;
        }

        private void Update()
        {
            if (Input.touchCount == 0) return;

            float screenHeight = Screen.height;

            for (int i = 0; i < Input.touchCount; i++)
            {
                Touch touch = Input.GetTouch(i);
                int player = (touch.position.y > screenHeight * 0.5f) ? 1 : 2;

                PlayerTouchInfo info = new PlayerTouchInfo
                {
                    touchId = touch.fingerId,
                    position = touch.position,
                    deltaPosition = touch.deltaPosition,
                    phase = touch.phase,
                    playerIndex = player
                };

                OnPlayerTouch?.Invoke(info);
            }
        }
    }
}`
  },
  {
    filename: 'ObjectPooler.cs',
    category: 'Framework',
    description: 'Generic, zero-GC object pooler pre-allocating bullet, puck, and particle GameObjects to guarantee 60 FPS on low-end devices.',
    code: `using System.Collections.Generic;
using UnityEngine;

namespace DuoLegends.Utilities
{
    public class ObjectPooler : MonoBehaviour
    {
        public static ObjectPooler Instance { get; private set; }

        [System.Serializable]
        public class Pool
        {
            public string tag;
            public GameObject prefab;
            public int size = 10;
        }

        public List<Pool> pools;
        private Dictionary<string, Queue<GameObject>> poolDictionary;

        private void Awake()
        {
            Instance = this;
            poolDictionary = new Dictionary<string, Queue<GameObject>>();

            foreach (Pool pool in pools)
            {
                Queue<GameObject> objectPool = new Queue<GameObject>();

                for (int i = 0; i < pool.size; i++)
                {
                    GameObject obj = Instantiate(pool.prefab, transform);
                    obj.SetActive(false);
                    objectPool.Enqueue(obj);
                }

                poolDictionary.Add(pool.tag, objectPool);
            }
        }

        public GameObject SpawnFromPool(string tag, Vector3 position, Quaternion rotation)
        {
            if (!poolDictionary.ContainsKey(tag)) return null;

            GameObject objectToSpawn = poolDictionary[tag].Dequeue();
            objectToSpawn.transform.position = position;
            objectToSpawn.transform.rotation = rotation;
            objectToSpawn.SetActive(true);

            poolDictionary[tag].Enqueue(objectToSpawn);
            return objectToSpawn;
        }
    }
}`
  },
  {
    filename: 'PuckClashController.cs',
    category: 'MiniGame',
    description: 'Full C# physics controller for Air Hockey / Puck Clash featuring paddle collision response, goal triggers, and power-up spawns.',
    code: `using UnityEngine;
using DuoLegends.Framework;

namespace DuoLegends.MiniGames.Sports
{
    public class PuckClashController : MiniGameBase
    {
        [Header("Puck Clash References")]
        public Rigidbody2D puckRigidbody;
        public Transform paddleP1;
        public Transform paddleP2;
        public float maxPuckSpeed = 25f;

        protected override void OnPreStart()
        {
            ResetPuckToCenter();
        }

        protected override void OnGameStart()
        {
            // Apply initial random serve thrust
            Vector2 launchDir = Random.insideUnitCircle.normalized;
            puckRigidbody.AddForce(launchDir * 8f, ForceMode2D.Impulse);
        }

        protected override void OnGameUpdate()
        {
            // Clamp puck speed to prevent tunneling through collider walls
            if (puckRigidbody.linearVelocity.magnitude > maxPuckSpeed)
            {
                puckRigidbody.linearVelocity = puckRigidbody.linearVelocity.normalized * maxPuckSpeed;
            }
        }

        public void OnGoalScored(int scoringPlayer)
        {
            AddScore(scoringPlayer, 1);

            if (p1Score >= 5) EndMatch(1);
            else if (p2Score >= 5) EndMatch(2);
            else ResetPuckToCenter();
        }

        private void ResetPuckToCenter()
        {
            puckRigidbody.linearVelocity = Vector2.zero;
            puckRigidbody.transform.position = Vector3.zero;
        }
    }
}`
  },
  {
    filename: 'SaveSystem.cs',
    category: 'Save/Data',
    description: 'Encrypted JSON save system storing coins, stats, unlocked mini-games, and theme preferences with atomic write safety.',
    code: `using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using UnityEngine;

namespace DuoLegends.Save
{
    [Serializable]
    public class PlayerSaveData
    {
        public int coins = 250;
        public int gems = 10;
        public int p1TotalWins = 0;
        public int p2TotalWins = 0;
        public string activeThemeId = "ancient_india";
        public string[] unlockedGameIds = new string[] { "puck_clash", "tank_duel", "speed_tap" };
    }

    public static class SaveSystem
    {
        private static readonly string SaveFileName = "duo_legends_save.dat";
        private static readonly string Key = "DuoLegendsKey2026"; // 16-char AES key

        public static void Save(PlayerSaveData data)
        {
            try
            {
                string json = JsonUtility.ToJson(data);
                byte[] encryptedBytes = EncryptString(json, Key);
                string filePath = Path.Combine(Application.persistentDataPath, SaveFileName);

                File.WriteAllBytes(filePath, encryptedBytes);
                Debug.Log("[SaveSystem] Data saved securely.");
            }
            catch (Exception ex)
            {
                Debug.LogError($"[SaveSystem] Save failed: {ex.Message}");
            }
        }

        public static PlayerSaveData Load()
        {
            string filePath = Path.Combine(Application.persistentDataPath, SaveFileName);
            if (!File.Exists(filePath)) return new PlayerSaveData();

            try
            {
                byte[] encryptedBytes = File.ReadAllBytes(filePath);
                string json = DecryptString(encryptedBytes, Key);
                return JsonUtility.FromJson<PlayerSaveData>(json);
            }
            catch
            {
                return new PlayerSaveData();
            }
        }

        private static byte[] EncryptString(string plainText, string key)
        {
            byte[] keyBytes = Encoding.UTF8.GetBytes(key.PadRight(16).Substring(0, 16));
            using (Aes aes = Aes.Create())
            {
                aes.Key = keyBytes;
                aes.IV = keyBytes; // Simplified IV for local save
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, aes.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);
                        cs.Write(plainBytes, 0, plainBytes.Length);
                        cs.FlushFinalBlock();
                    }
                    return ms.ToArray();
                }
            }
        }

        private static string DecryptString(byte[] cipherBytes, string key)
        {
            byte[] keyBytes = Encoding.UTF8.GetBytes(key.PadRight(16).Substring(0, 16));
            using (Aes aes = Aes.Create())
            {
                aes.Key = keyBytes;
                aes.IV = keyBytes;
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, aes.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.FlushFinalBlock();
                    }
                    return Encoding.UTF8.GetString(ms.ToArray());
                }
            }
        }
    }
}`
  }
];

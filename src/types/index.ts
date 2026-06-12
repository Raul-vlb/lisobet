// ============================================================
// LISOBET — Type Definitions
// Copa do Mundo FIFA 2026
// ============================================================

// ────────────────────────────────────────────────────────────
// ENTITIES
// ────────────────────────────────────────────────────────────

export interface Team {
  id: number;
  name: string;
  group: string;
  abbr: string;
  emoji: string;
}

export interface Match {
  id: string;
  group: string;
  homeTeam: string; // team abbr
  awayTeam: string; // team abbr
  date: string;     // ISO date string
  time: string; 
  stage: MatchStage;
}

export type MatchStage =
  | 'group'
  | 'round32'
  | 'round16'
  | 'quarterfinal'
  | 'semifinal'
  | 'third_place'
  | 'final';

export interface Prediction {
  id?: string;
  userId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
  updatedAt?: string;
}

export interface MatchResult {
  matchId: string;
  homeScore: number;
  awayScore: number;
  updatedAt?: string;
}

export interface DbMatchResult {
  match_id: string;
  home_score: number;
  away_score: number;
  updated_at: string;
}

// ────────────────────────────────────────────────────────────
// STANDINGS
// ────────────────────────────────────────────────────────────

export interface GroupStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  yellowCards: number;
  redCards: number;
  position?: number;
}

export interface GroupResult {
  group: string;
  standings: GroupStanding[];
  winner: Team | null;
  runnerUp: Team | null;
  third: Team | null;
  fourth: Team | null;
}

// ────────────────────────────────────────────────────────────
// KNOCKOUT
// ────────────────────────────────────────────────────────────

/**
 * Represents a team's position in the bracket
 * Examples: '1A', '2B', '3rd-ABCDF', 'W73', 'L101'
 */
export type BracketSlot = string;

export interface KnockoutMatch {
  id: string;                  // 'J73' through 'J104'
  stage: MatchStage;
  homeSlot: BracketSlot;       // placeholder or resolved team
  awaySlot: BracketSlot;
  homeTeam: Team | null;
  awayTeam: Team | null;
  homeScore: number | null;
  awayScore: number | null;
  winner: Team | null;
  loser: Team | null;
  nextMatchId: string | null;  // winner goes to
  nextMatchSlot: 'home' | 'away' | null;
  loserMatchId: string | null; // for 3rd place (from semifinal losers)
}

export interface BestThirdEntry {
  team: Team;
  group: string;
  points: number;
  goalDiff: number;
  goalsFor: number;
  goalsAgainst: number;
  yellowCards: number;
  redCards: number;
}

// ────────────────────────────────────────────────────────────
// USER & AUTH
// ────────────────────────────────────────────────────────────

export interface AppUser {
  id: string;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
  isAdmin: boolean;
}

// ────────────────────────────────────────────────────────────
// STORE
// ────────────────────────────────────────────────────────────

export interface AppState {
  user: AppUser | null;
  predictions: Map<string, Prediction>;
  matchResults: Map<string, MatchResult>;
  groupMatches: Match[];
  standings: Map<string, GroupStanding[]>;
  qualifiedTeams: Map<BracketSlot, Team>;
  knockoutMatches: Map<string, KnockoutMatch>;
  bestThirds: BestThirdEntry[];
  champion: Team | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
}

export type StoreListener = (state: AppState) => void;

export type StoreAction =
  | { type: 'SET_USER'; payload: AppUser | null }
  | { type: 'SET_PREDICTIONS'; payload: Map<string, Prediction> }
  | { type: 'SET_MATCH_RESULTS'; payload: Map<string, MatchResult> }
  | { type: 'UPSERT_PREDICTION'; payload: Prediction }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_INITIALIZED'; payload: boolean }
  | { type: 'RECALCULATE' };

// ────────────────────────────────────────────────────────────
// BEST THIRDS MATRIX
// ────────────────────────────────────────────────────────────

/**
 * Maps a sorted combination of 8 qualifying groups
 * to the Round-of-32 slot each third-place team fills.
 *
 * Key: sorted group letters joined, e.g. "ABCDEFGH"
 * Value: Record<group_letter, match_id>
 */
export type BestThirdsMatrix = Record<string, Record<string, string>>;

/**
 * Each slot in the Round of 32 that accepts a best-third team,
 * along with the eligible source groups.
 */
export interface ThirdPlaceSlot {
  matchId: string;
  eligibleGroups: readonly string[];
}

// ────────────────────────────────────────────────────────────
// SUPABASE DB TYPES
// ────────────────────────────────────────────────────────────

export interface DbPrediction {
  id: string;
  user_id: string;
  match_id: string;
  home_score: number;
  away_score: number;
  updated_at: string;
}

export interface DbMatchResult {
  match_id: string;
  home_score: number;
  away_score: number;
  updated_at: string;
}

// ────────────────────────────────────────────────────────────
// NAVIGATION
// ────────────────────────────────────────────────────────────

export type ViewName = 'auth' | 'groups' | 'bracket' | 'champion' | 'admin';

// ────────────────────────────────────────────────────────────
// TIEBREAKER
// ────────────────────────────────────────────────────────────

export interface HeadToHeadResult {
  points: number;
  goalDiff: number;
  goalsFor: number;
}

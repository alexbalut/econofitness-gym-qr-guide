/** Client-side in-progress workout (localStorage, no login). */

export type StrengthSet = {
  id: string;
  reps: number;
  weightKg?: number;
};

export type WorkoutExercise = {
  id: string;
  machineId: string;
  token: string;
  nameEn: string;
  nameFr: string;
  category: string;
  /** Strength / non-cardio */
  sets?: StrengthSet[];
  /** Cardio */
  minutes?: number;
  seconds?: number;
  distanceKm?: number;
};

export type WorkoutSession = {
  gymSlug: string;
  startedAt: string;
  exercises: WorkoutExercise[];
};

export function isCardio(category: string): boolean {
  return category.trim().toLowerCase() === "cardio";
}

export function workoutStorageKey(gymSlug: string): string {
  return `econofitness-workout:v1:${gymSlug}`;
}

export function loadWorkout(gymSlug: string): WorkoutSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(workoutStorageKey(gymSlug));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WorkoutSession;
    if (!parsed || parsed.gymSlug !== gymSlug || !Array.isArray(parsed.exercises)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveWorkout(session: WorkoutSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(workoutStorageKey(session.gymSlug), JSON.stringify(session));
}

export function clearWorkout(gymSlug: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(workoutStorageKey(gymSlug));
}

export function emptyWorkout(gymSlug: string): WorkoutSession {
  return {
    gymSlug,
    startedAt: new Date().toISOString(),
    exercises: [],
  };
}

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export type AddableMachine = {
  id: string;
  token: string;
  nameEn: string;
  nameFr: string;
  category: string;
};

/** Add a machine to the gym's in-progress workout (creates session if needed). */
export function addMachineToWorkout(gymSlug: string, machine: AddableMachine): WorkoutSession {
  const existing = loadWorkout(gymSlug) ?? emptyWorkout(gymSlug);
  const already = existing.exercises.find((e) => e.machineId === machine.id);
  if (already) return existing;

  const entry: WorkoutExercise = {
    id: newId(),
    machineId: machine.id,
    token: machine.token,
    nameEn: machine.nameEn,
    nameFr: machine.nameFr,
    category: machine.category,
  };

  if (isCardio(machine.category)) {
    entry.minutes = 0;
    entry.seconds = 0;
  } else {
    entry.sets = [];
  }

  const next = { ...existing, exercises: [...existing.exercises, entry] };
  saveWorkout(next);
  return next;
}

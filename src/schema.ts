export interface MemoryFragment {
  id: string;
  image: string;
  caption?: string;
  scale?: number;
  yOffset?: number;
}

export interface EuphoriaData {
  introText: string;
  floatingMemories: MemoryFragment[];
  memoryWaves: MemoryFragment[];
  voiceNote: {
    title: string;
    durationLabel: string;
  };
  finalMessage: string;
}

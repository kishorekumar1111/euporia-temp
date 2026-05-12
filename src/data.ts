import { EuphoriaData } from "./schema";

export const defaultData: EuphoriaData = {
  introText: "Some people change your entire atmosphere.",
  floatingMemories: [
    {
      id: "fm1",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800",
      caption: "The first time everything felt right.",
      scale: 1,
      yOffset: -10,
    },
    {
      id: "fm2",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
      caption: "Lost in the moments.",
      scale: 0.85,
      yOffset: 20,
    },
    {
      id: "fm3",
      image: "https://images.unsplash.com/photo-1507504031003-b417240a66d4?auto=format&fit=crop&q=80&w=800",
      caption: "A universe built for two.",
      scale: 1.1,
      yOffset: 0,
    }
  ],
  memoryWaves: [
    {
      id: "mw1",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
      caption: "Joy"
    },
    {
      id: "mw2",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=800",
      caption: "Peace"
    },
    {
      id: "mw3",
      image: "https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&q=80&w=800",
      caption: "Adventure"
    },
    {
      id: "mw4",
      image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=800",
      caption: "Eternity"
    }
  ],
  voiceNote: {
    title: "A late night thought",
    durationLabel: "0:42"
  },
  finalMessage: "You became my favorite feeling."
};

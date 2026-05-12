import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Plus, Trash2, Image } from 'lucide-react';
import { EuphoriaData, MemoryFragment } from '../schema';

interface EditorPanelProps {
  data: EuphoriaData;
  onChange: (data: EuphoriaData) => void;
}

export function EditorPanel({ data, onChange }: EditorPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof EuphoriaData, value: any) => {
    onChange({ ...data, [key]: value });
  };

  const updateMemoryList = (listKey: 'floatingMemories' | 'memoryWaves', list: MemoryFragment[]) => {
    handleChange(listKey, list);
  };

  const updateMemoryItem = (listKey: 'floatingMemories' | 'memoryWaves', index: number, item: MemoryFragment) => {
    const newList = [...data[listKey]];
    newList[index] = item;
    updateMemoryList(listKey, newList);
  };

  const addMemoryItem = (listKey: 'floatingMemories' | 'memoryWaves') => {
    updateMemoryList(listKey, [
      ...data[listKey],
      { id: Date.now().toString(), image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=600&auto=format&fit=crop', caption: 'New Memory' }
    ]);
  };

  const removeMemoryItem = (listKey: 'floatingMemories' | 'memoryWaves', index: number) => {
    const newList = [...data[listKey]];
    newList.splice(index, 1);
    updateMemoryList(listKey, newList);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, listKey: 'floatingMemories' | 'memoryWaves', index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const item = data[listKey][index];
      updateMemoryItem(listKey, index, { ...item, image: url });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 2 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-softwhite/5 border border-softwhite/10 hover:bg-softwhite/10 backdrop-blur-md transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.2)]"
          title="Edit Template"
        >
          <Settings className="w-4 h-4 text-softwhite/70 group-hover:text-softwhite transition-colors duration-500 relative z-10" />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-80 md:w-96 bg-midnight/90 backdrop-blur-xl border-r border-softwhite/10 z-[100] shadow-2xl overflow-y-auto flex flex-col custom-scrollbar"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-midnight/80 backdrop-blur-md border-b border-softwhite/10">
              <h2 className="text-xl font-serif text-softwhite">Edit Template</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-softwhite/10 transition-colors"
              >
                <X className="w-5 h-5 text-softwhite/70" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-8">
              {/* Couple Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-softwhite/50">Names / Title</label>
                <input
                  type="text"
                  value={data.coupleName}
                  onChange={(e) => handleChange('coupleName', e.target.value)}
                  className="w-full bg-softwhite/5 border border-softwhite/10 rounded-lg p-3 text-sm text-softwhite focus:outline-none focus:border-pink/50 transition-colors placeholder:text-softwhite/20"
                  placeholder="e.g. A & B"
                />
              </div>

              {/* Intro Text */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-softwhite/50">Intro Text</label>
                <textarea
                  value={data.introText}
                  onChange={(e) => handleChange('introText', e.target.value)}
                  rows={3}
                  className="w-full bg-softwhite/5 border border-softwhite/10 rounded-lg p-3 text-sm text-softwhite focus:outline-none focus:border-pink/50 transition-colors placeholder:text-softwhite/20 resize-y"
                  placeholder="Welcome text..."
                />
              </div>

              {/* Floating Memories */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-widest text-softwhite/50">Floating Memories</label>
                  <button onClick={() => addMemoryItem('floatingMemories')} className="text-softwhite/50 hover:text-softwhite transition-colors" title="Add Memory">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {data.floatingMemories.map((mem, i) => (
                    <div key={mem.id || i} className="bg-softwhite/5 border border-softwhite/5 rounded-xl p-4 flex flex-col gap-3 group relative">
                      <button onClick={() => removeMemoryItem('floatingMemories', i)} className="absolute top-2 right-2 text-softwhite/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                         <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-black/20 relative group/image">
                        <img src={mem.image} alt="Memory" className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/50 flex flex-col gap-2 items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity cursor-pointer">
                           <Image className="w-6 h-6 text-white" />
                           <span className="text-xs text-white">Upload</span>
                           <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'floatingMemories', i)} />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={mem.caption}
                        onChange={(e) => updateMemoryItem('floatingMemories', i, { ...mem, caption: e.target.value })}
                        className="w-full bg-softwhite/5 border border-softwhite/10 rounded-md p-2 text-xs text-softwhite focus:outline-none focus:border-pink/50 transition-colors text-center"
                        placeholder="Caption..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Memory Waves */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-widest text-softwhite/50">Memory Waves</label>
                  <button onClick={() => addMemoryItem('memoryWaves')} className="text-softwhite/50 hover:text-softwhite transition-colors" title="Add Memory">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {data.memoryWaves.map((mem, i) => (
                    <div key={mem.id || i} className="bg-softwhite/5 border border-softwhite/5 rounded-xl p-4 flex flex-col gap-3 group relative">
                      <button onClick={() => removeMemoryItem('memoryWaves', i)} className="absolute top-2 right-2 text-softwhite/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                         <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/20 relative group/image">
                        <img src={mem.image} alt="Memory" className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/50 flex flex-col gap-2 items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity cursor-pointer">
                           <Image className="w-6 h-6 text-white" />
                           <span className="text-xs text-white">Upload</span>
                           <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'memoryWaves', i)} />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={mem.caption}
                        onChange={(e) => updateMemoryItem('memoryWaves', i, { ...mem, caption: e.target.value })}
                        className="w-full bg-softwhite/5 border border-softwhite/10 rounded-md p-2 text-xs text-softwhite focus:outline-none focus:border-pink/50 transition-colors text-center"
                        placeholder="Caption..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-softwhite/50">Final Message</label>
                <textarea
                  value={data.finalMessage}
                  onChange={(e) => handleChange('finalMessage', e.target.value)}
                  rows={4}
                  className="w-full bg-softwhite/5 border border-softwhite/10 rounded-lg p-3 text-sm text-softwhite focus:outline-none focus:border-pink/50 transition-colors placeholder:text-softwhite/20 resize-y"
                  placeholder="Final message..."
                />
              </div>

              <div className="pb-12 text-center">
                 <p className="text-xs text-softwhite/30 italic">Changes are applied instantly.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

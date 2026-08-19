import { RevealItem } from "@/components/motion/Reveal";
import { BibleStudyRow } from "@/lib/supabase";

export function BibleStudyCard({ study }: { study: BibleStudyRow }) {
  return (
    <RevealItem className="h-full">
      <div className="flex h-full flex-col rounded-2xl border border-clay-900/8 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-sage/10">
        <h3 className="font-display text-xl text-clay-900">{study.title}</h3>
        <p className="mt-1 text-sm font-medium text-sage-dark">
          {study.day_of_week}
          {study.meeting_time ? ` · ${study.meeting_time}` : ""}
        </p>
        {study.description && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-clay-700">{study.description}</p>
        )}
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-clay-900/8 pt-4 text-xs text-clay-500">
          {study.location && <span>📍 {study.location}</span>}
          {study.leader_name && <span>👤 {study.leader_name}</span>}
        </div>
      </div>
    </RevealItem>
  );
}

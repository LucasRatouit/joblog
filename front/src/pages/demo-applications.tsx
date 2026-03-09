import { useState } from "react";
import AppSidebar from "../components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { useDemoStore, type DemoJob } from "../stores/demo";
import { statusEnumToString, statusGradientColor } from "../api/config";
import { cn } from "../lib/utils";
import { MapPin, GripVertical } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
  useDroppable,
  pointerWithin,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "../components/ui/badge";

const statuses = ["PENDING", "INTERVIEW", "FOLLOW_UP", "ACCEPTED"];

const KanbanCard = ({
  job,
  isOverlay = false,
}: {
  job: DemoJob;
  isOverlay?: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: job.id,
    data: {
      type: "Job",
      job,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging && !isOverlay) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative bg-muted/50 border border-dashed border-border/40 rounded-2xl p-4 h-[120px] opacity-50"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-card border border-border/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300",
        isOverlay &&
          "shadow-xl ring-2 ring-primary/20 cursor-grabbing scale-105",
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b opacity-70",
          statusGradientColor(job.status),
        )}
      />

      <div className="pl-2 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-black text-sm tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {job.title}
            </h4>
            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">
              {job.company}
            </p>
          </div>
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 -mr-1 rounded-md hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
          >
            <GripVertical className="size-4 text-muted-foreground/40" />
          </div>
        </div>

        <div className="flex flex-col gap-y-1">
          {job.location && (
            <div className="flex items-center gap-x-1.5 text-[10px] text-muted-foreground font-medium">
              <MapPin className="size-3 opacity-50" />
              <span className="truncate">{job.location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/20">
          <span className="text-[10px] font-bold text-muted-foreground/40 italic">
            {job.candidacyDate
              ? new Date(job.candidacyDate).toLocaleDateString()
              : "--/--/--"}
          </span>
        </div>
      </div>
    </div>
  );
};

const KanbanColumn = ({ 
  status, 
  jobs 
}: { 
  status: string; 
  jobs: DemoJob[] 
}) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="w-80 flex flex-col gap-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-x-3">
          <div
            className={cn(
              "size-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]",
              statusGradientColor(status),
            )}
          />
          <h3 className="font-black text-xs uppercase tracking-[0.2em] opacity-60 text-nowrap">
            {statusEnumToString(status)}
          </h3>
          <span className="bg-muted px-2 py-0.5 rounded-full text-[10px] font-black opacity-40">
            {jobs.length}
          </span>
        </div>
      </div>

      <SortableContext
        id={status}
        items={jobs.map((j) => j.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="flex-1 bg-muted/20 rounded-[2rem] p-3 border border-border/5 space-y-3 overflow-y-auto custom-scrollbar min-h-[200px] transition-colors duration-200"
        >
          {jobs.map((job) => (
            <KanbanCard key={job.id} job={job} />
          ))}

          {jobs.length === 0 && (
            <div className="h-24 border-2 border-dashed border-border/20 rounded-2xl flex items-center justify-center pointer-events-none">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-20">
                Aucun job
              </p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

const DemoApplications = () => {
  const { jobs, updateJobStatus } = useDemoStore();
  const [activeJob, setActiveJob] = useState<DemoJob | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const job = active.data.current?.job;
    if (job) setActiveJob(job);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const job = jobs.find((j) => j.id === activeId);
    if (!job) return;

    let newStatus = overId;
    if (!statuses.includes(overId)) {
      const overJob = jobs.find((j) => j.id === overId);
      if (overJob) {
        newStatus = overJob.status;
      }
    }

    if (statuses.includes(newStatus) && job.status !== newStatus) {
      updateJobStatus(activeId, newStatus);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveJob(null);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col bg-background overflow-hidden h-svh">
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 z-30 bg-background/50 backdrop-blur-xl border-b border-border/5 transition-all">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="size-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all border border-border/40 shadow-sm" />
            <div className="h-4 w-px bg-border/40 mx-2" />
            <h2 className="text-sm font-black uppercase tracking-widest opacity-40">
              Candidatures (Kanban) - Démo
            </h2>
          </div>
          <div className="ml-auto">
            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-primary border-primary/20 bg-primary/5">
                Mode Démo
            </Badge>
          </div>
        </header>

        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 overflow-x-auto custom-scrollbar p-4 md:p-8">
            <div className="flex gap-6 h-full w-max pr-8">
              {statuses.map((status) => (
                <KanbanColumn 
                  key={status} 
                  status={status} 
                  jobs={jobs.filter((j) => j.status === status)} 
                />
              ))}
            </div>
          </div>
          <DragOverlay>
            {activeJob ? <KanbanCard job={activeJob} isOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DemoApplications;

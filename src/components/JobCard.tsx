import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface JobPosition {
  x: number;
  y: number;
  angle: number;
  job: {
    icon: string;
    companyName: string;
    position: string;
    time: string;
  };
}

type JobAppearance = {
  width: number;
  height: number;
};

export default function JobCard({
  position,
  appearance,
}: {
  position: JobPosition;
  appearance: JobAppearance;
}) {
  return (
    <Card
      className="absolute bg-white/90 backdrop-blur shadow-inner"
      style={{
        transform: `translate(${position.x - appearance.width / 2}px, ${
          position.y - appearance.height / 2
        }px) rotate(${position.angle}rad)`,
        width: `${appearance.width}px`,
        height: `${appearance.height}px`,
        willChange: "transform",
      }}
    >
      <CardContent className="w-full h-full p-1 select-none">
        <div className="h-full flex items-center gap-2">
          <div className="flex flex-col items-center justify-center w-1/4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={position.job.icon} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex w-full h-full flex-col justify-center pr-2 overflow-hidden">
            <div className="flex items-center gap-2 justify-between">
              <h1 className="font-semibold text-slate-500 text-sm">
                {position.job.companyName}
              </h1>
              <p className="text-xs text-slate-500">{position.job.time}</p>
            </div>
            <h1 className="font-semibold text-base truncate">
              {position.job.position}
            </h1>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { PHYSICS_CONSTANTS } from "../constants";
import { FallingBlocksProps } from "../types";
import { useMatterPhysics } from "../hooks/useMatterPhysics";
import JobCard from "@/components/JobCard";

export default function FallingBlocks({
  WIDTH = typeof window !== "undefined" ? window.innerWidth : 0,
  HEIGHT,
}: FallingBlocksProps) {
  const { canvas, jobs } = useMatterPhysics(WIDTH, HEIGHT);
  const GROUND_X = WIDTH / 2;
  const WALL_Y = HEIGHT / 2;

  return (
    <div className="relative w-full h-full overflow-hidden z-50">
      <canvas ref={canvas} />
      <div className="w-full h-full absolute left-0 top-0 pointer-events-none">
        {jobs
          .filter((item) => item.x !== GROUND_X && item.y !== WALL_Y)
          .map((dot, key) => (
            <JobCard
              key={key}
              position={dot}
              appearance={{
                height: PHYSICS_CONSTANTS.RECTANGLE_HEIGHT,
                width: PHYSICS_CONSTANTS.RECTANGLE_WIDTH,
              }}
            />
          ))}
      </div>
    </div>
  );
}

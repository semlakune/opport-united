import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Job } from "@/types";
import { PHYSICS_CONSTANTS } from "@/constants";
import { getRandom } from "@/lib/utils";
import JobFactory from "@/jobs.json";

const {
  Bodies,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
  World,
} = Matter;

declare global {
  interface Window {
    Matter: typeof Matter;
    engine: Matter.Engine;
    runner: Matter.Runner;
  }
}

export function useMatterPhysics(WIDTH: number, HEIGHT: number) {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const world = useRef<Matter.World>();
  const engineRef = useRef<Matter.Engine>();
  const runnerRef = useRef<Matter.Runner>();
  const [jobs, setJobs] = useState<Job[]>([]);
  const jobsData = [...JobFactory, ...JobFactory, ...JobFactory, ...JobFactory];

  const bodyToJobMap = useRef(new Map<number, (typeof JobFactory)[0]>());
  const jobIndex = useRef(0);

  const createRainJobCard = (
    engine: Matter.Engine,
    positionXY?: Matter.IMousePoint,
  ) => {
    if (!positionXY) return;

    const jobBody = Bodies.rectangle(
      positionXY.x + getRandom(15) || WIDTH / 2,
      positionXY.y + getRandom(15) || HEIGHT / 2,
      PHYSICS_CONSTANTS.RECTANGLE_WIDTH,
      PHYSICS_CONSTANTS.RECTANGLE_HEIGHT,
      {
        friction: 1,
        frictionAir: 0.01,
        restitution: 0,
        chamfer: { radius: 10 },
        render: {
          fillStyle: PHYSICS_CONSTANTS.WALL_COLOR,
        },
      } as Matter.IBodyDefinition,
    );

    const currentJob = jobsData[jobIndex.current % jobsData.length];
    bodyToJobMap.current.set(jobBody.id, currentJob);
    jobIndex.current += 1;

    World.add(engine.world, jobBody);
  };

  const setupWalls = (engine: Matter.Engine) => {
    const GROUND_X = WIDTH / 2;
    // const WALL_Y = HEIGHT / 2;

    World.add(engine.world, [
      // ground
      Bodies.rectangle(GROUND_X, HEIGHT, WIDTH, 5, {
        isStatic: true,
        restitution: 0,
        friction: 1,
        render: { fillStyle: PHYSICS_CONSTANTS.WALL_COLOR },
      }),
      // // left wall
      // Bodies.rectangle(0, WALL_Y, 5, HEIGHT, {
      //   isStatic: true,
      //   restitution: 0,
      //   friction: 1,
      //   render: { fillStyle: PHYSICS_CONSTANTS.WALL_COLOR },
      // }),
      // // right wall
      // Bodies.rectangle(WIDTH - 40, WALL_Y, 5, HEIGHT, {
      //   isStatic: true,
      //   restitution: 0,
      //   friction: 1,
      //   render: { fillStyle: PHYSICS_CONSTANTS.WALL_COLOR },
      // }),
    ]);
  };

  const setupMouseControls = (engine: Matter.Engine, render: Matter.Render) => {
    const mouse = Mouse.create(render.canvas);
    render.mouse = mouse;

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.5,
        render: { visible: false },
        bodyA: undefined,
      },
    });

    World.add(engine.world, mouseConstraint);

    let mouseIsDragging = false;

    Events.on(mouseConstraint, "startdrag", () => {
      mouseIsDragging = true;
    });
    Events.on(mouseConstraint, "enddrag", () => {
      mouseIsDragging = false;
    });
    Events.on(mouseConstraint, "mousedown", (ev) => {
      if (!mouseIsDragging) {
        console.log(engine.world.bodies.length);
        if (engine.world.bodies.length === 19) return;
        createRainJobCard(engine, ev.source.mouse.position);
      }
    });

    return mouseConstraint;
  };

  const setupCardSpawning = (engine: Matter.Engine) => {
    let count = 0;
    return setInterval(() => {
      if (count < jobsData.length - PHYSICS_CONSTANTS.INITIAL_CARDS) {
        createRainJobCard(engine, { x: WIDTH * Math.random(), y: -20 });
        count++;
      }
    }, PHYSICS_CONSTANTS.SPAWN_INTERVAL);
  };

  const createWorld = () => {
    const engine = Engine.create();
    engineRef.current = engine;
    world.current = engine.world;

    const render = Render.create({
      canvas: canvas.current || undefined,
      engine,
      options: {
        width: WIDTH,
        height: HEIGHT,
        background: "rgba(0,0,0,0)",
        showCollisions: false,
        showVelocity: false,
        showAxes: false,
        wireframes: false,
      } as Matter.IRendererOptions,
    });

    setupWalls(engine);
    setupMouseControls(engine, render);
    const spawnInterval = setupCardSpawning(engine);

    Events.on(engine, "afterUpdate", (ev) => {
      const bodies = ev.source.world.bodies;
      const newJobs: Job[] = [];

      bodies.forEach((body) => {
        if (
          body.position.x > WIDTH ||
          body.position.x < 0 ||
          body.position.y > HEIGHT
        ) {
          // Clean up the mapping when removing a body
          bodyToJobMap.current.delete(body.id);
          World.remove(engine.world, body);
        } else {
          // Get the job data from our mapping
          const jobData = bodyToJobMap.current.get(body.id);
          if (jobData) {
            newJobs.push({
              x: body.position.x,
              y: body.position.y,
              angle: body.angle,
              job: jobData,
            });
          }
        }
      });

      setJobs(newJobs);
    });

    Render.run(render);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    window.Matter = Matter;
    window.engine = engine;
    window.runner = runner;

    return spawnInterval;
  };

  useEffect(() => {
    if (runnerRef.current) {
      Runner.stop(runnerRef.current);
      Engine.clear(engineRef.current!);
    }

    // Clear the job mapping when recreating the world
    bodyToJobMap.current.clear();
    jobIndex.current = 0;

    const spawnInterval = createWorld();

    return () => {
      clearInterval(spawnInterval);
      Runner.stop(runnerRef.current!);
      Engine.clear(engineRef.current!);
      bodyToJobMap.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvas, jobs };
}

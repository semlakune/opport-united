import FallingBlocks from "@/components/FallingBlocks.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import aji1 from "@/assets/aji.jpeg";
import aji2 from "@/assets/aji-2.jpeg";
import pattrick from "@/assets/pattrick.jpeg";

export default function Hero() {
  const WIDTH = window.innerWidth - 40;

  return (
    <main className={"px-5 lg:px-10 py-5 relative select-none"}>
      <FallingBlocks HEIGHT={400} WIDTH={WIDTH} />
      <div className="px-5 lg:px-10 py-5 absolute left-0 top-0 w-full h-full pointer-events-none">
        <div
          className={"p-5 rounded-xl h-full flex flex-col gap-5 text-white"}
          style={{
            background:
              "linear-gradient(180deg, #5c737d 0%, #2b3e44 40%, #19262c 100%)",
          }}
        >
          <div>
            <h1>Discover Opportunities</h1>
            <h1>that match your skills.</h1>
          </div>
          <div className={"max-w-[400px]"}>
            <p>
              Job hunting made easy: Get matched job with the best
              opportunities.
            </p>
          </div>
          <div className={"flex items-center gap-2"}>
            <div className={"flex"}>
              <Avatar className={"w-8 h-8 border"}>
                <AvatarImage src={aji1} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className={"w-8 h-8 -ml-3 border"}>
                <AvatarImage src={aji2} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className={"w-8 h-8 -ml-3 border"}>
                <AvatarImage src={pattrick} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <p className={"text-xs text-white font-semibold"}>
              20k+ Talents found their Dream Job!
            </p>
          </div>
          <Button
            className={
              "w-fit rounded-full z-50 cursor-pointer pointer-events-auto backdrop-blur bg-opacity-20 bg-black/40"
            }
            onClick={() => console.log("click")}
          >
            See your matches
          </Button>
        </div>
      </div>
    </main>
  );
}

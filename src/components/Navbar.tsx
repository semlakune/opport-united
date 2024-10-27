import { Button } from "@/components/ui/button.tsx";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function Navbar() {
  return (
    <div
      className={
        "relative px-5 lg:px-10 pt-5 flex items-center justify-between"
      }
    >
      <h1 className={"text-2xl lg:text-4xl"}>OpportUnited</h1>
      <div className={"hidden lg:flex items-center gap-2"}>
        <Button variant={"link"} className={"font-bold"}>
          Find a Job
        </Button>
        <Button variant={"link"} className={"font-bold"}>
          Companies
        </Button>
        <Button variant={"link"} className={"font-bold"}>
          Pricing
        </Button>
      </div>
      <div className={"hidden lg:flex items-center gap-2"}>
        <Button className={"rounded-full"} variant={"ghost"}>
          Login
        </Button>
        <Button className={"rounded-full"}>Sign up</Button>
      </div>

      {/* hamburger */}
      <div className={"lg:hidden"}>
        <Drawer>
          <DrawerTrigger>
            <svg
              className={"w-6 h-6"}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </DrawerTrigger>
          <DrawerContent className={"px-10 pb-10 h-[80%]"}>
            <div className="flex flex-col justify-between h-full">
              <div className={"flex flex-col gap-5 py-10 items-start"}>
                <Button variant={"link"} className={"font-bold text-4xl"}>
                  Find a Job
                </Button>
                <Button variant={"link"} className={"font-bold text-4xl"}>
                  Companies
                </Button>
                <Button variant={"link"} className={"font-bold text-4xl"}>
                  Pricing
                </Button>
              </div>
              <div className={"flex flex-col gap-2"}>
                <Button
                  className={"rounded-full text-2xl p-8"}
                  variant={"ghost"}
                >
                  Login
                </Button>
                <Button className={"rounded-full text-2xl p-8"}>Sign up</Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

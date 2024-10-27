export interface Job {
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

export interface FallingBlocksProps {
  WIDTH?: number;
  HEIGHT: number;
}

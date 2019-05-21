export interface IZTFData {
  asteroids: string[];
  greeting: string;
}

export interface IMOSData {
  obsjd: string;
  ra: number;
  dec: number;
  dra: number;
  ddec: number;
  ra3sig: number;
  dec3sig: number;
  vmag: number;
  rh: number;
  rdot: number;
  delta: number;
  phase: number;
  selong: number;
  sangle: number;
  vangle: number;
  trueanomaly: number;
  tmtp: number;
  pid: number;
  obsdate: string;
  infobits: number;
  field: number;
  ccdid: number;
  qid: number;
  rcid: number;
  fid: number;
  filtercode: string;
  expid: number;
  filefracday: number;
  seeing: number;
  airmass: number;
  moonillf: number;
  maglimit: number;
}

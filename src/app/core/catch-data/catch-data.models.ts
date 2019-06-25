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

export interface IZtfFosData {
  airmass: number;
  archive_url: string;
  ccdid: number;
  ddec: number;
  dec: number;
  dec3sig: number;
  delta: number;
  dra: number;
  expid: number;
  fid: number;
  field: number;
  filefracday: number;
  filtercode: string;
  foundid: number;
  infobits: number;
  irsa_diff_url: string;
  irsa_sci_url: string;
  maglimit: number;
  moonillf: number;
  objid: number;
  obsdate: string;
  obsjd: number;
  phase: number;
  pid: number;
  qid: number;
  ra: number;
  raDec?: string;
  ra3sig: number;
  rcid: number;
  rdot: number;
  rh: number;
  sangle: number;
  seeing: number;
  selong: number;
  tmtp: number;
  trueanomaly: number;
  vangle: number;
  vmag: number;
}

export interface INeatData {
  airmass: number;
  archive_url: string;
  ddec: number;
  dec: number;
  delta: number;
  designation: string;
  dra: number;
  exposure: number;
  filter: string;
  instrument: string;
  jd: number;
  phase: number;
  productid: string;
  ra: number;
  raDec?: string;
  rdot: number;
  rh: number;
  sangle: number;
  selong: number;
  tmtp: number;
  trueanomaly: number;
  unc_a: number;
  unc_b: number;
  unc_theta: number;
  vangle: number;
  vmag: number;
}

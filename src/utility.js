import platform from 'platform';
import murmurhash3 from 'murmurhash3js';

const SEED = Date.now();

const hashCode = (inp)=>{
  let arch = 'x86';
  if(platform.os.architecture == 64){
    arch = 'x64';
  }
  return murmurhash3[arch].hash128(inp, SEED);
}

export {hashCode};

import Emitter from "@emitterware/emitter";
import MapFactory from "@emitterware/map-factory";

function emitterFactory(name) {
  return new Emitter();
}

export const EmitterService = new MapFactory(emitterFactory);
export default EmitterService;

import { encode, neighbors } from 'ngeohash';

export default function generateGeohashes(latitude: number, longitude: number) {
  const geohashPoint = encode(latitude, longitude, 6);
  const geohashNearby = [geohashPoint.substring(0, 6)].concat(
    neighbors(encode(latitude, longitude, 6)),
  );
  const geohashCity = [geohashPoint.substring(0, 5)].concat(
    neighbors(encode(latitude, longitude, 5)),
  );
  return {
    geohashPoint,
    geohashNearby,
    geohashCity,
  };
}
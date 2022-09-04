import polyline from '@mapbox/polyline';
import { lineString, nearestPointOnLine, point } from '@turf/turf';
import { RideInterface } from '../../context/newRideContext';

export const getVehicleLocation = (location: any, vehiclePolyline: any[]) => {
  if (!vehiclePolyline) {
    return location;
  }

  const formattedPolyline = lineString(vehiclePolyline.map((currentPoint: any[]) => [currentPoint[1], currentPoint[0]]));
  const vehiclePoint = point([location.lng, location.lat]);

  const { geometry } = nearestPointOnLine(formattedPolyline, vehiclePoint);
  return {
    lat: geometry.coordinates[1],
    lng: geometry.coordinates[0],
  };
};


export const decodePolyline = (stopPointPolyline: any) => polyline.decode(stopPointPolyline);

export const getPolylineList = (currentStopPoint: any) => {
  const decodedPolyline: any[] = polyline.decode(currentStopPoint.polyline);

  return decodedPolyline.map(p => ({ latitude: p[0], longitude: p[1] }));
};

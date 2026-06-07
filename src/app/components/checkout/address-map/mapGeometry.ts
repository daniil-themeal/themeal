import {
  testDeliveryZones,
  type DeliveryAvailability,
  type DeliveryZone,
  type MapZonePoint,
  type TestAddress,
} from '../../../data/testAddresses';

export type MapOffset = {
  x: number;
  y: number;
};

export type AddressMapPoint = {
  address: TestAddress;
  point: MapZonePoint;
};

export const MAP_CANVAS_WIDTH = 1600;
export const MAP_CANVAS_HEIGHT = 1000;
export const MAP_DRAG_LIMIT_X = 720;
export const MAP_DRAG_LIMIT_Y = 460;
export const ADDRESS_HIT_RADIUS = 3.6;

export const MAP_LOGICAL_SIZE = 100;
export const MAP_CONTENT_SIZE = 1000;
export const MAP_CONTENT_SCALE = MAP_CONTENT_SIZE / MAP_LOGICAL_SIZE;
export const MAP_CONTENT_OFFSET_X = (MAP_CANVAS_WIDTH - MAP_CONTENT_SIZE) / 2;
export const MAP_CONTENT_OFFSET_Y = 0;

const ADDRESS_POINT_OFFSETS: MapZonePoint[] = [
  { x: -7, y: -5 },
  { x: -3, y: -7 },
  { x: 2, y: -6 },
  { x: 6, y: -4 },
  { x: -6, y: 0 },
  { x: -2, y: 1 },
  { x: 3, y: 0 },
  { x: 7, y: 2 },
  { x: -4, y: 5 },
  { x: 2, y: 6 },
  { x: 6, y: 7 },
  { x: 0, y: -1 },
];

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function mapX(logicalX: number) {
  return MAP_CONTENT_OFFSET_X + logicalX * MAP_CONTENT_SCALE;
}

export function mapY(logicalY: number) {
  return MAP_CONTENT_OFFSET_Y + logicalY * MAP_CONTENT_SCALE;
}

export function canvasXToLogical(canvasX: number) {
  return (canvasX - MAP_CONTENT_OFFSET_X) / MAP_CONTENT_SCALE;
}

export function canvasYToLogical(canvasY: number) {
  return (canvasY - MAP_CONTENT_OFFSET_Y) / MAP_CONTENT_SCALE;
}

export function getZoneCenter(zone: DeliveryZone): MapZonePoint {
  const total = zone.points.reduce(
    (sum, point) => ({
      x: sum.x + point.x,
      y: sum.y + point.y,
    }),
    { x: 0, y: 0 },
  );

  return {
    x: total.x / zone.points.length,
    y: total.y / zone.points.length,
  };
}

export function getAddressMapPoint(
  address: TestAddress,
  index: number,
  deliveryZones: DeliveryZone[] = testDeliveryZones,
): MapZonePoint {
  const zone = deliveryZones.find((item) => item.id === address.deliveryZoneId);
  const zoneCenter = zone ? getZoneCenter(zone) : { x: 50, y: 50 };
  const offset = ADDRESS_POINT_OFFSETS[index % ADDRESS_POINT_OFFSETS.length];

  return {
    x: clamp(zoneCenter.x + offset.x, 4, 96),
    y: clamp(zoneCenter.y + offset.y, 4, 96),
  };
}

export function getPinMapPointFromOffset(offset: MapOffset): MapZonePoint {
  const pinCanvasX = MAP_CANVAS_WIDTH / 2 - offset.x;
  const pinCanvasY = MAP_CANVAS_HEIGHT / 2 - offset.y;

  return {
    x: clamp(canvasXToLogical(pinCanvasX), 0, 100),
    y: clamp(canvasYToLogical(pinCanvasY), 0, 100),
  };
}

export function getDistance(a: MapZonePoint, b: MapZonePoint) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.sqrt(dx * dx + dy * dy);
}

export function isPointInsidePolygon(point: MapZonePoint, polygon: MapZonePoint[]) {
  let isInside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const current = polygon[i];
    const previous = polygon[j];

    const intersects =
      current.y > point.y !== previous.y > point.y &&
      point.x <
        ((previous.x - current.x) * (point.y - current.y)) /
          (previous.y - current.y) +
          current.x;

    if (intersects) {
      isInside = !isInside;
    }
  }

  return isInside;
}

export function getDeliveryZoneForPoint(
  point: MapZonePoint,
  deliveryZones: DeliveryZone[] = testDeliveryZones,
) {
  return deliveryZones.find((zone) => isPointInsidePolygon(point, zone.points)) ?? null;
}

export function getEffectiveDeliveryAvailability(
  point: MapZonePoint,
  deliveryZones: DeliveryZone[] = testDeliveryZones,
): DeliveryAvailability {
  const zone = getDeliveryZoneForPoint(point, deliveryZones);

  return zone?.availability ?? 'unavailable';
}

export function findAddressUnderMapPin({
  offset,
  addressMapPoints,
  hitRadius = ADDRESS_HIT_RADIUS,
}: {
  offset: MapOffset;
  addressMapPoints: AddressMapPoint[];
  hitRadius?: number;
}) {
  const pinPoint = getPinMapPointFromOffset(offset);

  const nearestAddressPoint = addressMapPoints.reduce<{
    item: AddressMapPoint | null;
    distance: number;
  }>(
    (nearest, item) => {
      const distance = getDistance(pinPoint, item.point);

      if (distance < nearest.distance) {
        return {
          item,
          distance,
        };
      }

      return nearest;
    },
    {
      item: null,
      distance: Number.POSITIVE_INFINITY,
    },
  );

  if (!nearestAddressPoint.item || nearestAddressPoint.distance > hitRadius) {
    return null;
  }

  return nearestAddressPoint.item.address;
}
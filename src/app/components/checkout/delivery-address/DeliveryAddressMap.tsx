import type { PointerEvent } from 'react';

import { FONT_FAMILY_TOKENS } from '../../common/fontFamilyTokens';
import {
  testDeliveryZones,
  type DeliveryAvailability,
  type DeliveryZone,
} from '../../../data/testAddresses';
import {
  MAP_CANVAS_HEIGHT,
  MAP_CANVAS_WIDTH,
  MAP_CONTENT_OFFSET_X,
  MAP_CONTENT_OFFSET_Y,
  MAP_CONTENT_SIZE,
  getEffectiveDeliveryAvailability,
  mapX,
  mapY,
  type AddressMapPoint,
  type MapOffset,
} from '../address-map/mapGeometry';

function MapPin({ availability }: { availability: DeliveryAvailability }) {
  const isAvailable = availability === 'available';

  return (
    <div
      className={`pointer-events-none absolute left-1/2 top-1/2 z-30 flex size-[32px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_8px_24px_rgba(47,56,70,0.28)] ${
        isAvailable ? 'bg-[#9a38ef]' : 'bg-[#ff4d4f]'
      }`}
    >
      <div className="size-[12px] rounded-full bg-white" />
    </div>
  );
}

function DeliveryZonesSvg({ selectedZoneId }: { selectedZoneId?: string }) {
  const polygonPoints = (zone: DeliveryZone) =>
    zone.points.map((point) => `${mapX(point.x)},${mapY(point.y)}`).join(' ');

  return (
    <>
      {testDeliveryZones.map((zone) => {
        const isAvailable = zone.availability === 'available';
        const isSelected = selectedZoneId === zone.id;

        return (
          <polygon
            key={zone.id}
            points={polygonPoints(zone)}
            fill={
              isAvailable
                ? 'rgba(171, 198, 4, 0.24)'
                : 'rgba(255, 77, 79, 0.2)'
            }
            stroke={isAvailable ? '#ABC604' : '#FF4D4F'}
            strokeWidth={isSelected ? 7 : 4}
            strokeLinejoin="round"
            opacity={isSelected ? 1 : 0.9}
          />
        );
      })}
    </>
  );
}

function AddressMarkersSvg({
  addressPoints,
  selectedAddressId,
}: {
  addressPoints: AddressMapPoint[];
  selectedAddressId?: string;
}) {
  return (
    <>
      {addressPoints.map(({ address, point }) => {
        const availability = getEffectiveDeliveryAvailability(point);
        const isAvailable = availability === 'available';
        const isSelected = selectedAddressId === address.id;

        return (
          <circle
            key={address.id}
            cx={mapX(point.x)}
            cy={mapY(point.y)}
            r={isSelected ? 12 : 8}
            fill={isAvailable ? '#ABC604' : '#FF4D4F'}
            stroke="white"
            strokeWidth={isSelected ? 4 : 3}
            opacity={isSelected ? 1 : 0.84}
          />
        );
      })}
    </>
  );
}

function MapArtwork({
  selectedZoneId,
  selectedAddressId,
  addressPoints,
}: {
  selectedZoneId?: string;
  selectedAddressId?: string;
  addressPoints: AddressMapPoint[];
}) {
  return (
    <svg
      width={MAP_CANVAS_WIDTH}
      height={MAP_CANVAS_HEIGHT}
      viewBox={`0 0 ${MAP_CANVAS_WIDTH} ${MAP_CANVAS_HEIGHT}`}
      className="block"
      aria-hidden="true"
      focusable="false"
    >
      <rect width={MAP_CANVAS_WIDTH} height={MAP_CANVAS_HEIGHT} fill="#EDF3F8" />

      <path
        d="M0 118 C150 54 284 64 408 144 C548 234 674 214 802 118 C954 4 1160 18 1304 134 C1426 232 1518 232 1600 184 L1600 0 L0 0 Z"
        fill="#F6F0DA"
        opacity="0.95"
      />

      <path
        d="M0 796 C118 704 258 692 396 778 C552 874 710 890 858 758 C1034 600 1236 604 1398 744 C1484 818 1546 840 1600 828 L1600 1000 L0 1000 Z"
        fill="#C7F1D8"
        opacity="0.95"
      />

      <path
        d="M64 238 C192 162 330 192 430 318 C538 454 682 442 806 304 C946 148 1138 150 1280 284 C1380 378 1480 398 1586 346"
        fill="none"
        stroke="#C7F1D8"
        strokeWidth="112"
        strokeLinecap="round"
        opacity="0.9"
      />

      <path
        d="M-80 580 C126 500 310 516 492 618 C664 714 846 718 1024 606 C1206 492 1408 472 1680 530"
        fill="none"
        stroke="#8EB0CC"
        strokeWidth="76"
        strokeLinecap="round"
        opacity="0.95"
      />

      <path
        d="M-80 580 C126 500 310 516 492 618 C664 714 846 718 1024 606 C1206 492 1408 472 1680 530"
        fill="none"
        stroke="#6F97B9"
        strokeWidth="34"
        strokeLinecap="round"
        opacity="0.95"
      />

      <path
        d="M594 -100 C642 142 666 330 650 510 C632 720 684 880 764 1100"
        fill="none"
        stroke="#8EB0CC"
        strokeWidth="82"
        strokeLinecap="round"
        opacity="0.95"
      />

      <path
        d="M594 -100 C642 142 666 330 650 510 C632 720 684 880 764 1100"
        fill="none"
        stroke="#6F97B9"
        strokeWidth="36"
        strokeLinecap="round"
        opacity="0.95"
      />

      <path d="M-60 172 L1660 366" stroke="#CDDDE8" strokeWidth="8" strokeLinecap="round" />
      <path d="M-60 354 L1660 206" stroke="#CDDDE8" strokeWidth="8" strokeLinecap="round" />
      <path d="M-40 474 L1660 516" stroke="#CDDDE8" strokeWidth="8" strokeLinecap="round" />
      <path d="M-80 852 L1680 716" stroke="#CDDDE8" strokeWidth="8" strokeLinecap="round" />
      <path d="M260 -80 L436 1080" stroke="#CDDDE8" strokeWidth="8" strokeLinecap="round" />
      <path d="M1040 -80 L850 1080" stroke="#CDDDE8" strokeWidth="8" strokeLinecap="round" />
      <path d="M1320 -80 L1460 1080" stroke="#CDDDE8" strokeWidth="8" strokeLinecap="round" />

      <rect
        x={MAP_CONTENT_OFFSET_X}
        y={MAP_CONTENT_OFFSET_Y}
        width={MAP_CONTENT_SIZE}
        height={MAP_CONTENT_SIZE}
        fill="rgba(255,77,79,0.045)"
        stroke="rgba(255,77,79,0.08)"
        strokeWidth="2"
      />

      <DeliveryZonesSvg selectedZoneId={selectedZoneId} />

      <text
        x="145"
        y="360"
        fill="#3F5D7A"
        opacity="0.72"
        fontFamily={FONT_FAMILY_TOKENS.sans}
        fontWeight="700"
        fontSize="44"
      >
        <tspan x="145" dy="0">
          DUBAI
        </tspan>
        <tspan x="145" dy="50">
          INTERNET CITY
        </tspan>
      </text>

      <text
        x="1130"
        y="450"
        fill="#E92FA1"
        opacity="0.8"
        fontFamily={FONT_FAMILY_TOKENS.sans}
        fontWeight="700"
        fontSize="38"
      >
        <tspan x="1130" dy="0">
          Signature 1 Hotel
        </tspan>
        <tspan x="1130" dy="44">
          Barsha Heights
        </tspan>
      </text>

      <rect x="608" y="635" width="54" height="32" rx="4" fill="#F2C83D" />
      <text
        x="635"
        y="657"
        textAnchor="middle"
        fill="#456079"
        fontFamily={FONT_FAMILY_TOKENS.sans}
        fontWeight="700"
        fontSize="22"
      >
        32
      </text>

      <rect x="180" y="840" width="62" height="34" rx="4" fill="#F2C83D" />
      <text
        x="211"
        y="864"
        textAnchor="middle"
        fill="#456079"
        fontFamily={FONT_FAMILY_TOKENS.sans}
        fontWeight="700"
        fontSize="22"
      >
        E11
      </text>

      <AddressMarkersSvg
        addressPoints={addressPoints}
        selectedAddressId={selectedAddressId}
      />
    </svg>
  );
}

type DeliveryAddressMapProps = {
  offset: MapOffset;
  isDragging: boolean;
  pinAvailability: DeliveryAvailability;
  selectedZoneId?: string;
  selectedAddressId?: string;
  addressPoints: AddressMapPoint[];
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLDivElement>) => void;
};

export function DeliveryAddressMap({
  offset,
  isDragging,
  pinAvailability,
  selectedZoneId,
  selectedAddressId,
  addressPoints,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: DeliveryAddressMapProps) {
  return (
    <div
      role="application"
      aria-label="Delivery map"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      className={`absolute inset-0 overflow-hidden bg-[#edf3f8] touch-none select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: MAP_CANVAS_WIDTH,
          height: MAP_CANVAS_HEIGHT,
          transform: `translate(-50%, -50%) translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        <MapArtwork
          selectedZoneId={selectedZoneId}
          selectedAddressId={selectedAddressId}
          addressPoints={addressPoints}
        />
      </div>

      <MapPin availability={pinAvailability} />
    </div>
  );
}

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';

import { Button } from '../common/Button';
import { CHECKOUT_LAYER_Z_INDEX } from '../common/zIndexTokens';
import { COLOR_TOKENS } from '../common/colorTokens';
import { InputClearButton } from '../common/InputClearButton';
import { getFieldSizeStyle } from '../common/fieldSizeTokens';
import { MapPinIcon } from '../common/icons';
import { FONT_FAMILY_TOKENS } from '../common/fontFamilyTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import {
  CHECKOUT_FONT_CLAMP_12_14,
  CHECKOUT_FONT_CLAMP_16_20,
} from './checkoutSpacing';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';
import {
  searchTestUaeAddresses,
  testDeliveryZones,
  testUaeAddresses,
  type DeliveryAvailability,
  type DeliveryZone,
  type TestAddress,
} from '../../data/testAddresses';
import {
  OutOfAreaContactForm,
  OutOfAreaContactNotice,
} from './OutOfAreaContactForm';
import {
  MAP_CANVAS_HEIGHT,
  MAP_CANVAS_WIDTH,
  MAP_CONTENT_OFFSET_X,
  MAP_CONTENT_OFFSET_Y,
  MAP_CONTENT_SIZE,
  MAP_DRAG_LIMIT_X,
  MAP_DRAG_LIMIT_Y,
  clamp,
  findAddressUnderMapPin,
  getAddressMapPoint,
  getDeliveryZoneForPoint,
  getEffectiveDeliveryAvailability,
  getPinMapPointFromOffset,
  mapX,
  mapY,
  type AddressMapPoint,
  type MapOffset,
} from './address-map/mapGeometry';

type DeliveryAddressScreenProps = {
  selectedAddress: TestAddress | null;
  onSelectedAddressChange: (address: TestAddress | null) => void;
  onContinue?: () => void;
};

type DeliveryAddressScreenCssVariables = CSSProperties & {
  '--delivery-address-page-bg': string;
  '--delivery-address-card-bg': string;
  '--delivery-address-search-bg': string;
  '--delivery-address-search-border': string;
  '--delivery-address-search-focus': string;
  '--delivery-address-text': string;
  '--delivery-address-muted': string;
  '--delivery-address-placeholder': string;
  '--delivery-address-hover-bg': string;
  '--delivery-address-border': string;
  '--delivery-address-primary': string;
  '--delivery-address-success': string;
  '--delivery-address-danger': string;
  '--delivery-address-button-disabled-bg': string;
  '--delivery-address-button-disabled-text': string;
  '--delivery-address-input-font-size': string;
  '--delivery-address-title-font-size': string;
  '--delivery-address-subtitle-font-size': string;
  '--delivery-address-empty-font-size': string;
};

const deliveryAddressScreenStyle: DeliveryAddressScreenCssVariables = {
  '--delivery-address-page-bg': COLOR_TOKENS.base.cream,
  '--delivery-address-card-bg': COLOR_TOKENS.base.white,
  '--delivery-address-search-bg': COLOR_TOKENS.neutral[50],
  '--delivery-address-search-border': COLOR_TOKENS.neutral[200],
  '--delivery-address-search-focus': COLOR_TOKENS.primary[500],
  '--delivery-address-text': COLOR_TOKENS.neutral[900],
  '--delivery-address-muted': COLOR_TOKENS.neutral[500],
  '--delivery-address-placeholder': COLOR_TOKENS.neutral[200],
  '--delivery-address-hover-bg': COLOR_TOKENS.neutral[50],
  '--delivery-address-border': COLOR_TOKENS.neutral[100],
  '--delivery-address-primary': COLOR_TOKENS.primary[500],
  '--delivery-address-success': COLOR_TOKENS.success[500],
  '--delivery-address-danger': COLOR_TOKENS.danger[400],
  '--delivery-address-button-disabled-bg': COLOR_TOKENS.neutral[75],
  '--delivery-address-button-disabled-text': COLOR_TOKENS.neutral[300],
  '--delivery-address-input-font-size': FONT_SIZE_TOKENS[16],
  '--delivery-address-title-font-size': CHECKOUT_FONT_CLAMP_16_20,
  '--delivery-address-subtitle-font-size': CHECKOUT_FONT_CLAMP_12_14,
  '--delivery-address-empty-font-size': FONT_SIZE_TOKENS[14],
};

function hexToRgba(hex: string, alpha: number) {
  const normalizedHex = hex.replace('#', '');

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red},${green},${blue},${alpha})`;
}

function DeliveryAvailableIcon() {
  return (
    <div
      className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--delivery-address-success)]"
      aria-hidden="true"
    >
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path
          d="M1 4L3.7 6.7L9 1"
          stroke={COLOR_TOKENS.base.white}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function DeliveryUnavailableIcon() {
  return (
    <div
      className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--delivery-address-danger)]"
      aria-hidden="true"
    >
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path
          d="M1 1L7 7M7 1L1 7"
          stroke={COLOR_TOKENS.base.white}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1.5 1.5L6.5 7L1.5 12.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MapPin({ availability }: { availability: DeliveryAvailability }) {
  const isAvailable = availability === 'available';

  return (
    <div
      className={[
        'pointer-events-none absolute left-1/2 top-1/2 flex size-[32px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_8px_24px_rgba(47,56,70,0.28)]',
        isAvailable
          ? 'bg-[var(--delivery-address-primary)]'
          : 'bg-[var(--delivery-address-danger)]',
      ].join(' ')}
      style={{ zIndex: CHECKOUT_LAYER_Z_INDEX.stepFloat }}
    >
      <div className="size-[12px] rounded-full bg-[var(--delivery-address-card-bg)]" />
    </div>
  );
}

function DeliveryZonesSvg({
  selectedZoneId,
}: {
  selectedZoneId?: string;
}) {
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
                ? hexToRgba(COLOR_TOKENS.success[500], 0.24)
                : hexToRgba(COLOR_TOKENS.danger[400], 0.2)
            }
            stroke={isAvailable ? COLOR_TOKENS.success[500] : COLOR_TOKENS.danger[400]}
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
            fill={isAvailable ? COLOR_TOKENS.success[500] : COLOR_TOKENS.danger[400]}
            stroke={COLOR_TOKENS.base.white}
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

      <path
        d="M-60 172 L1660 366"
        stroke="#CDDDE8"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M-60 354 L1660 206"
        stroke="#CDDDE8"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M-40 474 L1660 516"
        stroke="#CDDDE8"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M-80 852 L1680 716"
        stroke="#CDDDE8"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M260 -80 L436 1080"
        stroke="#CDDDE8"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M1040 -80 L850 1080"
        stroke="#CDDDE8"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M1320 -80 L1460 1080"
        stroke="#CDDDE8"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <rect
        x={MAP_CONTENT_OFFSET_X}
        y={MAP_CONTENT_OFFSET_Y}
        width={MAP_CONTENT_SIZE}
        height={MAP_CONTENT_SIZE}
        fill={hexToRgba(COLOR_TOKENS.danger[400], 0.045)}
        stroke={hexToRgba(COLOR_TOKENS.danger[400], 0.08)}
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

function MockMap({
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
}: {
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
}) {
  return (
    <div
      role="application"
      aria-label="Delivery map"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      className={`absolute inset-0 touch-none select-none overflow-hidden bg-[#edf3f8] ${
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

function AddressSearchInput({
  value,
  onChange,
  onClear,
  onFocus,
  onKeyDown,
  autoFocus = false,
  placeholder = 'Type your address',
}: {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const showClearButton = Boolean(value);

  return (
    <div
      className={[
        'flex h-[48px] items-center rounded-[8px] bg-[var(--delivery-address-search-bg)] pl-[16px] ring-1 ring-[var(--delivery-address-search-border)] focus-within:ring-2 focus-within:ring-[var(--delivery-address-search-focus)]',
        showClearButton ? 'pr-0' : 'pr-[16px]',
      ].join(' ')}
      style={getFieldSizeStyle('large')}
    >
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent font-sans text-[length:var(--delivery-address-input-font-size)] font-semibold leading-[140%] text-[var(--delivery-address-text)] outline-none placeholder:text-[var(--delivery-address-placeholder)]"
      />

      {showClearButton ? (
        <InputClearButton
          onClick={onClear}
          aria-label="Clear address"
          className="ml-[8px]"
        />
      ) : null}
    </div>
  );
}

function SuggestionRow({
  suggestion,
  availability,
  onSelect,
  strong = false,
  isActive = false,
  buttonRef,
}: {
  suggestion: TestAddress;
  availability: DeliveryAvailability;
  onSelect: (suggestion: TestAddress) => void;
  strong?: boolean;
  isActive?: boolean;
  buttonRef?: (node: HTMLButtonElement | null) => void;
}) {
  const isAvailable = availability === 'available';

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => onSelect(suggestion)}
      className={[
        'flex w-full cursor-pointer gap-[12px] border-b border-[var(--delivery-address-border)] px-[16px] py-[16px] text-left transition-colors',
        isActive
          ? 'bg-[var(--delivery-address-hover-bg)]'
          : 'hover:bg-[var(--delivery-address-hover-bg)]',
      ].join(' ')}
    >
      <div className="mt-[2px] shrink-0 text-[var(--delivery-address-muted)]">
        <MapPinIcon size={16} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'min-w-0 font-sans text-[16px] leading-[125%] text-[var(--delivery-address-text)]',
            strong || isActive ? 'font-bold' : 'font-semibold',
          ].join(' ')}
        >
          {suggestion.title}
        </p>

        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'min-w-0 font-sans text-[length:var(--delivery-address-subtitle-font-size)] font-semibold leading-[130%] text-[var(--delivery-address-muted)]',
          ].join(' ')}
        >
          {suggestion.subtitle}
        </p>
      </div>

      <div className="mt-[1px] shrink-0">
        {isAvailable ? <DeliveryAvailableIcon /> : <DeliveryUnavailableIcon />}
      </div>
    </button>
  );
}

function SelectedAddressBlock({
  address,
  availability,
  className = '',
}: {
  address: TestAddress;
  availability: DeliveryAvailability;
  className?: string;
}) {
  const isAvailable = availability === 'available';

  return (
    <div className={`flex items-center justify-center gap-[12px] ${className}`}>
      <div className="shrink-0 text-[var(--delivery-address-muted)]">
        <MapPinIcon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-sans text-[length:var(--delivery-address-input-font-size)] font-semibold leading-[135%] text-[var(--delivery-address-muted)]">
          {address.title}, {address.subtitle}
        </p>
      </div>

      <div className="shrink-0">
        {isAvailable ? <DeliveryAvailableIcon /> : <DeliveryUnavailableIcon />}
      </div>
    </div>
  );
}

export function DeliveryAddressScreen({
  selectedAddress,
  onSelectedAddressChange,
  onContinue,
}: DeliveryAddressScreenProps) {
  const [addressQuery, setAddressQuery] = useState(selectedAddress?.title ?? '');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [mapOffset, setMapOffset] = useState<MapOffset>({ x: 0, y: 0 });
  const [isMapDragging, setIsMapDragging] = useState(false);
  const [isOutOfAreaContactFormOpen, setIsOutOfAreaContactFormOpen] = useState(false);

  const suggestionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mapOffsetRef = useRef<MapOffset>({ x: 0, y: 0 });
  const dragStartRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const hasQuery = addressQuery.trim().length > 0;
  const canContinue = Boolean(selectedAddress);

  const visibleSuggestions = useMemo(() => {
    return searchTestUaeAddresses(addressQuery);
  }, [addressQuery]);

  const addressMapPoints = useMemo<AddressMapPoint[]>(() => {
    return testUaeAddresses.map((address, index) => ({
      address,
      point: getAddressMapPoint(address, index),
    }));
  }, []);

  const addressAvailabilityById = useMemo(() => {
    return new Map(
      addressMapPoints.map(({ address, point }) => [
        address.id,
        getEffectiveDeliveryAvailability(point),
      ]),
    );
  }, [addressMapPoints]);

  const selectedAddressMapPoint = useMemo(() => {
    if (!selectedAddress) return null;

    return addressMapPoints.find((item) => item.address.id === selectedAddress.id) ?? null;
  }, [addressMapPoints, selectedAddress]);

  const selectedDeliveryZone = useMemo(() => {
    if (!selectedAddressMapPoint) return null;

    return getDeliveryZoneForPoint(selectedAddressMapPoint.point);
  }, [selectedAddressMapPoint]);

  const selectedAddressAvailability = useMemo<DeliveryAvailability>(() => {
    if (!selectedAddressMapPoint) return 'unavailable';

    return getEffectiveDeliveryAvailability(selectedAddressMapPoint.point);
  }, [selectedAddressMapPoint]);

  const hasSuggestions = visibleSuggestions.length > 0;
  const selectedZoneId = selectedDeliveryZone?.id;
  const selectedAddressId = selectedAddress?.id;
  const shouldShowOutOfAreaContactForm =
    Boolean(selectedAddress) && selectedAddressAvailability === 'unavailable';

  const pinAvailability = useMemo(() => {
    const pinPoint = getPinMapPointFromOffset(mapOffset);

    return getEffectiveDeliveryAvailability(pinPoint);
  }, [mapOffset]);

  useEffect(() => {
    suggestionRefs.current = suggestionRefs.current.slice(0, visibleSuggestions.length);
  }, [visibleSuggestions.length]);

  useEffect(() => {
    mapOffsetRef.current = mapOffset;
  }, [mapOffset]);

  useEffect(() => {
    if (!hasQuery || selectedAddress || !hasSuggestions) return;

    const activeNode = suggestionRefs.current[activeSuggestionIndex];

    activeNode?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }, [activeSuggestionIndex, hasQuery, hasSuggestions, selectedAddress]);

  useEffect(() => {
    setAddressQuery(selectedAddress?.title ?? '');
  }, [selectedAddress]);

  const selectAddress = (address: TestAddress) => {
    onSelectedAddressChange(address);
    setAddressQuery(address.title);
    setMobileSearchOpen(false);
    setActiveSuggestionIndex(0);
  };

  const applyAddressFromMapPin = (offset: MapOffset) => {
    const matchedAddress = findAddressUnderMapPin({
      offset,
      addressMapPoints,
    });

    if (!matchedAddress) return;

    selectAddress(matchedAddress);
  };

  const handleAddressChange = (value: string) => {
    setAddressQuery(value);
    onSelectedAddressChange(null);
    setActiveSuggestionIndex(0);
  };

  const handleClearAddress = () => {
    setAddressQuery('');
    onSelectedAddressChange(null);
    setActiveSuggestionIndex(0);
  };

  const handleSelectSuggestion = (suggestion: TestAddress) => {
    selectAddress(suggestion);
  };

  const handleContinue = () => {
    if (!canContinue) return;
    onContinue?.();
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (selectedAddress) return;

    if (event.key === 'ArrowDown') {
      if (!hasSuggestions) return;

      event.preventDefault();

      setActiveSuggestionIndex((current) =>
        current >= visibleSuggestions.length - 1 ? 0 : current + 1,
      );

      return;
    }

    if (event.key === 'ArrowUp') {
      if (!hasSuggestions) return;

      event.preventDefault();

      setActiveSuggestionIndex((current) =>
        current <= 0 ? visibleSuggestions.length - 1 : current - 1,
      );

      return;
    }

    if (event.key === 'Enter') {
      if (!hasSuggestions) return;

      event.preventDefault();

      const activeSuggestion = visibleSuggestions[activeSuggestionIndex];

      if (activeSuggestion) {
        handleSelectSuggestion(activeSuggestion);
      }

      return;
    }

    if (event.key === 'Escape') {
      if (mobileSearchOpen) {
        event.stopPropagation();
        setActiveSuggestionIndex(0);
        setMobileSearchOpen(false);
        return;
      }

      setActiveSuggestionIndex(0);
    }
  };

  const handleMapPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;

    event.currentTarget.setPointerCapture(event.pointerId);

    dragStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      offsetX: mapOffsetRef.current.x,
      offsetY: mapOffsetRef.current.y,
    };

    setIsMapDragging(true);
  };

  const handleMapPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragStart = dragStartRef.current;

    if (!dragStart || dragStart.pointerId !== event.pointerId) return;

    const nextOffset = {
      x: clamp(
        dragStart.offsetX + event.clientX - dragStart.x,
        -MAP_DRAG_LIMIT_X,
        MAP_DRAG_LIMIT_X,
      ),
      y: clamp(
        dragStart.offsetY + event.clientY - dragStart.y,
        -MAP_DRAG_LIMIT_Y,
        MAP_DRAG_LIMIT_Y,
      ),
    };

    mapOffsetRef.current = nextOffset;
    setMapOffset(nextOffset);
  };

  const finishMapDrag = (event: PointerEvent<HTMLDivElement>) => {
    const dragStart = dragStartRef.current;

    if (dragStart?.pointerId === event.pointerId) {
      dragStartRef.current = null;
      setIsMapDragging(false);

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      applyAddressFromMapPin(mapOffsetRef.current);
    }
  };

  const renderMap = () => (
    <MockMap
      offset={mapOffset}
      isDragging={isMapDragging}
      pinAvailability={pinAvailability}
      selectedZoneId={selectedZoneId}
      selectedAddressId={selectedAddressId}
      addressPoints={addressMapPoints}
      onPointerDown={handleMapPointerDown}
      onPointerMove={handleMapPointerMove}
      onPointerUp={finishMapDrag}
      onPointerCancel={finishMapDrag}
    />
  );

  const renderSuggestions = () => {
    if (visibleSuggestions.length === 0) {
      return (
        <p className="px-[24px] py-[24px] font-sans text-[length:var(--delivery-address-empty-font-size)] font-semibold leading-[140%] text-[var(--delivery-address-muted)] md:px-[24px]">
          No UAE addresses found
        </p>
      );
    }

    return visibleSuggestions.map((suggestion, index) => (
      <SuggestionRow
        key={suggestion.id}
        suggestion={suggestion}
        availability={addressAvailabilityById.get(suggestion.id) ?? 'unavailable'}
        onSelect={handleSelectSuggestion}
        strong={index === 0}
        isActive={index === activeSuggestionIndex}
        buttonRef={(node) => {
          suggestionRefs.current[index] = node;
        }}
      />
    ));
  };

  return (
    <div
      className="relative h-full min-h-full overflow-hidden bg-white md:bg-[var(--delivery-address-page-bg)]"
      style={deliveryAddressScreenStyle}
    >
      <style>
        {`
          .address-suggestions-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: var(--delivery-address-border) transparent;
          }

          .address-suggestions-scrollbar::-webkit-scrollbar {
            width: 12px;
          }

          .address-suggestions-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .address-suggestions-scrollbar::-webkit-scrollbar-thumb {
            background: var(--delivery-address-border);
            border-radius: 999px;
          }

          .address-suggestions-scrollbar::-webkit-scrollbar-button {
            display: none;
          }
        `}
      </style>

      <div className="absolute inset-0 hidden md:block">{renderMap()}</div>

      {shouldShowOutOfAreaContactForm ? (
        <OutOfAreaContactNotice
          onContactMe={() => setIsOutOfAreaContactFormOpen(true)}
          className="hidden md:absolute md:bottom-[48px] md:left-1/2 md:z-[20] md:flex md:w-[680px] md:-translate-x-1/2"
        />
      ) : null}

      <div
        className="hidden md:absolute md:left-1/2 md:top-[42px] md:z-[10] md:flex md:w-[680px] md:-translate-x-1/2 md:flex-col md:overflow-hidden md:rounded-[12px] md:bg-[var(--delivery-address-card-bg)] md:shadow-[0_12px_32px_rgba(47,56,70,0.16)]"
      >
        <div className="flex gap-[20px] p-[32px]">
          <div className="flex-1">
            <AddressSearchInput
              value={addressQuery}
              onChange={handleAddressChange}
              onClear={handleClearAddress}
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          <Button
            type="button"
            variant="primary"
            size="medium"
            disabled={!canContinue}
            className="w-[140px] shrink-0"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>

        {selectedAddress ? (
          <SelectedAddressBlock
            address={selectedAddress}
            availability={selectedAddressAvailability}
            className="px-[32px] pb-[28px]"
          />
        ) : null}

        {hasQuery && !selectedAddress ? (
          <div className="address-suggestions-scrollbar max-h-[292px] overflow-y-auto">
            {renderSuggestions()}
          </div>
        ) : null}
      </div>

      <div className="flex h-full min-h-full flex-col md:hidden">
        {mobileSearchOpen ? (
          <div className="flex h-full min-h-full flex-col bg-[var(--delivery-address-card-bg)]">
            <div className="px-[20px] pt-[24px]">
              <AddressSearchInput
                value={addressQuery}
                onChange={handleAddressChange}
                onClear={handleClearAddress}
                onKeyDown={handleSearchKeyDown}
                autoFocus
              />
            </div>

            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="mt-[20px] flex w-full cursor-pointer items-center justify-between px-[36px] py-[8px] text-left text-[var(--delivery-address-muted)]"
            >
              <span className="font-sans text-[length:var(--delivery-address-title-font-size)] font-bold leading-[140%]">
                Back to map
              </span>

              <ChevronRightIcon />
            </button>

            <div className="address-suggestions-scrollbar mt-[8px] min-h-0 flex-1 overflow-y-auto">
              {hasQuery ? renderSuggestions() : null}
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-full flex-col bg-[var(--delivery-address-card-bg)]">
            <div className="relative min-h-[360px] flex-1 overflow-hidden">
              {renderMap()}

              {shouldShowOutOfAreaContactForm ? (
                <OutOfAreaContactNotice
                  onContactMe={() => setIsOutOfAreaContactFormOpen(true)}
                  className="absolute bottom-[20px] left-[20px] right-[20px] z-[20]"
                />
              ) : null}
            </div>

            <div className="shrink-0 bg-[var(--delivery-address-card-bg)] px-[20px] pb-[36px] pt-[24px]">
              {selectedAddress ? (
                <SelectedAddressBlock
                  address={selectedAddress}
                  availability={selectedAddressAvailability}
                  className="mb-[20px]"
                />
              ) : null}

              <div className="flex flex-col gap-[16px] sm:flex-row">
                <div className="min-w-0 flex-1">
                  <AddressSearchInput
                    value={addressQuery}
                    onChange={handleAddressChange}
                    onClear={handleClearAddress}
                    onFocus={() => setMobileSearchOpen(true)}
                    onKeyDown={handleSearchKeyDown}
                  />
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="medium"
                  disabled={!canContinue}
                  className="w-full sm:w-[140px] sm:shrink-0"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <OutOfAreaContactForm
        isOpen={isOutOfAreaContactFormOpen}
        onClose={() => setIsOutOfAreaContactFormOpen(false)}
      />
    </div>
  );
}
import type { MutableRefObject } from 'react';
import type {
  DeliveryAvailability,
  TestAddress,
} from '../../../data/testAddresses';
import { MapPinIcon } from '../../common/icons';
import { TEXT_TRIM_CLASS_NAME } from '../../common/textTrimTokens';
import { DeliveryAvailableIcon, DeliveryUnavailableIcon } from './addressIcons';

type SuggestionRowProps = {
  suggestion: TestAddress;
  availability: DeliveryAvailability;
  onSelect: (suggestion: TestAddress) => void;
  strong?: boolean;
  isActive?: boolean;
  buttonRef?: (node: HTMLButtonElement | null) => void;
};

function SuggestionRow({
  suggestion,
  availability,
  onSelect,
  strong = false,
  isActive = false,
  buttonRef,
}: SuggestionRowProps) {
  const isAvailable = availability === 'available';

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => onSelect(suggestion)}
      className={`flex w-full cursor-pointer gap-[12px] border-b border-[#d9dee5] px-[16px] py-[12px] text-left transition-colors ${
        isActive ? 'bg-[#f3f4f7]' : 'hover:bg-[#f7f8fa]'
      }`}
    >
      <div className="mt-[2px] shrink-0 text-[#8594AC]">
        <MapPinIcon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'min-w-0 font-quicksand-semibold text-[16px] leading-[1.25] text-[#383e48]',
            strong || isActive ? 'font-quicksand-bold' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {suggestion.title}
        </p>

        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'mt-[2px] min-w-0 font-quicksand-semibold text-[12px] leading-[1.3] text-[#8594ac]',
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

type AddressSuggestionsProps = {
  suggestions: TestAddress[];
  availabilityById: Map<string, DeliveryAvailability>;
  activeSuggestionIndex: number;
  suggestionRefs: MutableRefObject<Array<HTMLButtonElement | null>>;
  onSelect: (suggestion: TestAddress) => void;
};

export function AddressSuggestions({
  suggestions,
  availabilityById,
  activeSuggestionIndex,
  suggestionRefs,
  onSelect,
}: AddressSuggestionsProps) {
  if (suggestions.length === 0) {
    return (
      <p className="px-[24px] py-[18px] font-quicksand-semibold text-[14px] leading-[1.4] text-[#8594ac] md:px-[24px]">
        No UAE addresses found
      </p>
    );
  }

  return suggestions.map((suggestion, index) => (
    <SuggestionRow
      key={suggestion.id}
      suggestion={suggestion}
      availability={availabilityById.get(suggestion.id) ?? 'unavailable'}
      onSelect={onSelect}
      strong={index === 0}
      isActive={index === activeSuggestionIndex}
      buttonRef={(node) => {
        suggestionRefs.current[index] = node;
      }}
    />
  ));
}

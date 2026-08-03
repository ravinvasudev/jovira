"use client";

import { useEffect, useId, useRef, useState } from "react";

type PhotonProperties = {
  name?: string;
  housenumber?: string;
  street?: string;
  city?: string;
  state?: string;
  postcode?: string;
};

type PhotonResponse = {
  features: Array<{ properties: PhotonProperties }>;
};

function formatSuggestion(props: PhotonProperties): string {
  const parts: string[] = [];

  if (props.housenumber && props.street) {
    parts.push(`${props.housenumber} ${props.street}`);
  } else if (props.street) {
    parts.push(props.street);
  } else if (props.name) {
    parts.push(props.name);
  }

  if (props.city) parts.push(props.city);
  if (props.state) parts.push(props.state);
  if (props.postcode) parts.push(props.postcode);

  return parts.join(", ");
}

type AddressAutocompleteProps = {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
};

export function AddressAutocomplete({
  value,
  onChange,
  required,
  placeholder,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onOutsideClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  function handleInputChange(newValue: string) {
    onChange(newValue);
    setHighlightedIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (newValue.trim().length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        // Photon: OSM-based, typeahead-optimised, Canada-only, no API key required
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(newValue)}&countrycode=ca&limit=6&lang=en`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data: PhotonResponse = await res.json();
        const labels = data.features
          .map((f) => formatSuggestion(f.properties))
          .filter(Boolean);
        setSuggestions(labels);
        setIsOpen(labels.length > 0);
      } catch {
        // silently fail — user can still type the address freely
      } finally {
        setLoading(false);
      }
    }, 350);
  }

  function selectSuggestion(label: string) {
    onChange(label);
    setSuggestions([]);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, suggestions.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, -1));
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          event.preventDefault();
          selectSuggestion(suggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        required={required}
        autoComplete="off"
        placeholder={placeholder}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none ring-brand/30 placeholder:text-foreground/50 focus:ring-2"
      />

      {loading && (
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-foreground/40"
        >
          Searching…
        </span>
      )}

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
        >
          {suggestions.map((label, index) => (
            <li
              key={label}
              role="option"
              aria-selected={index === highlightedIndex}
              onMouseDown={() => selectSuggestion(label)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                index === highlightedIndex
                  ? "bg-brand/10 text-brand"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

const MultiSelectDropdown = ({
  options,
  placeholder = "Select options",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const containerRef = useRef(null);

  const toggleOption = (option) => {
    setSelected(prev =>
      prev.some(o => o.value === option.value)
        ? prev.filter(o => o.value !== option.value)
        : [...prev, option]
    );
  };

  const removeChip = (value) => {
    setSelected(prev => prev.filter(o => o.value !== value));
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard support
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(prev => !prev);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} style={{ width: 300 }}>
      {/* Control */}
      <div
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-multiselectable="true"
        onClick={() => setIsOpen(prev => !prev)}
        onKeyDown={handleKeyDown}
        style={{
          border: "1px solid #ccc",
          padding: "6px",
          borderRadius: 4,
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          cursor: "pointer",
        }}
      >
        {selected.length === 0 && (
          <span style={{ color: "#999" }}>{placeholder}</span>
        )}

        {selected.map(option => (
          <span
            key={option.value}
            style={{
              background: "#e0e0e0",
              padding: "4px 8px",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {option.label}
            <button
              aria-label={`Remove ${option.label}`}
              onClick={e => {
                e.stopPropagation();
                removeChip(option.value);
              }}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          style={{
            marginTop: 4,
            border: "1px solid #ccc",
            borderRadius: 4,
            maxHeight: 150,
            overflowY: "auto",
            padding: 0,
            listStyle: "none",
          }}
        >
          {options.map(option => {
            const isSelected = selected.some(
              o => o.value === option.value
            );

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => toggleOption(option)}
                style={{
                  padding: "8px",
                  background: isSelected ? "#f0f0f0" : "#fff",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  style={{ marginRight: 8 }}
                />
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;

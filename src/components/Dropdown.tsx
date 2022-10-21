import { useState, ReactElement, useRef, useCallback } from 'react';
import cls from 'classnames';
import useOutsideClickWatcher from 'hooks/useOutsideClickWatcher';

export interface DropDownItem<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface DropdownProps<T> {
  items: DropDownItem<T>[];
  value: T;
  onChange?: (value: T) => void;
  className?: string;
  placeholder?: string;
  'aria-labelledby'?: string;
}

function Dropdown<T>({
  items,
  value,
  onChange,
  className,
  placeholder,
  ...rest
}: DropdownProps<T>): ReactElement {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  useOutsideClickWatcher(
    menuRef,
    useCallback(() => {
      setOpen(false);
    }, [])
  );

  const selectedItemIndex = items.findIndex((item) => item.value === value);
  const selectedItem = selectedItemIndex >= 0 ? items[selectedItemIndex] : null;

  return (
    <div className={cls('inline-block relative', className)}>
      <button
        type="button"
        className="relative w-full cursor-default rounded-md bg-white text-light-blue py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-light-blue sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={rest['aria-labelledby']}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex items-center">
          <span className="ml-3 block truncate">{selectedItem?.label ?? placeholder ?? ''}</span>
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
            />
          </svg>
        </span>
      </button>

      <ul
        ref={menuRef}
        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabIndex={-1}
        role="listbox"
        aria-labelledby={rest['aria-labelledby']}
        aria-activedescendant={`listbox-option-${selectedItemIndex}`}
        hidden={!open}
      >
        {items.map((item, index) => {
          return (
            <li
              key={index}
              className={cls(
                'relative cursor-default select-none py-2 pl-3 pr-9',
                index === selectedItemIndex && 'text-light-blue'
              )}
              id={`listbox-option-${index}`}
              role="option"
              aria-selected={index === selectedItemIndex}
              onClick={() => {
                setOpen(false);
                if (onChange) onChange(item.value);
              }}
            >
              <div className="flex items-center">
                <span className="font-normal ml-3 block truncate">{item.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dropdown;

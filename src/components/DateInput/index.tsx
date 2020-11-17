import React, { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { add, format, isSameMonth } from 'date-fns';

import ChevronLeft from '~/assets/icons/chevron-left.svg';
import ChevronRight from '~/assets/icons/chevron-right.svg';

import { DateInputProps as Props } from './types';

import './DateInput.scss';

const nextMonth = add(new Date(), { months: 1 });
const monthsList: Date[] = [];
// 50 years of months
for (let i = 0; i < 600; i++) {
  monthsList.push(add(nextMonth, { months: i }));
}

const DateInput = (props: Props): JSX.Element => {
  const [date, setDate] = useState(props.startDate);
  const [showPopper, setShowPopper] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow' }],
    placement: 'bottom-start'
  });

  const monthsComponents = monthsList.map(
    (month: Date, i: number): JSX.Element => (
      <p
        className="DateInput__date DateInput__listItem"
        key={i}
        onClick={() => {
          setDate(month);
          props.onChange && props.onChange(month);
          setShowPopper(!showPopper);
        }}
      >
        <span className="DateInput__date--bold">{format(month, 'MMMM')}</span>
        {format(month, 'yyyy')}
      </p>
    )
  );

  const addMonth = useRef((value: number) => {
    const newDate = add(date, { months: value });
    setDate(newDate);
    props.onChange && props.onChange(newDate);
  });

  useEffect(() => {
    addMonth.current = (value: number) => {
      const newDate = add(date, { months: value });
      setDate(newDate);
      props.onChange && props.onChange(newDate);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          addMonth.current(1);
          break;

        case 'ArrowLeft':
          if (!isSameMonth(nextMonth, date)) {
            addMonth.current(-1);
          }
          break;
      }
    };

    window.document.addEventListener('keydown', handleKeyPress);

    return () => {
      window.document.removeEventListener('keydown', handleKeyPress);
    };
  }, [date, props]);

  return (
    <div className="DateInput" ref={setReferenceElement}>
      <label>Reach goal by</label>
      <div className="DateInput__input">
        <button
          className="DateInput__button"
          disabled={isSameMonth(nextMonth, date)}
          onClick={(): void => addMonth.current(-1)}
        >
          <ChevronLeft className="DateInput__icon" />
        </button>
        <p
          className="DateInput__date"
          onClick={() => setShowPopper(!showPopper)}
        >
          <span className="DateInput__date--bold">{format(date, 'MMMM')}</span>
          {format(date, 'yyyy')}
        </p>
        <button
          className="DateInput__button"
          onClick={(): void => addMonth.current(1)}
        >
          <ChevronRight className="DateInput__icon" />
        </button>
      </div>

      {showPopper && (
        <div
          className="DateInput__popper"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {monthsComponents}
        </div>
      )}
    </div>
  );
};

export default DateInput;

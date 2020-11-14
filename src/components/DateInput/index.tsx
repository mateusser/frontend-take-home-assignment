import React, { Component } from 'react';
import add from 'date-fns/add';
import format from 'date-fns/format';

import ChevronLeft from '~/assets/icons/chevron-left.svg';
import ChevronRight from '~/assets/icons/chevron-right.svg';

import { DateInputState as State } from './types';

import './DateInput.scss';
import { isSameMonth } from 'date-fns';

class DateInput extends Component<{}, State> {
  private _nextMonth: Date;

  constructor(props: {}) {
    super(props);

    const today = new Date();
    const nextMonth = add(today, { months: 1 });
    this._nextMonth = new Date(nextMonth);

    this.state = {
      date: nextMonth
    };
  }

  public componentDidMount(): void {
    window.document.addEventListener('keydown', this._handleKeyPress);
  }

  public componentWillUnmount(): void {
    window.document.removeEventListener('keydown', this._handleKeyPress);
  }

  public render(): JSX.Element {
    const { date } = this.state;

    return (
      <div className="DateInput">
        <label>Reach goal by</label>
        <div className="DateInput__input">
          <button
            className="DateInput__button"
            disabled={isSameMonth(this._nextMonth, date)}
            onClick={(): void => this._addMonth(-1)}
          >
            <ChevronLeft className="DateInput__icon" />
          </button>
          <p className="DateInput__date">
            <span className="DateInput__date--bold">
              {format(date, 'MMMM')}
            </span>
            {format(date, 'yyyy')}
          </p>
          <button
            className="DateInput__button"
            onClick={(): void => this._addMonth(1)}
          >
            <ChevronRight className="DateInput__icon" />
          </button>
        </div>
      </div>
    );
  }

  private _addMonth = (value: number) => {
    this.setState({ date: add(this.state.date, { months: value }) });
  };

  private _handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
        this._addMonth(1);
        break;

      case 'ArrowLeft':
        if (!isSameMonth(this._nextMonth, this.state.date)) {
          this._addMonth(-1);
        }
        break;
    }
  };
}

export default DateInput;

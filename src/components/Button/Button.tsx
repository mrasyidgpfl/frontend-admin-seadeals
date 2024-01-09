import React from 'react';

import './Button.scss';

type ButtonRequiredProps = {
  buttonType: string;
  handleClickedButton: () => void;
};

type ButtonOptionalProps = {
  text?: string;
  iconUrl?: any;
  iconName?: string;
  isSubmit?: boolean;
  isDisabled?: boolean;
};

interface ButtonProps
  extends ButtonRequiredProps,
  ButtonOptionalProps {}

const defaultProps: ButtonOptionalProps = {
  text: '',
  iconUrl: null,
  iconName: '',
  isSubmit: false,
  isDisabled: false,
};

const Button = (props: ButtonProps) => {
  const {
    buttonType,
    text,
    iconUrl,
    iconName,
    isSubmit,
    isDisabled,
    handleClickedButton,
  } = props;

  return (
    <button
      disabled={isDisabled}
      type={isSubmit ? 'submit' : 'button'}
      className={`button ${buttonType}`}
      onClick={handleClickedButton}
    >
      {
        iconUrl && !buttonType.includes('right')
        && (
          React.createElement(iconUrl, { className: iconName })
        )
      }
      {
        text !== ''
        && (
          <p className="text">{text}</p>
        )
      }
      {
        iconUrl && buttonType.includes('right')
        && (
          React.createElement(iconUrl, { className: iconName })
        )
      }
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TouchableOpacity = (props) =>
{
    const [isPressed, setPressed] = useState(false);

    return(
        <button
            {...props}
            disabled={props.disabled}
            style={
                Object.assign({
                    // Remove all other styling of button
                    // Credit: https://stackoverflow.com/questions/2460100/remove-the-complete-styling-of-an-html-button-submit
                    background: 'transparent',
                    color: 'inherit',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    cursor: 'pointer',
                    outline: 'inherit'
                },
                {
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: (isPressed || props.disabled) ? 0.5 : 1,
                    transition: 'opacity 250ms ease'
                },
                props.style || {}
                )
            }
            onMouseDown={() => setPressed(true)}
            onMouseUp={() =>
            {
                setPressed(false);
                props.onPress();
            }}>
            {props.children}
        </button>
    )
}

TouchableOpacity.propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool
}

TouchableOpacity.defaultProps = {
    onPress: () => {},
    disabled: false
}

export default TouchableOpacity;

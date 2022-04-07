import React, {
    useState,
    useRef,
    useContext
} from 'react';
import PropTypes from 'prop-types';
import { ReactImageTint } from 'react-image-tint';

// Custom Components
import View from './component_view';
import TouchableOpacity from './component_touchable_opacity';

// Images
import ClearImage from '../images/image_clear.png';

// Configs
import { ThemeContext } from '../configs/config_context';

const TextBox = (props) =>
{
    const theme = useContext(ThemeContext);
    const txtInput = useRef(null);
    const [isFocused, setFocus] = useState(false);

    const defaultStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        border: '2px solid ' + theme.divider,
        overflow: 'hidden',
        padding: '8px 12px 8px 12px'
    };

    const focusedStyle = {
        border: '2px solid ' + theme.dividerFocused
    }

    // Function - On Submit
    const onSubmit = (e) =>
    {
        txtInput.current.blur();
        e.preventDefault();
        props.onSubmit();
    }

    return(
        <View
            style={Object.assign(
                defaultStyle,
                isFocused ? focusedStyle : {},
                props.style || {},
                { opacity: props.disabled ? 0.5 : 1 }
            )}>
            {/* Input */}
            <form onSubmit={onSubmit} style={{ display: 'flex', flex: '1 1 auto' }}>
                <input
                    ref={txtInput}
                    disabled={props.disabled}
                    style={{ all: 'unset', width: '100%', height: 24, verticalAlign: 'center', color: theme.text }}
                    placeholder={'Type to search...'}
                    type={'text'}
                    value={props.value}
                    onChange={props.onChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />

                <input type='submit' value='Submit' style={{ display: 'none' }} />
            </form>

            {/* Clear Button */}
            {
                props.value?.toString().trim() ?
                    <TouchableOpacity onPress={props.onClear}>
                        <ReactImageTint
                            src={ClearImage}
                            altText={'clear'}
                            color={theme.xTint}
                        />
                    </TouchableOpacity>
                    :
                    null
            }
        </View>
    )
}

TextBox.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onClear: PropTypes.func,
    disabled: PropTypes.bool
}

TextBox.propTypes = {
    value: '',
    onChange: () => {},
    onSubmit: () => {},
    onClear: () => {},
    disabled: false
}

export default TextBox;

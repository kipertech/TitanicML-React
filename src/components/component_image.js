import PropTypes from 'prop-types';

import View from './component_view';

const Image = (props) => (
    <View style={Object.assign(props.style, { backgroundColor: 'transparent', borderRadius: props.borderRadius, overflow: 'hidden' })}>
        <img
            src={props.source}
            alt={props.altText}
            style={{ display: 'flex', flex: 1, width: '100%' }}
        />
    </View>
)

Image.propTypes = {
    source: PropTypes.any.isRequired,
    style: PropTypes.object,
    altText: PropTypes.string.isRequired,
    borderRadius: PropTypes.number
}

export default Image;

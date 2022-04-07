const Text = (props) => (
    <p style={Object.assign({ margin: 0, whiteSpace: 'pre-line', wordWrap: 'break-word' }, props.style)}>
        {props.children}
    </p>
)

export default Text;

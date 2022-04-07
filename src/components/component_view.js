const View = (props) => (
    <div {...props} style={Object.assign({ display: 'flex', flexDirection: 'column' }, props.style)}>
        {props.children}
    </div>
)

export default View;

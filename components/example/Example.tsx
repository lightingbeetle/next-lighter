// TODO
// - Determine how to import scss in the component, not in _app.tsx - because if th components should be reusable outside this project scss should be imported here. Also it's not that much conviniet to import part of the component somewhere else then in the component.

const Example = (props) => <p className="example" {...props} />;

export default Example;

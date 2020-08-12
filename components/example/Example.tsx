// TODO
// - Determine how to import scss in the component, not in _app.tsx - because if th components should be reusable outside this project scss should be imported here. Also it's not that much conviniet to import part of the component somewhere else then in the component.
import './style.scss';

type Example = {
  /** This is prop description */
  myProp?: string;
} & JSX.IntrinsicElements['p'];

const Example = (props: Example) => <p className="example" {...props} />;

export default Example;

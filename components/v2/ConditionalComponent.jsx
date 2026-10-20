const ConditionalComponent = ({ condition, ifComponent, elseComponent }) => {
  return condition ? ifComponent : elseComponent;
};

export default ConditionalComponent;

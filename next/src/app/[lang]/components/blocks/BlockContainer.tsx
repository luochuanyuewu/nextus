import React from "react";

interface BlockContainerProps {
  fullWidth?: boolean;
  children?: React.ReactNode;
}

function BlockContainer(props: BlockContainerProps) {
  const { fullWidth = false } = props;

  return (
    <section
      className={`py-12 mx-auto ${!fullWidth ? "lg:px-8 px-6 max-w-7xl" : ""}`}
    >
      {props.children}
    </section>
  );
}

export default BlockContainer;

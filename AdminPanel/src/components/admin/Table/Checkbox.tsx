import React from "react";

function Checkbox({
  checked,
  onClick,
  forAll,
}: {
  checked: boolean;
  onClick: () => void;
  forAll?: boolean;
}) {
  return <div className="w-[10px] h-[10px] border-[1px]"></div>;
}

export default Checkbox;

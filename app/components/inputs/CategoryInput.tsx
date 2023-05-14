"use client";

import { IconType } from "react-icons";

import type { NextComponentType, NextPageContext } from "next";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-rose-500 hover:bg-rose-50 transition cursor-pointer
  ${selected ? "border-rose-500 bg-rose-50" : "border-neutral-200"}`}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;

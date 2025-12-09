"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";
import { CustomCategory } from "../types";
import Link from "next/link";

interface Props {
  category: CustomCategory;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getDropdownPosition } = useDropdownPosition(dropdownRef);

  // 🔹 Normalize subcategories so they are ALWAYS an array
  const normalizedCategory: CustomCategory & { subcategories?: any[] } = {
    ...category,
    subcategories: Array.isArray((category as any).subcategories)
      ? (category as any).subcategories
      : (category as any).subcategories?.docs ?? [],
  };

  const onMouseEnter = () => {
    if (normalizedCategory.subcategories && normalizedCategory.subcategories.length > 0) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => setIsOpen(false);

  const position = getDropdownPosition();

  //TODO: Potentially improve mobile
  //const toggleDropdown = () => {
    //if (category.subcategories?.docs?.length) {
      //setIsOpen(!isOpen);
    //}
  //};

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      //onClick={toggleDropdown}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary",
            isOpen && "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-x-[4px]"
          )}
        >
          <Link
            href={'/${normalizedCategory.slug === "all" ? "" : category.slug}'}
          
          >
          {normalizedCategory.name}
          </Link>
        </Button>

        {normalizedCategory.subcategories &&
          normalizedCategory.subcategories.length > 0 && (
            <div
              className={cn(
                "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
                isOpen && "opacity-100",
              )}
            />
          )}
      </div>

      <SubcategoryMenu
        category={normalizedCategory}
        isOpen={isOpen}
        position={position}
      />
    </div>
  );
};

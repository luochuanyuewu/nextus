import React from "react";
import { defineProps, useSlots, computed } from "vue";

interface BadgeProps {
  color: string | null;
  size: string;
  children?: React.ReactNode;
}

function Badge(props: BadgeProps) {
  const slots = useSlots();

  const colorChoices = [
    "gray",
    "green",
    "purple",
    "blue",
    "amber",
    "orange",
    "red",
    "indigo",
    "violet",
    "pink",
    "yellow",
  ];

  function randomBackgroundColor(seed, colors) {
    return colors[seed % colors.length];
  }

  const badgeColor = computed(() => {
    return (
      props.color ||
      randomBackgroundColor(slots.default()[0].children.length, colorChoices)
    );
  });

  const getContrastColor = (backgroundColor) => {
    // Implement your getContrastColor function here
    return "white";
  };

  const size = props.size || "sm";

  return (
    <span
      style={
        props.color
          ? {
              backgroundColor: props.color,
              color: getContrastColor(props.color),
            }
          : null
      }
      className={`inline-flex items-center font-serif font-medium ${
        badgeColor.value === "gray" ? "bg-gray-100 text-gray-800" : ""
      } ${badgeColor.value === "green" ? "bg-green-100 text-green-800" : ""} ${
        badgeColor.value === "purple" ? "bg-purple-100 text-purple-800" : ""
      } ${badgeColor.value === "blue" ? "bg-blue-100 text-blue-800" : ""} ${
        badgeColor.value === "amber" ? "bg-amber-100 text-amber-800" : ""
      } ${
        badgeColor.value === "orange" ? "bg-orange-100 text-orange-800" : ""
      } ${badgeColor.value === "red" ? "bg-red-100 text-red-800" : ""} ${
        badgeColor.value === "indigo" ? "bg-indigo-100 text-indigo-800" : ""
      } ${
        badgeColor.value === "violet" ? "bg-violet-100 text-violet-800" : ""
      } ${badgeColor.value === "pink" ? "bg-primary-100 text-accent" : ""} ${
        badgeColor.value === "yellow" ? "bg-yellow-100 text-yellow-800" : ""
      } ${size === "sm" ? "text-xs px-2 py-0.5" : ""} ${
        size === "lg" ? "px-2.5 py-0.5" : ""
      } ${!props.color ? "bg-gray-100 text-gray-800" : ""}`}
    >
      {slots.default()}
    </span>
  );
}

export default Badge;

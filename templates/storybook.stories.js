import React from "react";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs, text } from "@storybook/addon-knobs"; // https://github.com/storybookjs/storybook/tree/next/addons/knobs#available-knobs
// import { action } from '@storybook/addon-actions'

import ___titleCase___ from "./___titleCase___";
import readMe from "./___titleCase___.md";

export default {
  title: "___titleCase___",
  decorators: [withA11y],
  parameters: {
    component: ___titleCase___,
    decorators: [withKnobs],
    readme: {
      sidebar: readMe
    }
  }
};

export const ___camelCase___ = () => <___titleCase___ message={text("Default message", "Hello new component")} />;
export const ___titleCase___s = () => (
  <div className="story-wrapper">
    <___titleCase___ message={text("Message 1", "Hello message #1")} />
    <___titleCase___ message={text("Message 2", "Hello message #2")} />
  </div>
);

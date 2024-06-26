'use strict';

export function convertAnimationObjectToKeyframes(animationObject) {
  let keyframe = `@keyframes ${animationObject.name} { `;
  for (const [timestamp, style] of Object.entries(animationObject.style)) {
    keyframe += `${timestamp}% { `;
    for (const [property, values] of Object.entries(style)) {
      if (property !== 'transform') {
        keyframe += `${property}: ${values}; `;
        continue;
      }
      keyframe += `transform:`;
      values.forEach(value => {
        for (const [transformProperty, transformPropertyValue] of Object.entries(value)) {
          keyframe += ` ${transformProperty}(${transformPropertyValue})`;
        }
      });
      keyframe += `; `; // Property end
    }
    keyframe += `} `; // Timestamp end
  }
  keyframe += `} `; // Keyframe end

  return keyframe;
}
//# sourceMappingURL=animationParser.js.map
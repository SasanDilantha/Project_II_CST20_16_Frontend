'use strict';

import { Animations } from './config';
import { LayoutAnimationType } from '../animationBuilder/commonTypes';
import { getProcessedConfig, handleExitingAnimation, handleLayoutTransition, setElementAnimation } from './componentUtils';
import { areDOMRectsEqual } from './domUtils';
import { makeElementVisible } from './componentStyle';
function chooseConfig(animationType, props) {
  const config = animationType === LayoutAnimationType.ENTERING ? props.entering : animationType === LayoutAnimationType.EXITING ? props.exiting : animationType === LayoutAnimationType.LAYOUT ? props.layout : null;
  return config;
}
function checkUndefinedAnimationFail(initialAnimationName, isLayoutTransition) {
  // This prevents crashes if we try to set animations that are not defined.
  // We don't care about layout transitions since they're created dynamically
  if (initialAnimationName in Animations || isLayoutTransition) {
    return false;
  }
  console.warn("[Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion.");
  return true;
}
function chooseAction(animationType, animationConfig, element, transitionData) {
  switch (animationType) {
    case LayoutAnimationType.ENTERING:
      setElementAnimation(element, animationConfig);
      break;
    case LayoutAnimationType.LAYOUT:
      transitionData.reversed = animationConfig.reversed;
      handleLayoutTransition(element, animationConfig, transitionData);
      break;
    case LayoutAnimationType.EXITING:
      handleExitingAnimation(element, animationConfig);
      break;
  }
}
function tryGetAnimationConfig(props, animationType) {
  const config = chooseConfig(animationType, props);
  if (!config) {
    return null;
  }
  const isLayoutTransition = animationType === LayoutAnimationType.LAYOUT;
  const animationName = typeof config === 'function' ? config.presetName : config.constructor.presetName;
  const shouldFail = checkUndefinedAnimationFail(animationName, isLayoutTransition);
  if (shouldFail) {
    return null;
  }
  const animationConfig = getProcessedConfig(animationName, animationType, config, animationName);
  return animationConfig;
}
export function startWebLayoutAnimation(props, element, animationType, transitionData) {
  const animationConfig = tryGetAnimationConfig(props, animationType);
  if (animationConfig) {
    chooseAction(animationType, animationConfig, element, transitionData);
  } else {
    makeElementVisible(element, 0);
  }
}
export function tryActivateLayoutTransition(props, element, snapshot) {
  if (!props.layout) {
    return;
  }
  const rect = element.getBoundingClientRect();
  if (areDOMRectsEqual(rect, snapshot)) {
    return;
  }
  const transitionData = {
    translateX: snapshot.x - rect.x,
    translateY: snapshot.y - rect.y,
    scaleX: snapshot.width / rect.width,
    scaleY: snapshot.height / rect.height,
    reversed: false // This field is used only in `SequencedTransition`, so by default it will be false
  };
  startWebLayoutAnimation(props, element, LayoutAnimationType.LAYOUT, transitionData);
}
//# sourceMappingURL=animationsManager.js.map
import { TransitionType } from './config';
import type { TransitionData } from './animationParser';
/**
 * Creates transition of given type, appends it to stylesheet and returns keyframe name.
 *
 * @param transitionType - Type of transition (e.g. LINEAR).
 * @param transitionData - Object containing data for transforms (translateX, scaleX,...).
 * @returns Keyframe name that represents transition.
 */
export declare function TransitionGenerator(transitionType: TransitionType, transitionData: TransitionData): string;

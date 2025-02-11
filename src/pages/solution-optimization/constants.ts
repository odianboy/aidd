import aspirin from '../../assets/aspirin.png';
import caffeine from '../../assets/caffeine.png';
import sildenafil from '../../assets/sildenafil.png';
import water from '../../assets/water.png';
import ethanol from '../../assets/ethanol.png';
import DMSO from '../../assets/DMSO.png';

import aspirinWater from '../../assets/video/aspirin_water.mp4';
import aspirinEthanol from '../../assets/video/aspirin_ethanol.mp4';
import aspirinDMSO from '../../assets/video/aspirin_DMSO.mp4';

import caffeineWater from '../../assets/video/caffeine_water.mp4';
import caffeineEthanol from '../../assets/video/caffeine_ethanol.mp4';
import caffeineDMSO from '../../assets/video/caffeine_DMSO.mp4';

import sildenafilWater from '../../assets/video/sildenafil_water.mp4';
import sildenafilEthanol from '../../assets/video/sildenafil_ethanol.mp4';
import sildenafilDMSO from '../../assets/video/sildenafil_DMSO.mp4';

import {
  SolutionOptimizationType,
  VideoSolutionOptimizationType,
} from './types.ts';

export const SOLUTION_OPTIMIZATION: Record<
  'compounds' | 'solutions',
  SolutionOptimizationType[]
> = {
  compounds: [
    { id: 'aspirin', name: 'Aspirin', image: aspirin, isDisabled: false },
    { id: 'caffeine', name: 'Caffeine', image: caffeine, isDisabled: false },
    {
      id: 'sildenafil',
      name: 'Sildenafil',
      image: sildenafil,
      isDisabled: false,
    },
  ],
  solutions: [
    { id: 'water', name: 'Water', image: water, isDisabled: true },
    { id: 'ethanol', name: 'Ethanol', image: ethanol, isDisabled: true },
    { id: 'DMSO', name: 'DMSO', image: DMSO, isDisabled: true },
  ],
};

export const VIDEO_SOLUTION_OPTIMIZATION: VideoSolutionOptimizationType = {
  'aspirin-water': aspirinWater,
  'aspirin-ethanol': aspirinEthanol,
  'aspirin-DMSO': aspirinDMSO,

  'caffeine-water': caffeineWater,
  'caffeine-ethanol': caffeineEthanol,
  'caffeine-DMSO': caffeineDMSO,

  'sildenafil-water': sildenafilWater,
  'sildenafil-ethanol': sildenafilEthanol,
  'sildenafil-DMSO': sildenafilDMSO,
};

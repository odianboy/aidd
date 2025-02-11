import { useEffect, useRef, useState } from 'react';

import ReactPlayer from 'react-player';
import { DraggableData } from 'react-draggable';
import Xarrow, { Xwrapper } from 'react-xarrows';

import { Flex, Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import screenfull from 'screenfull';

import { useValues } from '../../../shared/lib/hooks/useValues.ts';

import { SolutionOptimizationItem } from './SolutionOptimizationItem.tsx';

import {
  SOLUTION_OPTIMIZATION,
  VIDEO_SOLUTION_OPTIMIZATION,
} from '../constants.ts';

import { DragStateType } from '../types.ts';

import '../styles.css';

type SolutionOptimizationValuesType = {
  currentVideo?: string;
  isLoader: boolean;
  isPlayingVideo: boolean;
};

export const SolutionOptimizationPage = () => {
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [dragState, setDragState] = useState<DragStateType>({});

  const player = useRef<ReactPlayer | null>(null);
  const [showArrows, setShowArrows] = useState(false);

  const {
    values: { isPlayingVideo, currentVideo, isLoader },
    updateValues,
  } = useValues<SolutionOptimizationValuesType>({
    isLoader: false,
    isPlayingVideo: false,
  });

  const getPossibleTargets = (sourceId: string): string[] => {
    switch (sourceId) {
      case 'aspirin':
        return ['water', 'ethanol', 'DMSO'];
      case 'caffeine':
        return ['water', 'ethanol', 'DMSO'];
      case 'sildenafil':
        return ['water', 'ethanol', 'DMSO'];
      default:
        return [];
    }
  };

  useEffect(() => {
    const initialPositions: Record<string, { x: number; y: number }> = {};

    [
      ...SOLUTION_OPTIMIZATION.compounds,
      ...SOLUTION_OPTIMIZATION.solutions,
    ].forEach(solutionOptimization => {
      initialPositions[solutionOptimization.id] = { x: 0, y: 0 };
    });

    setPositions(initialPositions);
  }, []);

  const onDragStartHandle = (sourceId: string) => {
    setDragState({ sourceId });
    setShowArrows(true);
  };

  const onDragHandle = (id: string, data: DraggableData) => {
    setPositions(prev => ({ ...prev, [id]: { x: data.x, y: data.y } }));
  };

  const onDragStopHandle = (event: MouseEvent) => {
    if (!dragState.sourceId) return;

    setShowArrows(false);

    const { clientX, clientY } = event;

    let target = document.elementFromPoint(clientX, clientY);

    while (target && !target.getAttribute('data-id')) {
      target = target.parentElement;
    }

    const targetId = target?.getAttribute('data-id');

    if (!targetId) return;

    setDragState(prev => ({ ...prev, targetId }));

    const videoKey = `${dragState.sourceId}-${targetId}`;
    const videoUrl = VIDEO_SOLUTION_OPTIMIZATION[videoKey];

    if (videoUrl) {
      updateValues({
        currentVideo: videoUrl,
        isLoader: true,
      });

      setTimeout(() => {
        updateValues({
          isLoader: false,
          isPlayingVideo: true,
        });

        if (player.current && screenfull.isEnabled) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          screenfull.request(player.current.wrapper);
        }
      }, 2000);
    }
  };

  const onVideoEndHandle = () => {
    updateValues({
      isPlayingVideo: false,
      currentVideo: undefined,
    });

    if (player.current && screenfull.isFullscreen) {
      screenfull.exit();
    }

    if (dragState.sourceId) {
      setPositions(prev => ({
        ...prev,
        [dragState.sourceId!]: { x: 0, y: 0 },
      }));
    }

    setDragState({});
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isPlayingVideo) {
        updateValues({
          isPlayingVideo: false,
          currentVideo: undefined,
        });

        if (player.current && screenfull.isFullscreen) {
          screenfull.exit();
        }

        if (dragState.sourceId) {
          setPositions(prev => ({
            ...prev,
            [dragState.sourceId!]: { x: 0, y: 0 },
          }));
        }

        setDragState({});
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isPlayingVideo]);

  return (
    <Flex vertical align={'center'}>
      <Typography.Title
        style={{
          textTransform: 'capitalize',
          marginBottom: '3rem',
        }}
      >
        Solution optimization
      </Typography.Title>
      <ReactPlayer
        style={{ display: isPlayingVideo ? 'block' : 'none' }}
        url={currentVideo ?? undefined}
        controls
        ref={player}
        playing={isPlayingVideo}
        onEnded={onVideoEndHandle}
      />

      <Spin
        indicator={<LoadingOutlined style={{ fontSize: '10rem' }} spin />}
        spinning={isLoader}
        fullscreen
      />

      <Flex
        justify="space-around"
        align="center"
        style={{
          width: '100%',
        }}
      >
        {Object.entries(SOLUTION_OPTIMIZATION).map(
          ([side, solutionOptimizationList]) => (
            <Flex vertical align={'center'} key={side}>
              <Typography.Title
                style={{
                  textTransform: 'capitalize',
                }}
              >
                {side}
              </Typography.Title>
              <Flex
                vertical
                style={{ border: '3px solid #2FBEAD', borderRadius: 50 }}
              >
                <Xwrapper>
                  {solutionOptimizationList.map(
                    (solutionOptimization, index) => (
                      <SolutionOptimizationItem
                        key={solutionOptimization.id}
                        solution={solutionOptimization}
                        onDragHandle={onDragHandle}
                        onDragStartHandle={onDragStartHandle}
                        onDragStopHandle={onDragStopHandle}
                        positions={positions}
                        isLast={index === solutionOptimizationList.length - 1}
                      />
                    ),
                  )}

                  {showArrows &&
                    dragState.sourceId &&
                    getPossibleTargets(dragState.sourceId).map(targetId => (
                      <Xarrow
                        key={`${dragState.sourceId}-${targetId}`}
                        start={dragState.sourceId!}
                        end={targetId}
                        color="#2FBEAD"
                        strokeWidth={3}
                        dashness={{ animation: 5 }}
                        animateDrawing={true}
                        headSize={7}
                        passProps={{
                          className: 'animated-dash',
                        }}
                      />
                    ))}
                </Xwrapper>
              </Flex>
            </Flex>
          ),
        )}
      </Flex>
    </Flex>
  );
};

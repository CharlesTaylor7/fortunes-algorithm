import { useState, useCallback, useEffect, useRef } from 'react'
import getOffsetFromCurrentTarget from '../utilities/getOffsetFromCurrentTarget'
import useAnimation from '../hooks/useAnimation'
import useResizeAware from 'react-resize-aware'
import * as d3 from 'd3-selection'
import * as d4 from 'd3-transition'

const animate = ({ x, setX, ref }) => {
  return newX => {
    d3.select(ref.current)
    .transition()
    .duration(10000)
    .attr('x1', newX)
    .attr('x2', newX);
  }
}


export default () => {
  const sweeplineRef = useRef();
  const [ viewportSizeListener, viewportSize ] = useResizeAware();
  const [ sites, setSites ] = useState([]);
  const onClick = useCallback(
    event => {
      const site = getOffsetFromCurrentTarget(event);
      setSites(ns => [...ns, site]);
    },
    []
  );

  const [sweeplineX, setSweeplineX, animateSweepline] = useAnimation(200);
  const animateSweeplineWithd3 = animate({ x: sweeplineX, setX: setSweeplineX, ref: sweeplineRef });
  const [sweeplineDragging, setSweeplineDragging] = useState(false);
  const onClickSweepline = useCallback(
    event => {
      event.stopPropagation();
      setSweeplineDragging(!sweeplineDragging);
    },
    [sweeplineDragging, setSweeplineDragging]
  );

  const onMouseMove = useCallback(
    event => {
      const offset = getOffsetFromCurrentTarget(event);
      if (sweeplineDragging) {
        setSweeplineX(offset.x);
      }
    },
    [sweeplineDragging, setSweeplineX]
  );

  const [index, setIndex] = useState(-1);
  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === 'ArrowLeft') {
        if (sites[index - 1]) {
          setIndex(index - 1);
          animateSweeplineWithd3(sites[index - 1].x)
        }
      }
      else if (e.key === 'ArrowRight') {
        if (sites[index + 1]) {
          setIndex(index + 1);
          animateSweeplineWithd3(sites[index + 1].x)
        }
      }
    }
  }, [index, setIndex, sites])

  return {
    sweeplineX,
    viewportSize,
    viewportSizeListener,
    onClick,
    onMouseMove,
    onClickSweepline,
    sites,
    sweeplineRef,
  };
}

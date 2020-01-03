import React, { useState } from 'react'
import useResizeAware from 'react-resize-aware'
import './Resizable.css'
import getOffsetFromCurrentTarget from '../../utilities/getOffsetFromCurrentTarget';



const Resizable = ({ children }) => {

  const [ sizeListener, size ] = useResizeAware();

  const [dragging, setDragging] = useState(false);
  const onMouseDown = () => setDragging(true);
  const onMouseUp = () => setDragging(false);
  const onMouseMove = (event) => {
    if (dragging) {
      const offset = getOffsetFromCurrentTarget(event);
      console.log(offset)
    }
  }

  const Resizer = ({ direction }) => {
    return (
      <div
        className={`${direction} resizer`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
    )
  }
  const style = { ...size };
  return (
    <div
      className="resizable"
      style={style}
      onMouseMove={onMouseMove}
    >
      {children}
      <Resizer direction="top-left" />
      <Resizer direction="top-right" />
      <Resizer direction="bottom-right" />
      <Resizer direction="bottom-left" />
      {sizeListener}
    </div>

  )
}

export default Resizable;

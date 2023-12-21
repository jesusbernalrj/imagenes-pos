import { ProductosProps } from '../../interface/interface'
import './producto.css'
import 'animate.css';
import Producto from '../Producto/Producto';
import {FixedSizeGrid} from 'react-window'
import AutoSizer from "react-virtualized-auto-sizer";
import { useEffect, useRef, useState } from 'react';

const Productos = ({paginatedData, height}: ProductosProps) => {
  const [gridWidth, setGridWidth] = useState(0);
  const componenteRef = useRef<HTMLDivElement>(null);
  const productoWidth = 180;

  useEffect(() => {
    const handleResize = () => {
      if (componenteRef.current) {
        const newWidth = componenteRef.current.offsetWidth;
        setGridWidth(newWidth);
      }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const calculateColumnCount = () => {
    const availableWidth = gridWidth ;
    const columnCount = Math.floor(availableWidth / productoWidth);
    return columnCount;
  };

  const columnas = calculateColumnCount();
      return (
      <>
    <div className="main-producto" ref={componenteRef} >
        <div className="container-fluid">
          <div className="col-12">
            <div
              className=" mt-3"
              id="productos-scroll"
              style={{ height: `${height}px`, width: '100%' }}
            >
              <AutoSizer >
                {({ height, width }) => {
                  return(
                    <FixedSizeGrid
                    columnCount={columnas}
                    columnWidth={180}
                    height={height}
                    rowCount={paginatedData.length}
                    rowHeight={190}
                    width={width} 
                    
                    >
                   {({ columnIndex, rowIndex, style }) => {
                 const index = rowIndex * columnas + columnIndex;
                 return (
                   <div key={index} style={{...style}}>
                     <Producto  {...paginatedData[index]} />
                   </div>
                   );
               }}
                  </FixedSizeGrid>
                   )
                }}
              </AutoSizer>
            </div>
          </div>
        </div>
      </div>
</>
  )
}

export default Productos
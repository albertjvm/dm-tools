import './GridItem.scss';
import { useEffect, useRef, useState } from 'react';
import { Icon, IconButton } from '..';

const yOffset = 100;
const DRAG_MODE = {
    MOVE: 'MOVE',
    EXPAND: 'EXPAND',
};

export const GridItem = ({ 
    children,
    gridConfig,
    onConfigChange,
    forceEdit,
    onDelete
}) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const dragMode = useRef(null);
    const dragStart = useRef(null);
    const [editConfig, setEditConfig] = useState(gridConfig);

    useEffect(() => {
        setEditConfig(gridConfig);
    }, [gridConfig]);

    const handleCancelEdit = () => {
        setEditConfig(gridConfig);
        setIsEditOpen(false);
    };

    const pxToVw = (px) => {
        return px * (100 / document.documentElement.clientWidth);
    };

    const xyToVw = ({x, y}) => ({
        x: Math.floor(pxToVw(x) / 5) + 1,
        y: Math.floor(pxToVw(y) / 5) - 1
    })

    const handleDragMove = ({ x, y }) => {
        if(dragMode.current === DRAG_MODE.MOVE) {
            const { x: nx, y: ny } = xyToVw({x, y: y + yOffset});
            setEditConfig({
                ...editConfig,
                col: nx,
                row: ny,
            });
        } else if (dragMode.current === DRAG_MODE.EXPAND) {
            const { x: nx, y: ny } = xyToVw({x, y: y + yOffset});
            const { row, col } = editConfig;
            setEditConfig({
                ...editConfig,
                colSpan: nx - col + 1,
                rowSpan: ny - row + 1,
            });
        }
    };

    const handleDragEnd = ({x,y}) => {
        const { x: nx, y: ny } = xyToVw({x, y: y + yOffset});
        const { row, col } = editConfig;
        window.removeEventListener('mousemove', handleDragMove);
        window.removeEventListener('mouseup', handleDragEnd);
        onConfigChange(
            dragMode.current === DRAG_MODE.MOVE ? 
            {
                ...editConfig,
                col: nx,
                row: ny,
            }
            :
            {
                ...editConfig,
                colSpan: nx - col + 1,
                rowSpan: ny - row + 1,
            }
        );
        setIsEditOpen(false);
        dragMode.current = null;
    };

    const handleDragStart = ({clientX, clientY}) => {
        dragStart.current = {x: clientX, y: clientY};
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
    };

    const handleStartMove = (e) => {
        dragMode.current = DRAG_MODE.MOVE;
        handleDragStart(e);
    };

    const handleStartExpand = (e) => {
        dragMode.current = DRAG_MODE.EXPAND;
        handleDragStart(e);
    };

    const config = () => dragMode.current === null ? gridConfig : editConfig;

    return (
        <div
            className='GridItem'
            style={{
                gridRow: `${config().row} / span ${config().rowSpan}`,
                gridColumn: `${config().col} / span ${config().colSpan}`
            }}
        >
            {children}
            {(forceEdit || isEditOpen) &&
                <div className="GridItem--EditPanel">
                    <IconButton onMouseDown={handleStartMove}>
                        <Icon name="arrows-alt"/>
                    </IconButton>
                    <IconButton className="GridItem--ExpandHandle" onMouseDown={handleStartExpand}>
                        <Icon name="expand-arrows-alt"/>
                    </IconButton>
                    { isEditOpen && 
                        <IconButton className="GridItem--CloseButton" onClick={handleCancelEdit}>
                            <Icon name="times"/>
                        </IconButton>
                    }
                    <IconButton className="GridItem--DeleteButton" requireConfirm confirmColor='red' onClick={onDelete}>
                        <Icon name="trash" />
                    </IconButton>
                </div>
            }
        </div>
    );
};

export default GridItem;
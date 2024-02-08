import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const CalligraphyCanvas = ({ characterSvgData }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: true,
            selection: false,
        });

        canvas.freeDrawingBrush.width = 8;
        canvas.freeDrawingBrush.color = 'black';

        if (characterSvgData) {
            fabric.loadSVGFromString(characterSvgData.trim(), (objects, options) => {
                const svgGroup = fabric.util.groupSVGElements(objects, options);

                // Scale and center the SVG
                const svgScale = Math.min(
                    canvas.width / svgGroup.width,
                    canvas.height / svgGroup.height
                );
                svgGroup.set({
                    scaleX: svgScale,
                    scaleY: svgScale,
                    top: (canvas.height - svgGroup.height * svgScale) / 2,
                    left: (canvas.width - svgGroup.width * svgScale) / 2,
                    selectable: false,
                    evented: false,
                });

                canvas.add(svgGroup);
                canvas.sendToBack(svgGroup);

                // Once SVG is loaded and rendered, enable drawing mode
                canvas.isDrawingMode = true;
            });
        }

        canvas.on('path:created', (e) => {
            const path = e.path;
            // Collision detection logic here
            // For demonstration, let's log the path
            console.log('Path created:', path);
            // Implement collision detection based on the SVG paths and the drawn path
            // This is a complex problem that requires custom implementation
            // For now, we'll log a message, but you'll need to replace this with actual collision detection logic
            console.log('Implement collision detection based on SVG paths');
        });

        return () => canvas.dispose(); // Cleanup on component unmount
    }, [characterSvgData]); // Re-run effect when characterSvgData changes

    return <canvas ref={canvasRef} width="300" height="300" />;
};

export default CalligraphyCanvas;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Styled canvas component
const StyledCanvas = styled.canvas`
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 24px;
`;

const characterCanvasData = `"brave2.svg": {
  draw: function(ctx){
 ctx.save();
 ctx.strokeStyle="rgba(0,0,0,0)";
 ctx.miterLimit=4;
 ctx.font="15px ''";
 ctx.fillStyle="rgba(0,0,0,0)";
 ctx.font="   15px ''";
 ctx.scale(0.3333333333333333,0.3333333333333333);
 ctx.scale(0.3333333333333333,0.3333333333333333);
 ctx.save();
 ctx.fillStyle="#337C76";
 ctx.fillStyle="rgba(51, 124, 118, 0.6)";
 ctx.font="   15px ''";
 ctx.beginPath();
 ctx.moveTo(181.2,137.4);
 ctx.bezierCurveTo(181.2,137.4,174.79999999999998,133.20000000000002,158.7,131.1);
 ctx.lineTo(150.39999999999998,131.1);
 ctx.bezierCurveTo(149.7,131.1,149.59999999999997,130.6,149.29999999999998,130.1);
 ctx.bezierCurveTo(146.7,125.5,142.6,123.1,137.29999999999998,122.6);
 ctx.bezierCurveTo(137.29999999999998,122.6,127.09999999999998,121.6,115.79999999999998,126.6);
 ctx.lineTo(114.99999999999999,128.2);
 ctx.bezierCurveTo(111.99999999999999,134,107.39999999999999,138,101.99999999999999,141.2);
 ctx.translate(63.667473549826724,75.57517683112);
 ctx.rotate(0);
 ctx.arc(0,0,76,1.0421379228636323,1.4476892061619702,0);
 ctx.rotate(0);
 ctx.translate(-63.667473549826724,-75.57517683112);
 ctx.bezierCurveTo(67.1,152,63.5,156.7,64.4,162.6);
 ctx.bezierCurveTo(65.30000000000001,168.1,68.9,171.29999999999998,74,173);
 ctx.bezierCurveTo(81.2,175.3,88.2,173.8,94.9,170.9);
 ctx.bezierCurveTo(98.30000000000001,169.4,101.5,167.6,104.80000000000001,165.70000000000002);
 ctx.bezierCurveTo(105.60000000000001,168.8,105.50000000000001,168.9,103.80000000000001,171.10000000000002);
 ctx.bezierCurveTo(96.80000000000001,180.10000000000002,89.80000000000001,189.00000000000003,82.4,197.70000000000002);
 ctx.translate(-90.11110751468458,59.72635112436535);
 ctx.rotate(0);
 ctx.arc(0,0,220.9,0.6746163809714211,0.8660314758335576,0);
 ctx.rotate(0);
 ctx.translate(90.11110751468458,-59.72635112436535);
 ctx.bezierCurveTo(50.7,229.8,48.2,231.4,46.2,233.6);
 ctx.bezierCurveTo(45.5,234.29999999999998,44.7,235.1,45.2,236.2);
 ctx.bezierCurveTo(45.5,237.2,46.6,237.2,47.5,237.39999999999998);
 ctx.lineTo(48.9,237.49999999999997);
 ctx.bezierCurveTo(53.4,237.89999999999998,57.599999999999994,236.69999999999996,61.599999999999994,234.89999999999998);
 ctx.bezierCurveTo(70.89999999999999,230.7,78.8,224.29999999999998,86.39999999999999,217.59999999999997);
 ctx.bezierCurveTo(94.1,210.79999999999995,101.3,203.39999999999998,108.39999999999999,195.59999999999997);
 ctx.lineTo(108.89999999999999,197.19999999999996);
 ctx.translate(197.29010481314566,175.5623159483015);
 ctx.rotate(0);
 ctx.arc(0,0,91,2.9015163443258687,2.7030837339456295,1);
 ctx.rotate(0);
 ctx.translate(-197.29010481314566,-175.5623159483015);
 ctx.bezierCurveTo(118.49999999999999,221.79999999999995,123.3,228.89999999999995,124.69999999999999,237.39999999999995);
 ctx.bezierCurveTo(124.89999999999999,238.59999999999994,125.89999999999999,239.39999999999995,127.19999999999999,239.59999999999994);
 ctx.bezierCurveTo(135,240.79999999999993,142.2,239.49999999999994,148.2,234.09999999999994);
 ctx.translate(92.74223596346917,175.06241529272666);
 ctx.rotate(0);
 ctx.arc(0,0,81,0.8166540605846799,0.535580747106613,1);
 ctx.rotate(0);
 ctx.translate(-92.74223596346917,-175.06241529272666);
 ctx.bezierCurveTo(170.39999999999998,204.09999999999994,176.7,190.99999999999994,183.2,177.89999999999995);
 ctx.bezierCurveTo(186,172.19999999999996,188.7,166.39999999999995,193.7,162.09999999999994);
 ctx.bezierCurveTo(194.29999999999998,161.59999999999994,194.6,160.79999999999993,194.7,160.09999999999994);
 ctx.bezierCurveTo(195.6,156.29999999999993,194.2,153.09999999999994,192.29999999999998,150.09999999999994);
 ctx.bezierCurveTo(189.29999999999998,145.09999999999994,185.29999999999998,141.09999999999994,181.1,137.39999999999995);
 ctx.closePath();
 ctx.moveTo(165.39999999999998,155.70000000000002);
 ctx.bezierCurveTo(164.79999999999998,160.50000000000003,163.09999999999997,165.00000000000003,161.29999999999998,169.4);
 ctx.translate(-39.630180248786814,85.35297348989643);
 ctx.rotate(0);
 ctx.arc(0,0,217.8,0.3961732692100038,0.5651819160557595,0);
 ctx.rotate(0);
 ctx.translate(39.630180248786814,-85.35297348989643);
 ctx.bezierCurveTo(141.39999999999998,206.7,136.7,208,131.6,205.8);
 ctx.bezierCurveTo(125.8,203.3,121.6,198.8,118.5,193.4);
 ctx.bezierCurveTo(115.3,188.1,115.3,188.1,119.3,183.3);
 ctx.translate(-241.29795002492642,-110.12993786902621);
 ctx.rotate(0);
 ctx.arc(0,0,464.9,0.6830579507772476,0.5969477936004882,1);
 ctx.rotate(0);
 ctx.translate(241.29795002492642,110.12993786902621);
 ctx.translate(149.3396001245982,154.96102516742891);
 ctx.rotate(0);
 ctx.arc(0,0,7.2,-2.591971041453335,-1.8291611777897043,0);
 ctx.rotate(0);
 ctx.translate(-149.3396001245982,-154.96102516742891);
 ctx.translate(157.56360980577975,180.47651086057454);
 ctx.rotate(0);
 ctx.arc(0,0,34,-1.8712865755976944,-1.6079698820143409,0);
 ctx.rotate(0);
 ctx.translate(-157.56360980577975,-180.47651086057454);
 ctx.lineTo(159,146.90000000000003);
 ctx.bezierCurveTo(163.5,147.80000000000004,166,151.20000000000005,165.4,155.70000000000005);
 ctx.closePath();
 ctx.fill();
 ctx.stroke();
 ctx.restore();
 ctx.save();
 ctx.fillStyle="#337C76";
 ctx.fillStyle="rgba(51, 124, 118, 0.6)";
 ctx.font="   15px ''";
 ctx.beginPath();
 ctx.moveTo(137.4,122.6);
 ctx.bezierCurveTo(135.9,122.5,135.9,121.89999999999999,135.9,120.6);
 ctx.bezierCurveTo(136,117.89999999999999,137.3,116.89999999999999,139.70000000000002,116.3);
 ctx.bezierCurveTo(143.50000000000003,115.3,147.20000000000002,114.1,151.00000000000003,113);
 ctx.bezierCurveTo(155.70000000000002,111.6,157.40000000000003,106.9,155.00000000000003,102.6);
 ctx.bezierCurveTo(152.60000000000002,98.6,148.90000000000003,96.6,144.50000000000003,95.6);
 ctx.bezierCurveTo(142.50000000000003,95.19999999999999,143.00000000000003,94.8,143.90000000000003,93.6);
 ctx.bezierCurveTo(147.40000000000003,89.6,150.90000000000003,85.69999999999999,155.50000000000003,82.8);
 ctx.bezierCurveTo(157.70000000000002,81.5,158.40000000000003,77.8,157.50000000000003,74.39999999999999);
 ctx.translate(144.42783267357578,78.49980992119951);
 ctx.rotate(0);
 ctx.arc(0,0,13.7,-0.30391303380963736,-1.565528614372654,1);
 ctx.rotate(0);
 ctx.translate(-144.42783267357578,-78.49980992119951);
 ctx.lineTo(143,64.8);
 ctx.bezierCurveTo(147.5,62.5,152,60,156.8,58.3);
 ctx.bezierCurveTo(159.20000000000002,57.4,161.3,58.099999999999994,163.3,59.699999999999996);
 ctx.bezierCurveTo(167.5,63.199999999999996,169,67.89999999999999,169.3,73.1);
 ctx.translate(-93.14589682127456,86.73786059750196);
 ctx.rotate(0);
 ctx.arc(0,0,262.8,-0.051917767238550905,0.11885704624666374,0);
 ctx.rotate(0);
 ctx.translate(93.14589682127456,-86.73786059750196);
 ctx.bezierCurveTo(166.8,122.89999999999999,164.20000000000002,124.89999999999999,159,124.49999999999999);
 ctx.bezierCurveTo(157.8,124.39999999999999,156.4,123.79999999999998,155.7,125.29999999999998);
 ctx.bezierCurveTo(155.1,126.69999999999999,156.2,127.79999999999998,157.1,128.79999999999998);
 ctx.bezierCurveTo(157.6,129.39999999999998,158.4,129.79999999999998,159.1,130.39999999999998);
 ctx.lineTo(158.79999999999998,131.09999999999997);
 ctx.bezierCurveTo(174.79999999999998,133.09999999999997,181.29999999999998,137.39999999999998,181.29999999999998,137.39999999999998);
 ctx.bezierCurveTo(180.29999999999998,136.39999999999998,180.1,135.79999999999998,180.39999999999998,134.49999999999997);
 ctx.bezierCurveTo(181.2,131.19999999999996,181.99999999999997,127.89999999999998,182.39999999999998,124.49999999999997);
 ctx.bezierCurveTo(184.99999999999997,107.49999999999997,186.09999999999997,90.49999999999997,186.59999999999997,73.29999999999997);
 ctx.bezierCurveTo(186.89999999999998,66.19999999999997,184.09999999999997,60.39999999999997,178.69999999999996,55.79999999999997);
 ctx.translate(160.83741048434416,77.49188548271411);
 ctx.rotate(0);
 ctx.arc(0,0,28.1,-0.8819080950228534,-1.483047122222008,1);
 ctx.rotate(0);
 ctx.translate(-160.83741048434416,-77.49188548271411);
 ctx.bezierCurveTo(161.69999999999996,49.29999999999997,160.59999999999997,48.89999999999997,159.89999999999995,47.199999999999974);
 ctx.translate(141.71588289173897,53.36261997798423);
 ctx.rotate(0);
 ctx.arc(0,0,19.2,-0.3267532791813276,-0.806705155865685,1);
 ctx.rotate(0);
 ctx.translate(-141.71588289173897,-53.36261997798423);
 ctx.bezierCurveTo(154.29999999999995,38.89999999999997,154.69999999999993,38.49999999999997,154.99999999999994,37.99999999999997);
 ctx.bezierCurveTo(156.39999999999995,36.29999999999997,158.19999999999993,35.29999999999997,159.99999999999994,34.49999999999997);
 ctx.bezierCurveTo(163.39999999999995,32.99999999999997,166.99999999999994,32.49999999999997,170.59999999999994,31.599999999999973);
 ctx.bezierCurveTo(175.09999999999994,30.599999999999973,177.09999999999994,27.99999999999997,176.99999999999994,23.399999999999974);
 ctx.bezierCurveTo(176.89999999999995,18.399999999999974,174.99999999999994,14.099999999999973,172.79999999999995,9.899999999999974);
 ctx.translate(156.92251581000355,18.37971083212239);
 ctx.rotate(0);
 ctx.arc(0,0,18,-0.4905318000169113,-1.455122751665332,1);
 ctx.rotate(0);
 ctx.translate(-156.92251581000355,-18.37971083212239);
 ctx.translate(152.89812885320072,41.04339858112363);
 ctx.rotate(0);
 ctx.arc(0,0,41,-1.421415255050225,-1.8728854101290273,1);
 ctx.rotate(0);
 ctx.translate(-152.89812885320072,-41.04339858112363);
 ctx.bezierCurveTo(126.69999999999999,5.9,113.1,11,99.39999999999999,15.9);
 ctx.bezierCurveTo(95.99999999999999,17.1,92.69999999999999,18.8,89.1,19.5);
 ctx.bezierCurveTo(86.89999999999999,20,85.8,19.5,84.89999999999999,17.3);
 ctx.bezierCurveTo(84.49999999999999,16.5,84.19999999999999,15.600000000000001,83.69999999999999,14.8);
 ctx.bezierCurveTo(82.39999999999999,12.8,79.39999999999999,11.8,76.99999999999999,12.4);
 ctx.bezierCurveTo(74.59999999999998,13,74.69999999999999,15,74.49999999999999,16.8);
 ctx.bezierCurveTo(73.99999999999999,21.3,73.99999999999999,25.8,74.29999999999998,30.200000000000003);
 ctx.bezierCurveTo(74.59999999999998,36.1,75.59999999999998,41.800000000000004,78.49999999999999,47.1);
 ctx.bezierCurveTo(80.89999999999999,51.4,82.49999999999999,51.9,86.79999999999998,49.7);
 ctx.lineTo(87.79999999999998,49.1);
 ctx.translate(-108.25002644426797,-287.81011728827895);
 ctx.rotate(0);
 ctx.arc(0,0,389.8,1.043787476169859,0.9241809215809645,1);
 ctx.rotate(0);
 ctx.translate(108.25002644426797,287.81011728827895);
 ctx.bezierCurveTo(132.59999999999997,18.9,138.59999999999997,14.200000000000001,144.59999999999997,9.600000000000001);
 ctx.bezierCurveTo(147.39999999999998,7.400000000000001,150.59999999999997,6.200000000000001,154.39999999999998,6.800000000000002);
 ctx.bezierCurveTo(155.89999999999998,7.100000000000001,156.09999999999997,7.900000000000002,155.39999999999998,9.100000000000001);
 ctx.bezierCurveTo(154.89999999999998,10.100000000000001,154.09999999999997,10.900000000000002,153.29999999999998,11.700000000000001);
 ctx.translate(-764.3667312374807,-1021.6497812357235);
 ctx.rotate(0);
 ctx.arc(0,0,1382,0.844622554251125,0.8571338223907029,0);
 ctx.rotate(0);
 ctx.translate(764.3667312374807,1021.6497812357235);
 ctx.translate(118.24581012292508,-0.22429439159792608);
 ctx.rotate(0);
 ctx.arc(0,0,32.1,0.8133799928413955,1.3236079045524922,0);
 ctx.rotate(0);
 ctx.translate(-118.24581012292508,0.22429439159792608);
 ctx.bezierCurveTo(124.99999999999999,31.200000000000003,124.09999999999998,31.8,123.09999999999998,32.5);
 ctx.translate(134.87074549510606,45.71890882370552);
 ctx.rotate(0);
 ctx.arc(0,0,17.7,-2.298308716153414,-3.5164753162689326,1);
 ctx.rotate(0);
 ctx.translate(-134.87074549510606,-45.71890882370552);
 ctx.bezierCurveTo(119.09999999999998,53.900000000000006,118.89999999999998,55.2,117.39999999999998,56.400000000000006);
 ctx.translate(108.10189914092328,44.62947238164588);
 ctx.rotate(0);
 ctx.arc(0,0,15,0.9022149810130935,1.2169162480211213,0);
 ctx.rotate(0);
 ctx.translate(-108.10189914092328,-44.62947238164588);
 ctx.bezierCurveTo(103.69999999999999,62.1,94.09999999999998,64.9,83.89999999999998,65.5);
 ctx.bezierCurveTo(77.09999999999998,65.9,73.19999999999997,71.5,75.29999999999998,77.9);
 ctx.bezierCurveTo(75.69999999999999,79.30000000000001,76.39999999999998,80.60000000000001,77.29999999999998,81.9);
 ctx.bezierCurveTo(78.69999999999999,83.9,79.59999999999998,86.30000000000001,79.79999999999998,88.9);
 ctx.bezierCurveTo(80.29999999999998,93.9,79.79999999999998,98.9,79.09999999999998,103.9);
 ctx.bezierCurveTo(78.19999999999997,110,78.09999999999998,116.10000000000001,80.09999999999998,122);
 ctx.translate(107.45377110170429,112.36821893336614);
 ctx.rotate(0);
 ctx.arc(0,0,29,2.803031379806005,2.3201483789582205,1);
 ctx.rotate(0);
 ctx.translate(-107.45377110170429,-112.36821893336614);
 ctx.bezierCurveTo(88.49999999999997,134.29999999999998,89.39999999999998,134.9,90.59999999999998,134.5);
 ctx.bezierCurveTo(91.79999999999998,133.9,92.09999999999998,132.8,92.19999999999997,131.7);
 ctx.lineTo(92.19999999999997,128.7);
 ctx.bezierCurveTo(91.69999999999997,120.69999999999999,91.09999999999998,112.69999999999999,91.69999999999997,104.69999999999999);
 ctx.bezierCurveTo(92.09999999999998,99.69999999999999,92.69999999999997,94.69999999999999,91.99999999999997,89.69999999999999);
 ctx.bezierCurveTo(91.39999999999998,86.19999999999999,92.79999999999997,84.29999999999998,95.39999999999998,82.69999999999999);
 ctx.lineTo(96.99999999999997,81.49999999999999);
 ctx.bezierCurveTo(103.19999999999997,77.69999999999999,109.99999999999997,75.09999999999998,116.69999999999997,72.49999999999999);
 ctx.bezierCurveTo(116.89999999999998,72.29999999999998,117.29999999999997,72.19999999999999,117.59999999999998,72.69999999999999);
 ctx.lineTo(116.79999999999998,73.1);
 ctx.bezierCurveTo(109.79999999999998,77.1,103.79999999999998,82.19999999999999,98.79999999999998,88.3);
 ctx.translate(104.98864841216714,94.12671698562588);
 ctx.rotate(0);
 ctx.arc(0,0,8.5,-2.3863077665685957,-3.6820216334016806,1);
 ctx.rotate(0);
 ctx.translate(-104.98864841216714,-94.12671698562588);
 ctx.bezierCurveTo(98.69999999999999,100.3,99.99999999999999,101.2,102.1,101.1);
 ctx.bezierCurveTo(106.1,101,110.1,100.39999999999999,114.19999999999999,99.6);
 ctx.bezierCurveTo(114.19999999999999,100.89999999999999,113.39999999999999,101.6,112.69999999999999,102.19999999999999);
 ctx.translate(101.91266954063413,90.3833379687647);
 ctx.rotate(0);
 ctx.arc(0,0,16,0.8309043259569531,1.200696872955668,0);
 ctx.rotate(0);
 ctx.translate(-101.91266954063413,-90.3833379687647);
 ctx.translate(110.57075727299613,113.51271895778368);
 ctx.rotate(0);
 ctx.arc(0,0,8.7,-1.9070703467846324,-3.0595790247255055,1);
 ctx.rotate(0);
 ctx.translate(-110.57075727299613,-113.51271895778368);
 ctx.lineTo(101.49999999999999,116.19999999999999);
 ctx.bezierCurveTo(101.29999999999998,119.19999999999999,100.99999999999999,122.39999999999999,101.69999999999999,125.49999999999999);
 ctx.bezierCurveTo(102.39999999999999,129,103.99999999999999,130.1,107.49999999999999,129.2);
 ctx.translate(100.28458464077657,102.14565134412061);
 ctx.rotate(0);
 ctx.arc(0,0,28,1.310162105048983,1.0547931121958776,1);
 ctx.rotate(0);
 ctx.translate(-100.28458464077657,-102.14565134412061);
 ctx.lineTo(115.69999999999997,125.69999999999999);
 ctx.lineTo(115.69999999999997,126.6);
 ctx.bezierCurveTo(126.99999999999997,121.6,137.29999999999998,122.6,137.29999999999998,122.6);
 ctx.closePath();
 ctx.moveTo(90,80);
 ctx.translate(113.09223837446436,66.59707021368402);
 ctx.rotate(0);
 ctx.arc(0,0,26.7,2.6157032957316684,2.880085563527868,0);
 ctx.rotate(0);
 ctx.translate(-113.09223837446436,-66.59707021368402);
 ctx.bezierCurveTo(86.6,70.7,87.5,69.1,90.2,68.3);
 ctx.bezierCurveTo(93.8,67.3,97.60000000000001,67.39999999999999,101.9,67.3);
 ctx.bezierCurveTo(97.7,71.6,93.7,75.6,89.9,80);
 ctx.closePath();
 ctx.fill();
 ctx.stroke();
 ctx.restore();
 ctx.restore();
 }
},`;

// CalligraphyCanvas functional component
const CalligraphyCanvas = React.memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    // Load and draw the character image
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = characterCanvasData;

    // Function to start drawing
    const startDrawing = (e) => {
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      canvas.addEventListener('mousemove', draw);
    };

    // Function to draw
    const draw = (e) => {
      if (e.buttons !== 1) return; // draw only if the mouse button is pressed
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    };

    // Function to stop drawing
    const stopDrawing = () => {
      canvas.removeEventListener('mousemove', draw);
      ctx.closePath();
    };

    // Add event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Add touch event listeners for mobile devices
    canvas.addEventListener('touchstart', (e) => startDrawing(e.touches[0]), { passive: true });
    canvas.addEventListener('touchmove', (e) => draw(e.touches[0]), { passive: true });
    canvas.addEventListener('touchend', stopDrawing);

    // Set up the canvas drawing styles
    ctx.lineWidth = 2; // Set the line width
    ctx.lineCap = 'round'; // Set the line cap
    ctx.strokeStyle = 'black'; // Set the stroke style

    // Cleanup function to remove event listeners
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [characterCanvasData]); // Only re-run the effect if the image changes

  return <StyledCanvas ref={canvasRef} />;
});

export default CalligraphyCanvas;
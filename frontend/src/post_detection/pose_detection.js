import React, { useRef, useEffect, useCallback } from 'react';
import * as pose from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';

const PoseDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);

  // Memoize the onResults function to avoid re-creating it unnecessarily
  const onResults = useCallback((results) => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.poseLandmarks) {
      drawStickFigure(results.poseLandmarks, canvasCtx);
      calculateAngles(results.poseLandmarks, canvasCtx);
    }
  }, []);

  useEffect(() => {
    // Initialize MediaPipe Pose
    const poseInstance = new pose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    poseInstance.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    poseInstance.onResults(onResults);
    poseRef.current = poseInstance;

    // Set up camera input
    if (videoRef.current) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await poseRef.current.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

  }, [onResults]);

  // Function to draw pose landmarks as a stick figure on canvas
  const drawStickFigure = (landmarks, ctx) => {
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.6)';
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';

    // Draw lines connecting key points to form a stick figure
    const connections = pose.POSE_CONNECTIONS;
    connections.forEach(([startIdx, endIdx]) => {
      const startPoint = landmarks[startIdx];
      const endPoint = landmarks[endIdx];

      ctx.beginPath();
      ctx.moveTo(startPoint.x * canvasRef.current.width, startPoint.y * canvasRef.current.height);
      ctx.lineTo(endPoint.x * canvasRef.current.width, endPoint.y * canvasRef.current.height);
      ctx.stroke();
    });

    // Draw landmarks as circles
    for (let i = 0; i < landmarks.length; i++) {
      const x = landmarks[i].x * canvasRef.current.width;
      const y = landmarks[i].y * canvasRef.current.height;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  // Calculate angles between shoulder, elbow, and wrist for both arms
  const calculateAngles = (landmarks, ctx) => {
    const rightAngle = calculateAngle(
      landmarks[pose.POSE_LANDMARKS.RIGHT_SHOULDER],
      landmarks[pose.POSE_LANDMARKS.RIGHT_ELBOW],
      landmarks[pose.POSE_LANDMARKS.RIGHT_WRIST]
    );

    const leftAngle = calculateAngle(
      landmarks[pose.POSE_LANDMARKS.LEFT_SHOULDER],
      landmarks[pose.POSE_LANDMARKS.LEFT_ELBOW],
      landmarks[pose.POSE_LANDMARKS.LEFT_WRIST]
    );

    // Draw the angles on the canvas
    ctx.font = '16px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText(`Right Arm Angle: ${Math.round(rightAngle)}°`, 20, 30);
    ctx.fillText(`Left Arm Angle: ${Math.round(leftAngle)}°`, 20, 60);
  };

  // Function to calculate angle between three points
  const calculateAngle = (pointA, pointB, pointC) => {
    const ba = { x: pointA.x - pointB.x, y: pointA.y - pointB.y };
    const bc = { x: pointC.x - pointB.x, y: pointC.y - pointB.y };

    const dotProduct = ba.x * bc.x + ba.y * bc.y;
    const magnitudeA = Math.sqrt(ba.x ** 2 + ba.y ** 2);
    const magnitudeC = Math.sqrt(bc.x ** 2 + bc.y ** 2);

    if (magnitudeA * magnitudeC === 0) return 0;

    const angle = Math.acos(dotProduct / (magnitudeA * magnitudeC));
    return (angle * 180) / Math.PI;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      {/* Camera Feed */}
      <div style={{ position: 'relative' }}>
        <h2>Live Camera Feed</h2>
        <video
          ref={videoRef}
          style={{ width: '640px', height: '480px', border: '1px solid black' }}
          autoPlay
          muted
        ></video>
      </div>

      {/* Stick Figure Visualization */}
      <div style={{ position: 'relative' }}>
        <h2>Pose Representation</h2>
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ border: '1px solid black' }}
        ></canvas>
      </div>
    </div>
  );
};

export default PoseDetection;

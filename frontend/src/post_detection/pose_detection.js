import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as pose from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';

const PoseDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  let stage = "";
  let counter = 0;

  // Memoize the onResults function to avoid re-creating it unnecessarily
  const onResults = useCallback((results) => {
    const canvasCtx = canvasRef.current.getContext('2d');
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw the pose landmarks on the canvas
    if (results.poseLandmarks) {
      drawPose(results.poseLandmarks, canvasCtx);
      rightBicepCurl(results.poseLandmarks, canvasCtx);
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
      minDetectionConfidence: 0.9,
      minTrackingConfidence: 0.9,
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

  }, [onResults]);  // Add 'onResults' to the dependency array

  // Function to draw pose landmarks on canvas
  const drawPose = (landmarks, ctx) => {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    for (let i = 0; i < landmarks.length; i++) {
      const x = landmarks[i].x * canvasRef.current.width;
      const y = landmarks[i].y * canvasRef.current.height;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  // Calculate angles between shoulder, elbow, and wrist for both arms
  const rightBicepCurl = (landmarks, ctx) => {
    if (!landmarks) {
      return;
    }
    if (counter >= 10){
      console.log("You finished this exercise, move to the next one!")
      return;
    }
    const rightBicepCurlAngle = calculateAngle(
      landmarks[pose.POSE_LANDMARKS.RIGHT_SHOULDER],
      landmarks[pose.POSE_LANDMARKS.RIGHT_ELBOW],
      landmarks[pose.POSE_LANDMARKS.RIGHT_WRIST]
    );
    console.log("Right Bicep Curl Angle: " + rightBicepCurlAngle);
    if (rightBicepCurlAngle >= 100) {
      stage = "down"
    } else if (rightBicepCurlAngle <= 40 && stage === "down") {
      stage = "up"
      counter = counter + 1
      console.log("good move! ")
    } else if (rightBicepCurlAngle > 40 && rightBicepCurlAngle < 100 && stage === "down" ){
      console.log("curl more")
    }
    console.log("counter = " + counter);

    // Draw the angles on the canvas
    ctx.font = '20px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText(`Right Arm Angle: ${Math.round(rightBicepCurlAngle)}`, 50, 50);
  };

  const leftBicepCurl = (landmarks, ctx) => {
    if (!landmarks) {
      return;
    }
    const leftBicepCurlAngle = calculateAngle(
      landmarks[pose.POSE_LANDMARKS.LEFT_SHOULDER],
      landmarks[pose.POSE_LANDMARKS.LEFT_ELBOW],
      landmarks[pose.POSE_LANDMARKS.LEFT_WRIST]
    );
    if (counter >= 10){
      console.log("You finished this exercise, move to the next one!")
      return;
    }
    console.log("Right Bicep Curl Angle: " + leftBicepCurlAngle);
    if (leftBicepCurlAngle >= 100) {
      stage = "down"
    } else if (leftBicepCurlAngle <= 40 && stage === "down") {
      stage = "up"
      counter = counter + 1
      console.log("good move! ")
    } else if (leftBicepCurlAngle > 40 && leftBicepCurlAngle < 100 && stage === "down" ){
      console.log("curl more")
    }
    console.log("counter = " + counter);

    // Draw the angles on the canvas
    ctx.font = '20px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText(`Right Arm Angle: ${Math.round(leftBicepCurlAngle)}`, 50, 50);
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
    <div>
      <video ref={videoRef}></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ border: '1px solid black' }}></canvas>
    </div>
  );
};

export default PoseDetection;

import React, { useRef, useEffect, useCallback, useState } from 'react';
import * as pose from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import knee_extension_gif from '../gifs/knee_extension.gif';
import bicep_curl_gif from '../gifs/bicep_curl.gif'
import open_arm_png from '../gifs/open_arm.png'

const PoseDetection = ({ exercise }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  let stage = "";
  let counter = 0;
  let minAngle = 45;
  let score = 0;
  let totalScore = 0;
  let notAdded = false;
  let angleHistory = [];
  let ideal_rom = 0;
  let rom_score = 0;
  let repComplete = false; // Flag to track if rep is completed
  let minDistance = 0;
  let finished = false;
  const [counterDisplay, setCounterDisplay] = useState(0);
  const [exerciseFinished, setExerciseFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [start, setStart] = useState(false);
  const [instruction, setInstruction] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success", "error", "warning", "info"
  const lastFeedbackTime = useRef(0); // Track the last feedback time in milliseconds

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showThrottledFeedback = (message, severity = "success", throttleTime = 1500) => {
    const currentTime = Date.now();
    if (currentTime - lastFeedbackTime.current >= throttleTime) {
      lastFeedbackTime.current = currentTime;
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    }
  };

  const handleCurlMoreFeedback = () => {
    showThrottledFeedback("Curl more! Keep improving your form.", "warning", 2000); // Feedback every 3 seconds
  };

  const handleRepCompleteFeedback = () => {
    showThrottledFeedback("Great rep! Keep going further!", "success", 2000); // Feedback every 3 seconds
  };

  const startExerciseFeedback = () => {
    showThrottledFeedback("Start the exercise by curling.", "info", 2000); // Feedback every 3 seconds
  };
  const [gifSrc, setGifSrc] = useState(null);

  // Memoize the onResults function to avoid re-creating it unnecessarily
  const onResults = useCallback((results) => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.poseLandmarks) {
      drawStickFigure(results.poseLandmarks, canvasCtx);
      if (exerciseFunctions[exercise]) {
        exerciseFunctions[exercise](results.poseLandmarks, canvasCtx);
      } else {
        console.warn(`No function defined for stage: ${stage}`);
      }
    }
  }, []);

  useEffect(() => {
    // Update the gifSrc based on the exercise prop
    if (exercise === 'rightKneeExtension') {
      setGifSrc(knee_extension_gif);
      setInstruction("Start seated with good posture. Extend your right leg to straighten the knee, contracting your quadriceps. Hold for 3 seconds, then slowly lower your foot back to the floor.")
    } else if (exercise == 'leftKneeExtension') {
      setGifSrc(knee_extension_gif);
      setInstruction("Start seated with good posture. Extend your left leg to straighten the knee, contracting your quadriceps. Hold for 3 seconds, then slowly lower your foot back to the floor.")
    } else if (exercise === 'rightBicepCurl') {
      setGifSrc(bicep_curl_gif);
      setInstruction("Start with your right elbow bent at 90 degrees. Curl your right hand towards your shoulder, then lower it. Repeat 10 times.")
    } else if (exercise == 'leftBicepCurl') {
      setGifSrc(bicep_curl_gif);
      setInstruction("Start with your left elbow bent at 90 degrees. Curl your left hand towards your shoulder, then lower it. Repeat 10 times.")
    } else if (exercise == "openArms") {
      setGifSrc(open_arm_png)
      setInstruction("Keep elbows close to your sides, open arms to your sides, then return to center. Repeat 10 times.")
    }
    else {
      setGifSrc(null); // Default case, no gif
    }
  }, [exercise]); // Depend on exercise prop to update the gif

  useEffect(() => {
    // Initialize MediaPipe Pose
    const poseInstance = new pose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    poseInstance.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.6, // keep as is.
      minTrackingConfidence: 0.5,
    });

    poseInstance.onResults(onResults);
    poseRef.current = poseInstance;

    // Set up camera input
    if (start && videoRef.current) {
      const camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await poseRef.current.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

  }, [start, onResults]);

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
  const rightBicepCurl = (landmarks, ctx) => {
    if (!landmarks) {
      return;
    }
    if (counter >= 10){
      setFinalScore(totalScore);
      setExerciseFinished(true);
      console.log("Total Score: " + totalScore);
      console.log("You finished this exercise, move to the next one!")
      const avgScore = totalScore / counter;
      console.log("Average Score: " + avgScore);
      return;
    }
    const rightBicepCurlAngle = calculateAngle(
      landmarks[pose.POSE_LANDMARKS.RIGHT_SHOULDER],
      landmarks[pose.POSE_LANDMARKS.RIGHT_ELBOW],
      landmarks[pose.POSE_LANDMARKS.RIGHT_WRIST]
    );
    calculateBicepCurlScore(rightBicepCurlAngle);

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
      setFinalScore(totalScore);
      setExerciseFinished(true);
      console.log("You finished this exercise, move to the next one!")
      return;
    }
    calculateBicepCurlScore(leftBicepCurlAngle); 

    // Draw the angles on the canvas
    ctx.font = '16px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText(`Left Arm Angle: ${Math.round(leftBicepCurlAngle)}`, 50, 100);
  };

  const calculateBicepCurlScore = (angle) => {
    // Calculate score based on reaching back to the down position
    if (angle >= 100 && angle < 115) {
      stage = "down";
      minAngle = 40;
      notAdded = true;
      startExerciseFeedback();
    } else if (angle <= 40 && stage === "down") {
      stage = "up";
    } else if (angle <= 40 && stage === "up") {
      if (angle < minAngle) {
        minAngle = angle;
        console.log("Min Angle: " + minAngle);
        if (minAngle < 20) {
          score = 10;
        } else {
          score = 5 + ((40 - minAngle) / 25) * 5;
          score = Math.round(score * 10) / 10; // Round to one decimal place for better precision
        }
        console.log("Score for this rep: " + score);
      } else {
        if (notAdded) {
          totalScore += score;
          counter += 1;
          notAdded = false;
          console.log("Total Score: " + totalScore);
          setCounterDisplay(prevCounterDisplay => prevCounterDisplay+ 1);
        }
        handleRepCompleteFeedback();
      }
    } else if (angle > 40 && angle < 100 && stage === "down" ){
      handleCurlMoreFeedback();
      console.log("curl more")
    }
    console.log("counter = " + counter);
  }

  const rightKneeExtension = (landmarks, ctx) => {
    if (!landmarks) {
      return;
    }
    if (counter >= 10){
      setFinalScore(totalScore);
      setExerciseFinished(true);
      console.log("You finished this exercise, move to the next one!")
      return;
    }
    const rightKneeExtensionAngle = smoothedAngle(calculateAngle(
      landmarks[pose.POSE_LANDMARKS.RIGHT_HIP],
      landmarks[pose.POSE_LANDMARKS.RIGHT_KNEE],
      landmarks[pose.POSE_LANDMARKS.RIGHT_ANKLE]
    ));
    console.log("Right knee extension Angle: " + rightKneeExtensionAngle);
    calculateKneeExtensionScore(rightKneeExtensionAngle)
    // if (rightKneeExtensionAngle <= 110) {
    //     stage = "down"
    // } else if (rightKneeExtensionAngle >= 130 && stage === "down") {
    //     stage = "up"
    //     counter = counter + 1
    //     console.log("good move! ")

    // } else if (rightKneeExtensionAngle < 130 && rightKneeExtensionAngle > 110 && stage === "down" ){
    //   console.log("extend more")
    // } else if (rightKneeExtensionAngle < 130 && rightKneeExtensionAngle > 110 && stage === "up"){
    //   console.log("returned to the initial position")
    // }
    console.log("counter = " + counter);

    // Draw the angles on the canvas
    ctx.font = '20px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText(`right Knee Angle: ${Math.round(rightKneeExtensionAngle)}`, 50, 50);
  };

  const leftKneeExtension = (landmarks, ctx) => {
    if (!landmarks) {
      return;
    }
    if (counter >= 10) {
      setFinalScore(totalScore);
      setExerciseFinished(true);
      console.log("You finished this exercise, move to the next one!");
      return;
    }
    const leftKneeExtensionAngle = smoothedAngle(calculateAngle(
      landmarks[pose.POSE_LANDMARKS.LEFT_HIP], // Left Hip (index 23)
      landmarks[pose.POSE_LANDMARKS.LEFT_KNEE], // Left Knee (index 25)
      landmarks[pose.POSE_LANDMARKS.LEFT_ANKLE]  // Left Ankle (index 27)
    ));
    console.log("Left Knee Extension Angle: " + leftKneeExtensionAngle);
    calculateKneeExtensionScore(leftKneeExtensionAngle)
  //   if (leftKneeExtensionAngle <= 110) {
  //     stage = "down";
  //   } else if (leftKneeExtensionAngle >= 130 && stage === "down") {
  //     stage = "up";
  //     counter = counter + 1;
  //     console.log("Good move!");
  //   } else if (
  //     leftKneeExtensionAngle < 130 &&
  //     leftKneeExtensionAngle > 110 &&
  //     stage === "down"
  //   ) {
  //     console.log("Extend more");
  //   }
  //  else if (leftKneeExtensionAngle < 130 && leftKneeExtensionAngle > 110 && stage === "up"){
  //   console.log("retrive to the initial position")
  // }
    console.log("Counter = " + counter);
  
    // Draw the angles on the canvas
    ctx.font = "20px Arial";
    ctx.fillStyle = "green";
    ctx.fillText(`Left Knee Angle: ${Math.round(leftKneeExtensionAngle)}`, 50, 80);
  };

  const calculateKneeExtensionScore = (angle) => { // calculate score for knee extension exercise.
    ideal_rom = 160 // ideal range of motion (rom) for this exercise is 160 degrees (rough estimation).
    if (angle <= 110) {
      stage = "down";
    } else if (angle >= 130 && stage === "down") {
      counter = counter + 1
      stage = "up";
      repComplete = true
      setCounterDisplay(prevCounterDisplay => prevCounterDisplay+ 1);
    } 
    if (angle >= 130 && stage === "up" && repComplete) {
      console.log("ROM Score:", Math.round((angle / ideal_rom) * 100));
      // rom score = ((actual rom) / (ideal rom)) * 100
      // based on this rom score we'll allocate points.
      rom_score = Math.round((angle / ideal_rom) * 100)
      if (rom_score >= 95){
        totalScore += 20
      } else if (rom_score >= 90){
        totalScore += 15
      } else if (rom_score >= 85){
        totalScore += 10
      } else { 
        totalScore += 7
      }
      repComplete = false
      console.log("counter = " + counter);
      console.log("rom_score for this rep = " + rom_score);
      console.log("current score = " + totalScore);
    } 
    console.log("counter = " + counter);
    console.log("current score = " + totalScore);
  }

  const openArms = (landmarks, ctx) => {
    const shoulder = landmarks[pose.POSE_LANDMARKS.RIGHT_SHOULDER];
    const hip = landmarks[pose.POSE_LANDMARKS.RIGHT_HIP];
    const wrist = landmarks[pose.POSE_LANDMARKS.RIGHT_WRIST];
    const elbow = landmarks[pose.POSE_LANDMARKS.RIGHT_ELBOW];

    if (finished){
      console.log("total score " + totalScore)
      console.log("You get "+ totalScore/(counter*10)*100 + "%")
      console.log("You finished this exercise, move to the next one!")
      setFinalScore(totalScore);
      setExerciseFinished(true);
      return;
    }

    if (!isElbowPinned(elbow, hip)){
      console.log("Keep your elbow pinned to your side.");
      return;
    }

    const wristDistance = wrist.x - elbow.x;
    if ( wristDistance < -0.18 && stage === "in") {
      stage = "out";
      counter = counter + 1;
      setCounterDisplay(prevCounterDisplay => prevCounterDisplay+ 1);
      console.log("counter " + counter)
      minDistance = -0.18;
      notAdded = false;
    } else if (wristDistance < -0.18 && stage === "out") {
      minDistance = Math.min(minDistance, wristDistance);
    } else if (Math.abs(wristDistance) < 0.05 && stage === "out") {
      console.log("Forearm is moving outward.");
      stage = "in";
      console.log("stage = " + stage)
      if (!notAdded){
        if (minDistance <= -0.18 && -0.19 < minDistance) {
          totalScore += 8;
          console.log("Total Score: " + totalScore);
        } else if (minDistance < -0.19 && -0.20 < minDistance) {
          totalScore += 9;
          console.log("Total Score: " + totalScore);
        } else if (minDistance < -0.20) {
          totalScore += 10;
          console.log("Total Score: " + totalScore);
        }
        notAdded = true;
        if (counter===10){
          finished = true;
        }
      }
    } else if (Math.abs(wristDistance) < 0.05){
      stage = "in";
    };

    console.log("counter = " + counter);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText(`wrist - elbow x: ${(wrist.x-shoulder.x)}`, 30, 100);
  };

  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) +
      Math.pow(point2.y - point1.y, 2)
    );
  };
  
  const isElbowPinned = (elbow, hip) => {
    const distance = calculateDistance(elbow, hip);
    return distance < 0.4; // Adjust the threshold based on calibration
  };

  // Reduce the inherent noise of erratic movements
  const smoothedAngle = (newAngle) => {
    angleHistory.push(newAngle);
    if (angleHistory.length > 5) {
      angleHistory.shift(); // Keep the last 5 angles
    }
    return angleHistory.reduce((sum, angle) => sum + angle, 0) / angleHistory.length; // Take the average of the last 5 recorded angles and return it
  };

  const exerciseFunctions = {
    rightBicepCurl,
    leftBicepCurl,
    rightKneeExtension,
    leftKneeExtension,
    openArms,
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

  const startExercise = () => {
    setStart(true); // Set start to true when the exercise begins
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      
      {!start ? (
        // When exercise has not started, display a message or another component
        <div>
          <h2>{instruction}</h2>
          {gifSrc && <img src={gifSrc} alt={exercise} style={{ width: '600px', height: 'auto' }} />}
          <button onClick={startExercise}>Start Exercise</button>
        </div>
      ) : (
        // When exercise has started, render the video feed and score
        <>
          {/* Camera Feed */}
          {exerciseFinished ? (
            // When exercise is finished, show a new page (can be a message, component, etc.)
            <div style={{ padding: '20px' }}>
              <h2>Exercise Finished!</h2>
              <h2>Total Score: {finalScore}%</h2>
              {/* You can add more content or components for the new page */}
            </div>
          ) : (
            // When exercise is not finished, show the video feed and counter
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <video
                ref={videoRef}
                style={{ width: '640px', height: '480px', border: '1px solid black' }}
                autoPlay
                muted
              ></video>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                Count: {counterDisplay}/10
              </div>
            </div>
          )}
        </>
      )}

    <Snackbar
      open={snackbarOpen}
      autoHideDuration={4000} // Increased duration to give more time to read
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        sx={{
          width: "100%",
          fontSize: "1rem", // Increased font size for better readability
          fontWeight: "bold", // Make text bolder for emphasis
          padding: "15px", // Add more padding for spacious content
          borderRadius: "10px", // Rounded corners for a modern look
          lineHeight: "1.5", // Improved line spacing for readability
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", // Add shadow for emphasis
          backgroundColor: "#1e1e1e", // Softer background color for comfort
          color: "#f5f5f5", // Dark text color for better contrast
          "& .MuiAlert-icon": {
            fontSize: "1.5rem", // Larger icon size for easier recognition
          },
          "& .MuiAlert-action": {
            alignItems: "center",
          },
        }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>

      {/*Stick Figure Visualization*/}
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width="0"
          height="0"
          style={{ border: '1px solid black' }}
        ></canvas>
      </div>
    </div>
  );
};

export default PoseDetection;
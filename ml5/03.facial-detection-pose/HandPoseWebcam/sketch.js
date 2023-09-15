/*
  Data and machine learning for creative practice
  Originally from here: https://learn.ml5js.org/#/reference/handpose

  Handpose webcam demo

*/

let video,
    handPose,
    hand; // NOTE: as per the documentation, this model can only detect
          //       one hand: https://github.com/tensorflow/tfjs-models/tree/master/handpose#mediapipe-handpose
          //       see this reply: https://github.com/ml5js/ml5-library/pull/1117#issuecomment-791100940

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  handpose = ml5.handpose(video, modelReady);
}

function draw() {

  // if we have the video access yet, draw it
  if (video) {
    image(video, 0, 0);
  }

  // IDEA: like in previous sketches, there is no obligation to display the video,
  //       and you could for instance imagine a blank canvas where points from the
  //       hand, can be used in artistic ways! To draw or influence shapes on
  //       the canvas in real time!
  // IDEA: (advanced) in this vein, it might be possible to train a sound model
  //       on Teachable Machine using different hand poses, and then combine the
  //       local sound sketch with this one, where the landmarks control
  //       animations and sound!

  drawHand();
}

function modelReady() {
  handpose.on('predict', gotPose);
}

// This time, using a click to display the hand object
function mousePressed() {
  console.log(hand);
}

function gotPose(results) {
  // do something with the results
  hand = results;
};

function drawHand() {
  push(); // Precaution: styles remain within this function
  noStroke();
  fill(255,0,0); // Set colour of circle

  // if we have any hand detected, draw it
  if (hand && hand.length > 0) {

    let landmarks = hand[0].landmarks;

    for (let i = 0; i < landmarks.length; i++) {
      let [x, y, z] = landmarks[i];
      ellipse(x, y, 7);
    }
  }

  pop();
}

// IDEA: one thing that could be done, to familiarise yourself with the landmarks and
//       the geometry of the hands, would be to draw lines between the landmarks, to
//       create a silhouette of a hand, as seen here for instance:
//       https://github.com/tensorflow/tfjs-models/tree/master/handpose#mediapipe-handpose
// IDEA: (advanced) the current ml5 model, adapted from tfjs, does not support more
//       than one hand. There is a more recent model that does that, which is part of
//       mediapipe (a bit of a successor to the tfjs creative projects?), see here:
//       https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
//       People have already worked on adapting this to p5, and the next version of ml5
//       is likely to include these new developments. See for instance this tutorial:
//       https://www.youtube.com/watch?v=BX8ibqq0MJU, with the code here:
//       https://github.com/Creativeguru97/YouTube_tutorial/tree/master/Play_with_APIs/hand_detection/mediapipe_hands/final
//       ! Beware! You need to fix one thing to make the above code work: in
//       `detections.js`, pass one more option to `hands.setOptions`: `modelComplexity: 1,`!
//       (Cf. this issue: https://githut.com/google/mediapipe/issues/2181#issuecomment-863447853)

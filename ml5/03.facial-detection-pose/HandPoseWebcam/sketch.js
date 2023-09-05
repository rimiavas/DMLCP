/*
  Data and machine learning for creative practice
  Week 3
  
  Handpose webcam demo

*/

let video;
let handPose;
let hands;

function modelReady() {
  handpose.on('predict', gotPose);
}

function mousePressed() {
    console.log(hands);
}


function gotPose(results) {
  // do something with the results
  hands = results;
};


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
  
  // if we have any hands detected, draw them
  if (hands && hands.length > 0) {

    // loop through all of the hands found and draw them
    for (let hand of hands) {
      let landmarks = hand.landmarks;

      // set colour of circle
      noStroke();
      fill(255,0,0);

      for (let i = 0; i < landmarks.length; i++) {
        let [x, y, z] = landmarks[i];
        ellipse(x, y, 7);
      }
    }
  }
}
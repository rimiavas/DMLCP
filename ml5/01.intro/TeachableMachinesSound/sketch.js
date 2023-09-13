/*
  Data and machine learning for artistic practice (DMLAP)
  Week 1
  
  Image classifier via models trained with Teachable Machines
  from https://github.com/ml5js/Intro-ML-Arts-IMA-F21
  & https://editor.p5js.org/ima_ml/sketches/xcdqphiVj
*/

let classifier;

// Label (start by showing listening)
let label = "listening";

// Teachable Machine model URL:
const soundModelURL = 'https://teachablemachine.withgoogle.com/models/h3p9R41J/';

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 240);
  createP("Clap your hands!");
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(0);
  // Draw the label in the canvas
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}

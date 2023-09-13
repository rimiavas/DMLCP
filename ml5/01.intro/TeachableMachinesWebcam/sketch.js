/*
  Data and machine learning for artistic practice (DMLAP)
  Week 1
  
  Image classifier via models trained with Teachable Machines
  adapted from https://github.com/ml5js/Intro-ML-Arts-IMA-F21
  & Joe McAlister's course
*/

// Classifier Variable
let classifier;

// Model URL (replace with your model trained on teachablemachine.withgoogle.com)
// const imageModelURL = 'https://teachablemachine.withgoogle.com/models/pcs6MFoPB/'; // Simley vs Star (drawings)
// const imageModelURL = 'https://teachablemachine.withgoogle.com/models/H7dm-bnTn/'; // Four faces: normal, flipped left, flipped right, upside down
const imageModelURL = 'https://teachablemachine.withgoogle.com/models/bXy2kDNi/';  // Night vs Day (put your hand in front of the webcam)

// Video
let video;
let flippedVideo;

// To store the classification
let label = "";
let confidence = 0.0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json'); // IDEA: try instantiate *two* models, instead of one? You could train a model associating
                                                                  // postures with poetic snippets (the class names), and display them on the screen? Note that
                                                                  // you would need to change the classifyVideo function, which currently uses the classifier
                                                                  // global variable by default.
}

function setup() {
  createCanvas(320, 260);

  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);

  if (label) { // don't display if the label is empty
    text(` ${label} (${confidence.toFixed(2) * 100}% confidence)`, width / 2, height - 4);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;           // IDEA: can you modify this sketch to display not just the first
  confidence = results[0].confidence; // label (results[0]), but all of them? You would need to change 
                                      // the code that displays the label as a text in `draw()`. One way
                                      // of doing this would be to use `results` as a global!

  // Classifiy again!
  classifyVideo();
}

/*
  Data and machine learning for creative practice
  
  Pose classification (run model 3/3)
  Inspired by Daniel Shiffman
  Adapted by Joe McAlister
  
*/

let video,
    poseNet,
    pose,
    skeleton,
    brain,
    poseLabel = "Y";

function setup() {
  createCanvas(640, 480);
  
  video = createCapture(VIDEO, cameraLoaded);
  video.size(640, 480);
  video.hide(); // hide DOM element
}

function cameraLoaded(stream) {
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses); // our callback for poses
  
  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  
  // load our training into the neural network
  brain = ml5.neuralNetwork(options);
  
  const modelInfo = {
    model: 'model3/model.json',
    metadata: 'model3/model_meta.json',
    weights: 'model3/model.weights.bin',
  };
  
  // load it into our neural net
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log('pose classification ready!');
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    
    for(let keypoint of pose.keypoints) {
      let x = keypoint.position.x;
      let y = keypoint.position.y;
      
      inputs.push(x);
      inputs.push(y);
    }
    
    // classify the skeleton from the image
    brain.classify(inputs, gotResult);
    
  } else {
    setTimeout(classifyPose, 100); // we call this function recursively every 100 milliseconds
  }
}

function gotResult(error, results) {
  // this is the result from the classification
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
  }
  
  // we call classify pose as we are now done and should keep classifying
  classifyPose();
}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  push();
  translate(video.width, 0);
  scale(-1, 1); // flip video to make it easier for us
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    for (let bone of skeleton) {
      let a = bone[0];
      let b = bone[1];
      strokeWeight(2);
      stroke(0);

      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
    
    for (let keypoint of pose.keypoints) {
      let x = keypoint.position.x;
      let y = keypoint.position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
  pop();

  fill(255, 0, 255);
  noStroke();
  textSize(512);
  textAlign(CENTER, CENTER);
  text(poseLabel, width / 2, height / 2);
}

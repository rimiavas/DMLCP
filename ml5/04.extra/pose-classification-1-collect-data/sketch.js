/*
  Data and machine learning for artistic practice
  Week 5
  
  Pose classification (collect data 1/3)
  Inspired by Daniel Shiffman
  Adapted by Joe McAlister
  
*/

let video,
    poseNet,
    pose,
    skeleton,
    brain,
    state = "waiting",
    targetLabel;


function setup() {
  createCanvas(640, 480);

  // load camera
  video = createCapture(VIDEO, cameraLoaded);
  video.size(640, 480);
  video.hide(); // hide the dom element
}

function cameraLoaded(stream) {
  // load posenet
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses); // setup callback for pose detection

  // start our neural network, so we can start training
  let options = {
    inputs: 34,
    outputs: 4,
    task: "classification",
    debug: true,
  };
  brain = ml5.neuralNetwork(options);
}

// this is called when we can detect a pose
function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    
    // are we in the collecting state?
    if (state == "collecting") {
      let inputs = [];
      
      for (let keypoint of pose.keypoints) {
        let x = keypoint.position.x;
        let y = keypoint.position.y;
        
        // add these points to our array
        inputs.push(x);
        inputs.push(y);
      }
      
      // provide our label
      let target = [targetLabel];
      
      // add it to the model ready for training later
      brain.addData(inputs, target);
    }
  }
}

function draw() {
  translate(video.width, 0);
  scale(-1, 1); // this flips the video so it's easier for us
  image(video, 0, 0, video.width, video.height);

  // if we can detect a pose, let's draw it
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
}

function keyPressed() {
  if (key == "s") {
    brain.saveData();
  } else {
    targetLabel = key;
    console.log(targetLabel);
    
    // set timeout calls this function after a set time, see the 10000 in this case (this is in milliseconds)
    setTimeout(function () {
      console.log("collecting");
      state = "collecting";
      setTimeout(function () {
        console.log("not collecting");
        state = "waiting";
      }, 10000); // 10 seconds
    }, 5000); // 5 seconds
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

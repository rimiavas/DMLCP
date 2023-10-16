/*
  Data and machine learning for artistic practice (DMLAP)

  Face mesh with a webcam

  Original sketch: https://editor.p5js.org/ml5/sketches/Facemesh_Webcam
  Reference here: https://learn.ml5js.org/#/reference/facemesh
  And other examples: https://learn.ml5js.org/#/reference/facemesh?id=examples
*/


let facemesh,
    video,
    predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  // Used to log preds only once
  let hasLogged = false;

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("face", preds => {
    predictions = preds;

    // Log `preds` to see its contents
    if (!hasLogged) {
      console.log("The predictions object:");
      console.log(preds);
      console.log("The list of 'annotations' in `predictions[0].annotations` (accessible as a property, and containing an array of points in that part of the face:)");
      console.log(Object.keys(preds[0].annotations));
      hasLogged = true;
    }
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypoints(); // We call our function to draw all keypoints
                   // IDEA: like in previous sketches, there is no obligation to display the video,
                   //       and you could for instance imagine a blank canvas where a few points
                   //       from the face are used to draw vanishing circles, using the same logic
                   //       as when you want a circle to leave a trail behind it when it moves?
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    const keypoints = predictions[i].scaledMesh; // IDEA: `scaledMesh` is actually the 'unscaled' (unnormalised version)
                                                 //       if you try `.mesh` instead, the mesh will be displayed in the upper
                                                 //       left corner, as the values are restricted to be always in the same
                                                 //       range! This in turn could be used if you wanted a face mesh that
                                                 //       moves like the person being filmed, but that stays fixed (instead
                                                 //       of sticking to the same location in the image). Proprely scaled again,
                                                 //       this 'static' yet moving face could occupy the whole canvas, like
                                                 //       a mirror!

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j++) {
      const [x, y, z] = keypoints[j]; // the coordinates are given in 3D! Here we only use x & y

      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}

// IDEA: the predictions object comes with a bounding box, accessible under the
//       `.boundingBox` property. This is also an object, with the x y coordinates of
//       the four corners as arrays: topLeft, topRight, bottomLeft, bottomRight. A
//       nice exercise could be to write a function called drawBoundingBox, similar to
//       drawKeyPoints, that would:
//         - set the rectMode to CORNERS (using a push/pop logic for security)
//         - loop through all the predictions
//         - fetch the topLeft and bottomRight coordinates
//         - and draw the box! (You would call that function in draw after drawKeypoints.)
//       Note that you could imagine doing something different with that, just
//       as you could use the various face points in different ways. It is
//       probably particularly interesting if you focus on only some points
//       (maybe one in each cheek?), or perhaps three-four points that would allow
//       you to define an arc, a spline, or a Bézier curve?

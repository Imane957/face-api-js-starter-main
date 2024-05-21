console.log(faceapi);
// (async function () {
//   try {
//     // run();
//   } catch (error) {
//     console.log(error);
//   }
// })();

const run = async () => {
  loading();
  await faceapi.nets.ssdMobilenetv1.loadFromUri("./models");
  await faceapi.nets.faceLandmark68Net.loadFromUri("./models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("./models");
  await faceapi.nets.ageGenderNet.loadFromUri("./models");
  //const face1 =document.getElementById('face')
  const face1 = await faceapi.fetchImage("./images/girlsSmile1.png");
  const faceAIData = await faceapi
    .detectAllFaces(face1)
    .withFaceLandmarks()
    .withFaceDescriptors()
    .withAgeAndGender();
  console.log(faceAIData);
  const canvas = document.getElementById("canvas");
  canvas.style.left = face1.offsetLeft;
  canvas.style.top = face1.offsetTop;
  canvas.height = face1.height;
  canvas.width = face1.width;

  //bounding box
  faceapi.draw.drawDetections(canvas, faceAIData);

  // const face2 = await new faceAIData
  // age and gender
  for (const face of faceAIData) {
    const { age, gender, genderProbability } = face;
    const genderText = `${gender}-${genderProbability}`;
    const ageText = `${Math.round(age)} years`;
    const textField = new faceapi.draw.DrawTextField(
      [genderText, ageText],
      face.detection.box.bottomLeft
    );
    textField.draw(canvas);
  }
  removeLoader();
};

// Promise.all([]).then((res) => run());

run();

function loading() {
  const div = document.createElement("div");
  div.className = "loader";
  const laodingicon = document.createElement("div");
  div.append(laodingicon);
  const body = document.body;

  body.append(div);
}

function removeLoader() {
  const laoder = document.querySelector(".loader");
  if (laoder) laoder.remove();
}

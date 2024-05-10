console.log(faceapi)

const run = async()=>{
    
    await Promise.all([  
        faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.ageGenderNet.loadFromUri('./models'),
    ])
//const face1 =document.getElementById('face')
const face1= await faceapi.fetchImage('./images/oldMan1.png')
const faceAIData= await faceapi.detectAllFaces(face1)
    .withFaceLandmarks()
    .withFaceDescriptors()
    .withAgeAndGender()
console.log(faceAIData)
const canvas =document.getElementById('canvas')
canvas.style.left=face1.offsetLeft
canvas.style.top=face1.offsetTop
canvas.height=face1.height
canvas.width=face1.width

//bounding box
faceapi.draw.drawDetections(canvas,faceAIData)

// age and gender
faceAIData.forEach(face=>{
    const { age,gender,genderProbability}=face
    const genderText=`${gender}-${genderProbability}` 
    const ageText=`${Math.round(age)} years`
    const textField=new faceapi.draw.DrawTextField([genderText,ageText],face.detection.box.bottomLeft)
    textField.draw(canvas)
}  
    )







}

run()